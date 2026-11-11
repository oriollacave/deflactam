(function () {
  "use strict";
  var D = window.DATA;
  var SVGNS = "http://www.w3.org/2000/svg";
  var state = { gross: 30000, baseYear: 2015 };

  // ---------- helpers ----------
  var nf0 = new Intl.NumberFormat("ca-ES", { maximumFractionDigits: 0 });
  var nf1 = new Intl.NumberFormat("ca-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  function eur(x) { return nf0.format(Math.round(x)) + " €"; }
  function pct(x) { return nf1.format(x) + "%"; }
  function meur(x) { // x in euros
    if (x >= 1e9) return nf1.format(x / 1e9) + " mil M€";
    return nf0.format(x / 1e6) + " M€";
  }
  function $(id) { return document.getElementById(id); }
  function el(tag, attrs, text) {
    var n = document.createElementNS(SVGNS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function clear(svg) { while (svg.firstChild) svg.removeChild(svg.firstChild); }
  function copy(text, toastId) {
    var done = function () { $(toastId).textContent = "Copiat al porta-retalls."; setTimeout(function () { $(toastId).textContent = ""; }, 2500); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(); });
    } else fallback();
    function fallback() {
      var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { $(toastId).textContent = "No s'ha pogut copiar."; }
      document.body.removeChild(ta);
    }
  }

  // ---------- hero ----------
  function renderHero() {
    var m = D.irpfMacro;
    var items = [
      { n: nf0.format(m.extraFuncas.value) + " M€", d: "cobrats de més en IRPF entre 2021 i 2024 per no actualitzar-lo", s: m.extraFuncas.src, u: m.extraFuncas.url },
      { n: "~50%", d: "de l'augment de l'IRPF sobre el PIB 2019-2023 ve només de la inflació", s: m.extraBdE.src, u: m.extraBdE.url },
      { n: nf0.format(m.recaptacioIRPF2025.value) + " M€", d: "recaptats en IRPF el 2025, rècord (" + m.recaptacioIRPF2025.note + ")", s: m.recaptacioIRPF2025.src, u: m.recaptacioIRPF2025.url },
      { n: "2015", d: "últim any en què es van fixar els trams estatals i el mínim personal. Les pensions, en canvi, s'actualitzen cada any", s: "Llei 35/2006 de l'IRPF, arts. 57 i 63", u: "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764" }
    ];
    var box = $("heroStats");
    items.forEach(function (it) {
      var d = document.createElement("div"); d.className = "stat";
      d.innerHTML = '<div class="n"></div><div class="d"></div><div class="s"><a target="_blank" rel="noopener"></a></div>';
      d.querySelector(".n").textContent = it.n;
      d.querySelector(".d").textContent = it.d;
      var a = d.querySelector("a"); a.textContent = it.s; a.href = it.u;
      box.appendChild(d);
    });
  }

  // ---------- calculator ----------
  function calc() {
    var c = IRPF.compare(state.gross, state.baseYear);
    if (!$("extra")) { if ($("chartTax")) drawTaxChart(); return; }
    $("extra").textContent = eur(c.extra);
    var days = c.real.irpf > 0 ? c.extra / (state.gross / 365) : 0;
    var inflation = (c.factor - 1) * 100;
    $("say").textContent = c.extra < 1
      ? "Amb aquest sou no pagues IRPF o l'efecte és mínim: la reducció per treball et protegeix."
      : "Els preus han pujat un " + pct(inflation) + " des del " + state.baseYear + ", però els trams no. Equival a " + nf1.format(days) + " dies de sou brut a l'any que treballes només per pagar aquest impost no votat.";

    var rows = [
      ["", "Real 2025", "Deflactat"],
      ["IRPF total", eur(c.real.irpf), eur(c.indexed.irpf)],
      ["  part estatal", eur(c.real.stateTax), eur(c.indexed.stateTax)],
      ["  part catalana", eur(c.real.catTax), eur(c.indexed.catTax)],
      ["Tipus efectiu", pct(c.real.effective * 100), pct(c.indexed.effective * 100)],
      ["Cotització SS (teva)", eur(c.real.ss), eur(c.indexed.ss)]
    ];
    var t = $("breakdown"); t.innerHTML = "";
    rows.forEach(function (r, i) {
      var tr = document.createElement("tr");
      r.forEach(function (cell, j) {
        var td = document.createElement(i === 0 ? "th" : "td");
        td.textContent = cell; if (j > 0) td.className = "num";
        tr.appendChild(td);
      });
      t.appendChild(tr);
    });
    drawExtraChart(c);
    if ($("letter")) updateLetter(c);
    if ($("chartTax")) drawTaxChart();
  }

  function shareText() {
    var c = IRPF.compare(state.gross, state.baseYear);
    return "Amb un sou de " + eur(state.gross) + " pago " + eur(c.extra) +
      " d'IRPF de més cada any perquè Hisenda no actualitza els trams amb la inflació des del " + state.baseYear +
      ". Ningú ha votat aquesta pujada d'impostos. Calcula la teva: #Deflactam";
  }

  function updateLetter(c) {
    var txt =
      "Benvolguda diputada, benvolgut diputat,\n\n" +
      "Us escric com a ciutadà/ana de la vostra circumscripció. Segons els meus càlculs, amb un salari brut de " + eur(state.gross) +
      " pago aproximadament " + eur(c.extra) + " d'IRPF més cada any del que pagaria si la tarifa estatal, el mínim personal i les despeses deduïbles s'haguessin actualitzat amb l'IPC des del " + state.baseYear + ".\n\n" +
      "Funcas estima que la manca de deflactació va suposar 9.750 milions d'euros addicionals entre 2021 i 2024, i el Banc d'Espanya atribueix a aquest efecte gairebé la meitat de l'augment de l'IRPF sobre el PIB entre 2019 i 2023. És una pujada d'impostos que cap parlament ha votat.\n\n" +
      "Les pensions s'actualitzen cada any per llei amb l'IPC. Us demano que impulseu o doneu suport a una llei que faci el mateix amb els trams i mínims de l'IRPF, de manera automàtica, cada any.\n\n" +
      "Us agrairé que em feu saber la vostra posició.\n\nAtentament,\n[Nom i cognoms]\n[Municipi]";
    $("letter").value = txt;
  }

  function bindCalc() {
    var g = $("gross"), r = $("grossRange");
    function setGross(v) {
      v = Math.max(0, Math.min(300000, Number(v) || 0));
      state.gross = v; g.value = v; r.value = Math.min(Math.max(v, 12000), 120000); calc();
    }
    g.addEventListener("input", function () { setGross(g.value); });
    r.addEventListener("input", function () { setGross(r.value); });
    Array.prototype.forEach.call(document.querySelectorAll("#baseYear button"), function (b) {
      b.addEventListener("click", function () {
        state.baseYear = Number(b.dataset.year);
        Array.prototype.forEach.call(document.querySelectorAll("#baseYear button"), function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        calc();
      });
    });
    $("copyShare").addEventListener("click", function () { copy(shareText(), "toast1"); });
    $("copyLetter").addEventListener("click", function () { copy($("letter").value, "toast2"); });
  }

  // ---------- chart: extra by salary ----------
  function drawExtraChart(current) {
    var svg = $("chartExtra"); clear(svg);
    var W = 900, H = 340, m = { l: 60, r: 20, t: 20, b: 44 };
    var xs = [], pts = [];
    for (var g = 12000; g <= 120000; g += 1000) { xs.push(g); pts.push(IRPF.compare(g, state.baseYear).extra); }
    var ymax = Math.max(500, Math.ceil(Math.max.apply(null, pts) / 500) * 500);
    function X(v) { return m.l + (v - 12000) / (120000 - 12000) * (W - m.l - m.r); }
    function Y(v) { return H - m.b - v / ymax * (H - m.t - m.b); }
    for (var y = 0; y <= ymax; y += ymax <= 1500 ? 250 : 500) {
      svg.appendChild(el("line", { x1: m.l, x2: W - m.r, y1: Y(y), y2: Y(y), class: y === 0 ? "axis" : "grid" }));
      svg.appendChild(el("text", { x: m.l - 8, y: Y(y) + 4, "text-anchor": "end" }, nf0.format(y) + " €"));
    }
    for (var xv = 20000; xv <= 120000; xv += 20000) {
      svg.appendChild(el("text", { x: X(xv), y: H - m.b + 20, "text-anchor": "middle" }, nf0.format(xv / 1000) + "k €"));
    }
    svg.appendChild(el("text", { x: W - m.r, y: H - 6, "text-anchor": "end" }, "Salari brut anual"));
    var d = "M" + X(xs[0]) + "," + Y(0);
    xs.forEach(function (x, i) { d += " L" + X(x) + "," + Y(pts[i]); });
    svg.appendChild(el("path", { d: d + " L" + X(xs[xs.length - 1]) + "," + Y(0) + " Z", class: "area" }));
    var dl = "M" + X(xs[0]) + "," + Y(pts[0]);
    xs.forEach(function (x, i) { dl += " L" + X(x) + "," + Y(pts[i]); });
    svg.appendChild(el("path", { d: dl, class: "lineP" }));
    var gx = Math.min(Math.max(state.gross, 12000), 120000);
    var cy = current.extra;
    svg.appendChild(el("line", { x1: X(gx), x2: X(gx), y1: Y(0), y2: Y(cy), stroke: "var(--accent)", "stroke-dasharray": "3 3" }));
    svg.appendChild(el("circle", { cx: X(gx), cy: Y(cy), r: 6, class: "marker" }));
    var anchor = gx > 95000 ? "end" : "start";
    svg.appendChild(el("text", { x: X(gx) + (anchor === "end" ? -10 : 10), y: Y(cy) - 10, "text-anchor": anchor, class: "lbl-strong" }, "Tu: " + eur(cy) + "/any"));
  }

  // ---------- chart: effective tax rates ----------
  function drawTaxChart() {
    var svg = $("chartTax"); clear(svg);
    var rows = D.societats.tipus.map(function (t) { return { label: t.grup, v: t.t, kind: t.kind }; });
    [25000, 35000, 50000].forEach(function (g) {
      rows.push({ label: "Assalariat amb " + nf0.format(g) + " € bruts", v: IRPF.compute(g).effective * 100, kind: "worker" });
    });
    if ([25000, 35000, 50000].indexOf(state.gross) < 0 && state.gross >= 16000) {
      rows.push({ label: "Tu (" + nf0.format(state.gross) + " €)", v: IRPF.compute(state.gross).effective * 100, kind: "you" });
    }
    rows.sort(function (a, b) { return b.v - a.v; });
    var W = 900, rowH = 34, m = { l: 300, r: 70, t: 24, b: 30 };
    var H = m.t + m.b + rows.length * rowH;
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    var vmax = 30;
    function X(v) { return m.l + v / vmax * (W - m.l - m.r); }
    [0, 5, 10, 15, 20, 25, 30].forEach(function (v) {
      svg.appendChild(el("line", { x1: X(v), x2: X(v), y1: m.t - 6, y2: H - m.b, class: v === 0 ? "axis" : "grid" }));
      svg.appendChild(el("text", { x: X(v), y: H - m.b + 18, "text-anchor": "middle" }, v + "%"));
    });
    svg.appendChild(el("line", { x1: X(25), x2: X(25), y1: m.t - 10, y2: H - m.b, stroke: "var(--ink)", "stroke-width": 1.5 }));
    svg.appendChild(el("text", { x: X(25) + 4, y: m.t - 10, class: "lbl" }, "Tipus nominal societats 25%"));
    rows.forEach(function (r, i) {
      var y = m.t + i * rowH;
      var fill = r.kind === "worker" || r.kind === "you" ? "var(--accent)" : r.kind === "pime" || r.kind === "total" ? "var(--blue)" : "var(--grey-bar)";
      svg.appendChild(el("text", { x: m.l - 10, y: y + rowH / 2 + 4, "text-anchor": "end", class: r.kind === "you" ? "lbl-strong" : "lbl" }, r.label));
      svg.appendChild(el("rect", { x: X(0), y: y + 7, width: Math.max(1, X(r.v) - X(0)), height: rowH - 14, rx: 4, fill: fill, opacity: r.kind === "total" ? 0.55 : 1 }));
      svg.appendChild(el("text", { x: X(r.v) + 6, y: y + rowH / 2 + 4, class: "lbl" }, pct(r.v)));
    });
    $("taxCaption").innerHTML = "";
    $("taxCaption").appendChild(document.createTextNode("Empreses: tipus efectiu sobre el benefici, " + D.societats.any + ". Font: " + D.societats.src + ". Assalariats: només IRPF sobre el brut (a més paguen un 6,48% de cotització i l'empresa un ~32% més, que generen dret a pensió). "));
    var a = document.createElement("a"); a.href = D.societats.urls[0]; a.target = "_blank"; a.rel = "noopener"; a.textContent = "Veure dades";
    $("taxCaption").appendChild(a);
  }

  function renderAbsolutes() {
    var box = $("absolutes");
    D.societats.absoluts.forEach(function (r) {
      var p = r.impost / r.benefici * 100;
      var d = document.createElement("div"); d.className = "item";
      d.innerHTML = '<div class="g"></div><div class="pct"></div><div class="bar"><i></i></div><div class="nums"></div>';
      d.querySelector(".g").textContent = r.grup;
      d.querySelector(".pct").textContent = pct(p);
      d.querySelector(".bar i").style.width = Math.min(100, p / 25 * 100) + "%";
      d.querySelector(".nums").textContent = (r.aprox ? "~" : "") + nf0.format(r.benefici) + " M€ de benefici → " + nf0.format(r.impost) + " M€ d'impost";
      box.appendChild(d);
    });
  }

  function drawBanks() {
    var svg = $("chartBanks"); clear(svg);
    var items = D.bancaBeneficis2025.items, W = 900, rowH = 40, m = { l: 120, r: 120, t: 10 };
    var vmax = 15000;
    function X(v) { return m.l + v / vmax * (W - m.l - m.r); }
    items.forEach(function (it, i) {
      var y = m.t + i * rowH;
      svg.appendChild(el("text", { x: m.l - 10, y: y + 24, "text-anchor": "end", class: "lbl" }, it.nom));
      svg.appendChild(el("rect", { x: X(0), y: y + 8, width: X(it.benefici) - X(0), height: 24, rx: 4, fill: "var(--grey-bar)" }));
      svg.appendChild(el("text", { x: X(it.benefici) + 8, y: y + 25, class: "lbl" }, nf0.format(it.benefici) + " M€"));
    });
    $("bankCaption").textContent = "Benefici net rècord del 2025 (grup, inclou activitat internacional). El nou impost a la banca equival a un ~" + D.bancaBeneficis2025.impostBancaPctBenefici + "% dels beneficis. Font: " + D.bancaBeneficis2025.src + ".";
  }

  // ---------- chain: one euro to the pocket ----------
  var chain = { X: 50000, t: 8.87 };

  function drawChain() {
    var svg = $("chartChain"); clear(svg);
    var X = chain.X, t = chain.t / 100;
    var rows = [
      { label: "Treballador", sub: "cobra un sou", r: IRPF.laborChain(X) },
      { label: "Accionista", sub: "cobra un dividend", r: IRPF.dividendChain(X, t) },
      { label: "Societat patrimonial", sub: "cobra via la seva societat", r: IRPF.holdingChain(X, t) }
    ];
    var W = 900, rowH = 86, m = { l: 190, r: 70, t: 14 };
    function Xs(v) { return m.l + v / X * (W - m.l - m.r); }
    rows.forEach(function (row, i) {
      var y = m.t + i * rowH, h = 34, x = 0;
      var r = row.r;
      var segs = [
        { v: r.corporate, c: "var(--grey-bar)" },
        { v: r.irpf, c: "var(--accent)" },
        { v: r.contributions, c: "var(--blue)" },
        { v: r.net, c: "var(--ok)" }
      ];
      svg.appendChild(el("text", { x: m.l - 12, y: y + 20, "text-anchor": "end", class: "lbl-strong" }, row.label));
      svg.appendChild(el("text", { x: m.l - 12, y: y + 37, "text-anchor": "end", style: "font-size:11px" }, row.sub.length > 30 ? row.sub.slice(0, 29) + "…" : row.sub));
      segs.forEach(function (s) {
        if (s.v <= 0) return;
        var w = Xs(x + s.v) - Xs(x);
        svg.appendChild(el("rect", { x: Xs(x), y: y + 6, width: Math.max(0.5, w), height: h, fill: s.c }));
        if (w > 46) svg.appendChild(el("text", { x: Xs(x) + w / 2, y: y + 28, "text-anchor": "middle", style: "fill:#fff;font-weight:700;font-size:12px" }, nf0.format(s.v / X * 100) + "%"));
        x += s.v;
      });
      var taxOnly = (r.corporate + r.irpf) / X * 100;
      var all = (r.corporate + r.irpf + r.contributions) / X * 100;
      var note = r.contributions > 0
        ? "Impostos " + pct(taxOnly) + " · amb cotitzacions " + pct(all)
        : "Impostos " + pct(taxOnly) + (r.deferred ? " · IRPF ajornat, no pagat" : "");
      svg.appendChild(el("text", { x: m.l, y: y + h + 24, class: "lbl" }, note));
    });

    var L = rows[0].r, Dv = rows[1].r, H = rows[2].r;
    var lTax = (L.corporate + L.irpf) / X * 100, lAll = (L.corporate + L.irpf + L.contributions) / X * 100;
    var dTax = (Dv.corporate + Dv.irpf) / X * 100, hTax = (H.corporate + H.irpf) / X * 100;
    var read;
    if (lTax < dTax) {
      read = "Amb " + eur(X) + ", el treballador paga menys impostos purs (" + pct(lTax) + ") que l'accionista (" + pct(dTax) +
        "), però si hi sumes les cotitzacions arriba al " + pct(lAll) + ". La càrrega del treball és sobretot Seguretat Social, que dona dret a pensió.";
    } else {
      read = "Amb " + eur(X) + ", el treball ja paga més impostos purs (" + pct(lTax) + ") que el dividend (" + pct(dTax) +
        "), i amb cotitzacions el " + pct(lAll) + ". L'IRPF del treball arriba al 50%; el de l'estalvi s'atura al 30%.";
    }
    read += " Via societat patrimonial: " + pct(hTax) + ", passi el que passi.";
    $("chainRead").textContent = read;

    var t2 = $("chainTable"); t2.innerHTML = "";
    var head = ["", "Societats", "IRPF", "Cotitzacions", "Net"];
    var tr0 = document.createElement("tr");
    head.forEach(function (hd, j) { var th = document.createElement("th"); th.textContent = hd; if (j) th.className = "num"; tr0.appendChild(th); });
    t2.appendChild(tr0);
    rows.forEach(function (row) {
      var tr = document.createElement("tr");
      [row.label, eur(row.r.corporate), eur(row.r.irpf), eur(row.r.contributions), eur(row.r.net)].forEach(function (c, j) {
        var td = document.createElement("td"); td.textContent = c; if (j) td.className = "num"; tr.appendChild(td);
      });
      t2.appendChild(tr);
    });
  }

  function bindChain() {
    var n = $("chainX"), r = $("chainXRange");
    function setX(v) {
      v = Math.max(1000, Math.min(1000000, Number(v) || 0));
      chain.X = v; n.value = v; r.value = Math.min(Math.max(v, 10000), 400000); drawChain();
    }
    n.addEventListener("input", function () { setX(n.value); });
    r.addEventListener("input", function () { setX(r.value); });
    Array.prototype.forEach.call(document.querySelectorAll("#corpRate button"), function (b) {
      b.addEventListener("click", function () {
        chain.t = Number(b.dataset.t);
        Array.prototype.forEach.call(document.querySelectorAll("#corpRate button"), function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        drawChain();
      });
    });
    drawChain();
  }

  // ---------- housing ----------
  function drawTop() {
    var svg = $("chartTop"); clear(svg);
    var top = D.habitatge.top, W = 520, rowH = 46, m = { l: 110, r: 70, t: 6 };
    var vmax = 25000;
    function X(v) { return m.l + v / vmax * (W - m.l - m.r); }
    top.forEach(function (t, i) {
      var y = m.t + i * rowH;
      svg.appendChild(el("text", { x: m.l - 10, y: y + 20, "text-anchor": "end", class: "lbl" }, t.nom));
      svg.appendChild(el("text", { x: m.l - 10, y: y + 35, "text-anchor": "end", style: "font-size:11px" }, t.tipus));
      svg.appendChild(el("rect", { x: X(0), y: y + 8, width: X(t.n) - X(0), height: 24, rx: 4, fill: t.tipus === "Banc" ? "var(--blue)" : "var(--accent)" }));
      svg.appendChild(el("text", { x: X(t.n) + 6, y: y + 25, class: "lbl" }, nf0.format(t.n)));
    });
  }

  function drawComp() {
    var svg = $("chartComp"); clear(svg);
    var h = D.habitatge, W = 520;
    var total = h.totalMega, x = 10, w = W - 20;
    var colors = ["var(--accent)", "var(--blue)", "var(--grey-bar)"];
    h.composicio.forEach(function (c, i) {
      var cw = c.n / total * w;
      svg.appendChild(el("rect", { x: x, y: 20, width: cw, height: 46, fill: colors[i] }));
      x += cw;
    });
    h.composicio.forEach(function (c, i) {
      var y = 100 + i * 34;
      svg.appendChild(el("rect", { x: 10, y: y - 12, width: 14, height: 14, rx: 3, fill: colors[i] }));
      svg.appendChild(el("text", { x: 32, y: y, class: "lbl" }, c.cat));
      svg.appendChild(el("text", { x: W - 10, y: y, "text-anchor": "end", class: "lbl" }, nf0.format(c.n) + " (" + nf0.format(c.n / total * 100) + "%)"));
    });
    svg.appendChild(el("text", { x: 10, y: 222 }, "Més del 15% dels lloguers amb fiança d'aquestes 11 comunitats."));
    svg.appendChild(el("text", { x: 10, y: 242 }, "La resta: particulars i petites empreses."));
  }

  function bindRent() {
    var r = $("rent");
    function upd() {
      var v = Number(r.value);
      $("rentOut").textContent = meur(178000 * v * 12);
      $("rentCaixa").textContent = meur((22000 + 19600) * v * 12);
      r.setAttribute("aria-valuetext", v + " € al mes");
    }
    r.addEventListener("input", upd); upd();
  }

  function renderFacts() {
    var ul = $("facts");
    D.habitatge.context.forEach(function (f) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(f.text + " "));
      var s = document.createElement("a"); s.className = "src"; s.href = f.url; s.target = "_blank"; s.rel = "noopener"; s.textContent = "(" + f.src + ")";
      li.appendChild(s); ul.appendChild(li);
    });
  }

  function renderSources() {
    var list = [
      [D.irpfMacro.extraFuncas.src, D.irpfMacro.extraFuncas.url],
      [D.irpfMacro.extraBdE.src, D.irpfMacro.extraBdE.url],
      [D.irpfMacro.recaptacioIRPF2025.src, D.irpfMacro.recaptacioIRPF2025.url],
      ["Escales IRPF estatal i catalana 2025 (taxdown.es, transcripció de l'art. 63 LIRPF i art. 611-1 CTC)", "https://taxdown.es/irpf/tramos-tablas-cataluna"],
      ["IPC, variació mitjana anual (INE)", "https://www.ine.es/varipc/"],
      ["Impost de Societats 2023: Público", D.societats.urls[0]],
      ["Impost de Societats 2023: Diario AyE", D.societats.urls[1]],
      ["AEAT, Comptes anuals consolidats de l'IS (dades obertes)", D.societats.urls[2]],
      [D.bancaBeneficis2025.src, D.bancaBeneficis2025.url],
      [D.habitatge.src, D.habitatge.url]
    ];
    if (window.DATA2) {
      list.push([window.DATA2.epf.src, window.DATA2.epf.url]);
      list.push([window.DATA2.rendes.src, window.DATA2.rendes.url]);
      list.push([window.DATA2.cofog.src, window.DATA2.cofog.url]);
      list.push(["Resultats 2025 de cada empresa: enllaç al nom de l'empresa al cercador", "empreses.html#cercador"]);
    }
    D.habitatge.context.forEach(function (f) { list.push([f.src, f.url]); });
    var ul = $("sources");
    list.forEach(function (s) {
      var li = document.createElement("li"); var a = document.createElement("a");
      a.href = s[1]; a.target = "_blank"; a.rel = "noopener"; a.textContent = s[0]; li.appendChild(a); ul.appendChild(li);
    });
  }

  // ---------- init ----------
  if ($("heroStats")) renderHero();
  if ($("gross")) bindCalc();
  calc();
  if ($("absolutes")) renderAbsolutes();
  if ($("chartChain")) bindChain();
  if ($("chartBanks")) drawBanks();
  if ($("chartTop")) { drawTop(); drawComp(); bindRent(); renderFacts(); }
  if ($("sources")) renderSources();
})();
