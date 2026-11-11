/*
 * Càlcul simplificat de l'IRPF d'un assalariat resident a Catalunya (exercici 2025)
 * i del mateix IRPF si els llindars s'haguessin actualitzat amb l'IPC.
 *
 * Supòsits (vegeu README.md):
 *  - Contribuent individual, sense fills, sense discapacitat, només rendes del treball.
 *  - Cotització treballador: 6,48% (contingències comunes 4,70 + atur 1,55 + FP 0,10 + MEI 0,13),
 *    amb base màxima 2025 de 4.909,50 €/mes.
 *  - Despeses deduïbles: cotització + 2.000 € (art. 19.2.f LIRPF).
 *  - Reducció per rendiments del treball: art. 20 LIRPF, versió vigent des del 2024.
 *  - Mínim personal: 5.550 € (estatal i català).
 *  - Escala estatal: art. 63 LIRPF (Llei 11/2020). Escala catalana: art. 611-1 CTC (DL 5/2025).
 *  - No inclou deduccions autonòmiques ni la deducció per a perceptors del SMI.
 *
 * Escenari "deflactat": multiplica per l'IPC acumulat els imports nominals que no s'han tocat
 * des del 2015 (trams de l'escala estatal, mínim personal i els 2.000 € de despeses). L'escala
 * catalana (reformada el 2025) i la reducció per treball (reformada el 2023-2024) es deixen igual,
 * perquè ja s'han actualitzat recentment: així el càlcul és conservador.
 */
