/* Dades amb font. Cada bloc porta la seva font i la data de consulta (novembre 2026). */
window.DATA = {
  irpfMacro: {
    recaptacioIRPF2025: { value: 142466, unit: "M€", note: "+10,1% vs 2024",
      src: "AEAT, Informe anual de recaptació 2025", url: "https://sede.agenciatributaria.gob.es/static_files/AEAT/Estudios/Estadisticas/Informes_Estadisticos/Informes_Anuales_de_Recaudacion_Tributaria/Ejercicio_2025/Infografia_2025_va_es.pdf" },
    extraFuncas: { value: 9750, unit: "M€", note: "recaptats de més 2021-2024 per no deflactar",
      src: "Funcas (Romero-Jordán) via Forbes", url: "https://forbes.es/?p=662934" },
    extraBdE: { value: 50, unit: "%", note: "de l'augment de l'IRPF sobre el PIB 2019-2023 s'explica per la inflació",
      src: "Banc d'Espanya, Document ocasional 2422", url: "https://www.bde.es/wbe/es/publicaciones/analisis-economico-investigacion/documentos-ocasionales/progresividad-en-frio--el-impacto-heterogeneo-de-la-inflacion-sobre-la-recaudacion-por-irpf.html" },
    airef: { value: 1800, unit: "M€/any", note: "extra estimat per no deflactar la tarifa el 2025",
      src: "AIReF via Funcas", url: "https://www.funcas.es/descargar/227234/" }
  },

  // Impost de Societats 2023: tipus efectiu sobre el resultat comptable (benefici)
  societats: {
    any: 2023,
    src: "AEAT, Comptes anuals consolidats de l'Impost de Societats 2023 (via Público i Diario AyE)",
    urls: [
      "https://www.publico.es/economia/agujeros-impuesto-sociedades-banca-grandes-empresas-tributan-sobre-beneficios-pymes.html",
      "https://www.autonomosyemprendedor.es/pymes/hacienda-publica-tipos-que-estan-pagando-pymes-sociedades-cuatro-veces-mas-que-grandes/20251024142336046172.html",
      "https://sede.agenciatributaria.gob.es/Sede/datosabiertos/catalogo/hacienda/Cuentas_Anuales_Consolidadas_del_Impuesto_sobre_Sociedades.shtml"
    ],
    tipusNominal: 25,
    tipus: [
      { grup: "Petites empreses (10-50 treballadors)", t: 18.65, kind: "pime" },
      { grup: "Mitjanes (50-250)", t: 16.92, kind: "pime" },
      { grup: "Microempreses (1-10)", t: 15.3, kind: "pime" },
      { grup: "Mitjana de totes les empreses", t: 12.05, kind: "total" },
      { grup: "Empreses sense assalariats", t: 9.27, kind: "pime" },
      { grup: "Grans (més de 250)", t: 8.87, kind: "gran" },
      { grup: "Facturació > 1.000 M€ (283 empreses)", t: 6.97, kind: "gran" },
      { grup: "Més de 5.000 treballadors", t: 4.75, kind: "gran" },
      { grup: "Banca", t: 4.26, kind: "gran" }
    ],
    absoluts: [
      { grup: "Banca", benefici: 32394, impost: 1379 },
      { grup: "283 empreses que facturen > 1.000 M€", benefici: 120000, impost: 8360, aprox: true },
      { grup: "Pimes (~98% de declarants)", benefici: 133000, impost: 21250, aprox: true }
    ],
    recaptacio2023: 35198
  },

  bancaBeneficis2025: {
    src: "Resultats anuals 2025 (via Vozpópuli, The Objective, Forbes)",
    url: "https://www.vozpopuli.com/economia/banca/bbva-bate-record-de-beneficios-tras-ganar-10511-millones-en-2025-y-pagara-mas-de-5000-en-dividendos.html",
    items: [
      { nom: "Santander", benefici: 14101 },
      { nom: "BBVA", benefici: 10511 },
      { nom: "CaixaBank", benefici: 5891 }
    ],
    impostBancaPctBenefici: 3
  },

  // Megatenidors: entitats amb >= 50 habitatges llogats, segons fiances de 11 CCAA (Civio, 2024)
  habitatge: {
    src: "Fundació Civio (2024), dades de fiances de 11 comunitats autònomes, via El Cronista",
    url: "https://www.cronista.com/espana/economia-finanzas/alquileres-en-espana-caixabank-y-blackstone-son-los-fondos-de-inversion-con-mas-viviendas-segun-civio/",
    totalLloguersFianca: 1800000,
    composicio: [
      { cat: "Empreses i fons privats", n: 178000 },
      { cat: "Administracions públiques", n: 117800 },
      { cat: "Fundacions i altres", n: 7300 }
    ],
    totalMega: 303150,
    top: [
      { nom: "CaixaBank", n: 22000, tipus: "Banc", nota: "més de 5.000 a Catalunya" },
      { nom: "Blackstone", n: 19600, tipus: "Fons (EUA)", nota: "27 filials; 13.000 a Madrid" },
      { nom: "CBRE", n: 8000, tipus: "Immobiliària (EUA)", nota: "" },
      { nom: "Cerberus", n: 7000, tipus: "Fons (EUA)", nota: "" },
      { nom: "TPG Capital", n: 1700, tipus: "Fons (EUA)", nota: "" }
    ],
    perTipus: [
      { cat: "Immobiliàries (604 empreses)", n: 87100 },
      { cat: "Entitats financeres (52)", n: 76000 }
    ],
    context: [
      { text: "Entre el 80% i el 90% dels pisos de lloguer són de particulars.", src: "El Cronista / Civio", url: "https://www.cronista.com/espana/economia-finanzas/alquileres-en-espana-caixabank-y-blackstone-son-los-fondos-de-inversion-con-mas-viviendas-segun-civio/" },
      { text: "Més de la meitat del lloguer de particulars és de multipropietaris (2 o més pisos).", src: "El Salto", url: "https://www.elsaltodiario.com/alquiler/61-viviendas-estan-manos-multipropietarios-personas-juridicas" },
      { text: "Un jove que lloga sol destina el 98,7% del sou al lloguer.", src: "CJE 2025, via Euronews", url: "https://es.euronews.com/2026/05/22/el-alquiler-consume-el-987-del-salario-juvenil-en-pisos-individuales-y-mas-del-33-en-compa" },
      { text: "A Catalunya, qui viu de lloguer té el triple de probabilitats de ser pobre que un propietari.", src: "Idescat via Nació Digital", url: "https://naciodigital.cat/societat/llogaters-tenen-triple-possibilitats-ser-pobres-propietaris_2095605_102.html" }
    ]
  }
};