(function (root) {
  "use strict";

  var STATE_SCALE = [
    [12450, 0.095],
    [20200, 0.12],
    [35200, 0.15],
    [60000, 0.185],
    [300000, 0.225],
    [Infinity, 0.245]
  ];

  var CAT_SCALE_2025 = [
    [12500, 0.095],
    [22000, 0.125],
    [33000, 0.16],
    [53000, 0.19],
    [90000, 0.215],
    [120000, 0.235],
    [175000, 0.245],
    [Infinity, 0.255]
  ];

  var SS_RATE = 0.0648;
  var SS_MAX_BASE = 4909.5 * 12;
  var OTHER_EXPENSES = 2000;
  var PERSONAL_MIN = 5550;

  // Variació mitjana anual de l'IPC (INE). 2025 provisional.
  var CPI = {
    2016: -0.2, 2017: 2.0, 2018: 1.7, 2019: 0.7, 2020: -0.3,
    2021: 3.1, 2022: 8.4, 2023: 3.5, 2024: 2.8, 2025: 2.7
  };

  function cpiFactor(fromYear, toYear) {
    var f = 1;
    for (var y = fromYear + 1; y <= toYear; y++) {
      if (CPI[y] === undefined) throw new Error("Sense IPC per a " + y);
      f *= 1 + CPI[y] / 100;
    }
    return f;
  }

  function scaleTax(base, scale, factor) {
    factor = factor || 1;
    var tax = 0, prev = 0;
    for (var i = 0; i < scale.length; i++) {
      var top = scale[i][0] === Infinity ? Infinity : scale[i][0] * factor;
      if (base <= prev) break;
      var slice = Math.min(base, top) - prev;
      tax += slice * scale[i][1];
      prev = top;
    }
    return tax;
  }

  function workReduction(netWork) {
    if (netWork <= 14852) return 7302;
    if (netWork <= 17673.52) return 7302 - 1.75 * (netWork - 14852);
    if (netWork <= 19747.5) return 2364.34 - 1.14 * (netWork - 17673.52);
    return 0;
  }

  /**
   * @param {number} gross  salari brut anual (€)
   * @param {number} factor multiplicador IPC per als imports congelats (1 = situació real)
   */
  function compute(gross, factor) {
    factor = factor || 1;
    gross = Math.max(0, gross);
    var ss = Math.min(gross, SS_MAX_BASE) * SS_RATE;
    var expenses = ss + OTHER_EXPENSES * factor;
    var netWork = Math.max(0, gross - expenses);
    var reduction = Math.min(netWork, workReduction(netWork));
    var base = Math.max(0, netWork - reduction);
    var min = PERSONAL_MIN * factor;
    var minApplied = Math.min(min, base);

    var stateTax = Math.max(0, scaleTax(base, STATE_SCALE, factor) - scaleTax(minApplied, STATE_SCALE, factor));
    var catTax = Math.max(0, scaleTax(base, CAT_SCALE_2025, 1) - scaleTax(minApplied, CAT_SCALE_2025, 1));
    var irpf = stateTax + catTax;
    return {
      gross: gross,
      ss: ss,
      netWork: netWork,
      reduction: reduction,
      base: base,
      stateTax: stateTax,
      catTax: catTax,
      irpf: irpf,
      effective: gross > 0 ? irpf / gross : 0
    };
  }

  function compare(gross, baseYear, toYear) {
    toYear = toYear || 2025;
    var factor = cpiFactor(baseYear, toYear);
    var real = compute(gross, 1);
    var indexed = compute(gross, factor);
    return {
      factor: factor,
      real: real,
      indexed: indexed,
      extra: real.irpf - indexed.irpf
    };
  }

  // ---------- El camí d'un euro: treball vs dividend vs societat patrimonial ----------
  // Escala de l'estalvi 2025 (estatal + autonòmica sumades), art. 66 i 76 LIRPF (Llei 7/2024).
  var SAVINGS_SCALE = [
    [6000, 0.19],
    [50000, 0.21],
    [200000, 0.23],
    [300000, 0.27],
    [Infinity, 0.30]
  ];
  // Cotització empresarial aproximada 2025: comunes 23,60 + atur 5,50 + FOGASA 0,20 + FP 0,60
  // + MEI 0,67 + accidents (mitjana ~1,5) ≈ 32%.
  var EMPLOYER_SS = 0.32;

  function savingsTax(amount) { return scaleTax(Math.max(0, amount), SAVINGS_SCALE, 1); }

  /** X = cost laboral total per a l'empresa (sou + cotització empresarial). */
  function laborChain(X) {
    var gross = X / (1 + EMPLOYER_SS) <= SS_MAX_BASE ? X / (1 + EMPLOYER_SS) : X - SS_MAX_BASE * EMPLOYER_SS;
    var employerSS = X - gross;
    var r = compute(gross, 1);
    return {
      total: X,
      corporate: 0,
      irpf: r.irpf,
      contributions: employerSS + r.ss,
      net: gross - r.ss - r.irpf,
      deferred: false,
      gross: gross
    };
  }

  /** X = benefici abans d'impostos; t = tipus efectiu de Societats (0-1); repartit com a dividend a una persona resident. */
  function dividendChain(X, t) {
    var corp = X * t;
    var div = X - corp;
    var tax = savingsTax(div);
    return { total: X, corporate: corp, irpf: tax, contributions: 0, net: div - tax, deferred: false, dividend: div };
  }

  /**
   * Igual, però el dividend el cobra una societat patrimonial del soci (participació >= 5%).
   * Art. 21.10 LIS: només tributa un 5% del dividend al 25% (≈1,25%). L'IRPF personal queda ajornat
   * fins que el soci tregui els diners de la seva societat.
   */
  function holdingChain(X, t) {
    var corp = X * t;
    var div = X - corp;
    var holdingTax = div * 0.05 * 0.25;
    return { total: X, corporate: corp + holdingTax, irpf: 0, contributions: 0, net: div - holdingTax, deferred: true, dividend: div };
  }

  var api = {
    compute: compute,
    savingsTax: savingsTax,
    laborChain: laborChain,
    dividendChain: dividendChain,
    holdingChain: holdingChain,
    EMPLOYER_SS: EMPLOYER_SS,
    compare: compare,
    cpiFactor: cpiFactor,
    scaleTax: scaleTax,
    STATE_SCALE: STATE_SCALE,
    CAT_SCALE_2025: CAT_SCALE_2025,
    CPI: CPI
  };

  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.IRPF = api;
})(this);
