/* Dades de les pàgines «El teu sou», «On van els impostos» i «Empreses». Totes amb font. */
window.DATA2 = {
  // INE, Enquesta de pressupostos familiars 2024 (despesa mitjana per llar: 34.044 €)
  epf: {
    any: 2024,
    total: 34044,
    src: "INE, Enquesta de pressupostos familiars 2024",
    url: "https://ine.es/dyngs/Prensa/EPF2024.htm",
    grups: [
      { id: "habitatge", nom: "Habitatge, aigua, llum i gas", pct: 32.4, eur: 11029, q1: 40.3, q5: 28.1, qui: "Propietaris, bancs (hipoteques), elèctriques i gasistes" },
      { id: "aliments", nom: "Aliments i begudes", pct: 15.8, eur: 5391, q1: 19.9, q5: 12.0, qui: "Supermercats i indústria alimentària" },
      { id: "transport", nom: "Transport", pct: 11.4, eur: 3877, q1: 6.6, q5: 15.9, qui: "Petrolieres, fabricants de cotxes, transport públic" },
      { id: "restaurants", nom: "Restaurants i allotjament", pct: 9.9, eur: 3374, q1: 6.3, q5: 11.9, qui: "Hostaleria (majoritàriament pimes)" },
      { id: "oci", nom: "Oci, esport i cultura", pct: 5.0, eur: 1692, q1: 3.0, q5: 6.1, qui: "Molt repartit" },
      { id: "roba", nom: "Roba i calçat", pct: 4.2, eur: 1432, q1: 4.1, q5: 4.3, qui: "Grans cadenes de moda" },
      { id: "salut", nom: "Salut (despesa privada)", pct: 4.0, eur: 1377, q1: 3.1, q5: 4.2, qui: "Farmàcies, dentistes, mútues" },
      { id: "mobles", nom: "Mobles i manteniment de la llar", pct: 3.7, eur: 1274, q1: 2.9, q5: 4.6, qui: "Molt repartit" },
      { id: "assegurances", nom: "Assegurances i serveis financers", pct: 3.7, eur: 1270, q1: 3.7, q5: 3.5, qui: "Asseguradores i bancs" },
      { id: "altres", nom: "Cura personal i altres", pct: 3.6, eur: 1228, q1: 3.3, q5: 3.7, qui: "Molt repartit" },
      { id: "comunicacions", nom: "Telèfon i internet", pct: 3.2, eur: 1101, q1: 4.4, q5: 2.6, qui: "Operadores de telecomunicacions" },
      { id: "educacio", nom: "Educació (despesa privada)", pct: 1.6, eur: 553, q1: 1.0, q5: 2.1, qui: "Escoles concertades i privades, acadèmies" },
      { id: "alcohol", nom: "Alcohol i tabac", pct: 1.3, eur: 447, q1: 1.5, q5: 1.1, qui: "Tabaqueres i Estat (impostos especials)" }
    ],
    nota: "Mitjana de totes les llars. Per a qui és propietari, l'INE hi compta un lloguer imputat, de manera que la mitjana amaga molta diferència entre qui paga lloguer o hipoteca i qui no."
  },

  // Qui cobra: empreses líders per partida
  quiCobra: [
    { grup: "Aliments", text: "Mercadona té el 29,5% del mercat, Carrefour el 7,2% i Lidl el 6,2% (NIQ, 2025). Mercadona va guanyar 1.729 M€ el 2025, un 25% més, amb un marge del 4,5% sobre vendes.",
      fonts: [["Forbes", "https://forbes.es/economia/864120/mercadona-consolida-en-2025-su-liderazgo-al-frente-de-la-distribucion-con-una-cuota-de-casi-el-30/"], ["El Cronista", "https://www.cronista.com/espana/economia-finanzas/mercadona-arroja-ganancias-por-1729-millones-de-euros-un-aumento-del-25-en-el-ultimo-ano"]] },
    { grup: "Llum i gas", text: "Iberdrola va guanyar 6.285 M€ el 2025 (dos terços fora d'Espanya), Endesa 2.198 M€ i Naturgy 2.023 M€.", fonts: [["Cercador d'empreses", "empreses.html#cercador"]] },
    { grup: "Hipoteca i comptes", text: "Santander va guanyar 14.101 M€, BBVA 10.511 M€ i CaixaBank 5.891 M€ el 2025. CaixaBank fa el 86% del benefici a Espanya; Santander i BBVA, entre un 25% i un 40%.", fonts: [["Cercador d'empreses", "empreses.html#cercador"]] },
    { grup: "Lloguer", text: "Entre el 80% i el 90% dels pisos de lloguer són de particulars. Els grans tenidors (CaixaBank, Blackstone...) en tenen més del 15% a les comunitats amb dades.", fonts: [["Pàgina d'habitatge", "habitatge.html"]] },
    { grup: "Benzina", text: "Repsol va guanyar 1.899 M€ el 2025, un terç a Espanya.", fonts: [["Cercador d'empreses", "empreses.html#cercador"]] },
    { grup: "Telèfon", text: "Telefónica va perdre 4.318 M€ el 2025 per reestructuracions i vendes a Llatinoamèrica. No tots els grans sectors guanyen diners.", fonts: [["Cercador d'empreses", "empreses.html#cercador"]] }
  ],

  // INE, Comptabilitat nacional anual (18 de setembre de 2026). Milions d'euros corrents.
  rendes: {
    src: "INE, Comptabilitat nacional anual d'Espanya 2023-2025",
    url: "https://www.ine.es/dyngs/Prensa/CNA2025.htm",
    anys: [
      { any: 2023, salaris: 711380, excedent: 640778, impostos: 144119, pib: 1496277 },
      { any: 2024, salaris: 762301, excedent: 680764, impostos: 155523, pib: 1598588 },
      { any: 2025, salaris: 817261, excedent: 703714, impostos: 169037, pib: 1690012 }
    ],
    creix2025: { salaris: 7.2, excedent: 3.4, ocupacio: 2.8, productivitat: 0.6 }
  },

  // IGAE, despesa de les administracions públiques per funcions (COFOG), 2020-2024. Milions d'euros.
  cofog: {
    any: 2024,
    total: 725001,
    total2020: 580164,
    pctPib: 45.47,
    poblacio: 48.87, // milions (PIB / PIB per càpita, INE 2024)
    src: "IGAE, Classificació funcional de la despesa de les administracions públiques 2020-2024",
    url: "https://www.igae.pap.hacienda.gob.es/sitios/igae/es-ES/Contabilidad/ContabilidadNacional/Publicaciones/Documents/AAPP_A/Funcional%202020-2024.pdf",
    funcions: [
      { nom: "Protecció social", eur: 297532, creix: 20.2, claus: "pensions jubilació viudetat atur dependència ajudes família ingrés mínim vital", desc: "Pensions, atur, dependència, ajudes a famílies i exclusió social.",
        sub: [{ nom: "Pensions", eur: 206130, creix: 30.4 }] },
      { nom: "Salut", eur: 102942, creix: 20.3, claus: "sanitat hospitals metges cap farmàcia medicaments", desc: "Hospitals, atenció primària, medicaments. La gestionen sobretot les comunitats autònomes." },
      { nom: "Serveis públics generals", eur: 92551, creix: 40.1, claus: "deute interessos administració govern parlament recerca bàsica unió europea", desc: "Interessos del deute, òrgans de govern, administració general, recerca bàsica.",
        sub: [{ nom: "Interessos del deute públic", eur: 38793, creix: 54.4 }, { nom: "Serveis generals de l'administració", eur: 16626, creix: 28.6 }, { nom: "Recerca bàsica", eur: 8513, creix: 48.8 }] },
      { nom: "Afers econòmics", eur: 80908, creix: 23.0, claus: "carreteres trens renfe adif transport agricultura energia subvencions empreses indústria r+d", desc: "Transport, agricultura, energia, ajudes a empreses, R+D aplicada.",
        sub: [{ nom: "Transport", eur: 28634, creix: 35.9 }, { nom: "Agricultura i pesca", eur: 7156, creix: 48.3 }, { nom: "Combustibles i energia", eur: 5756, creix: -0.7 }, { nom: "R+D econòmica", eur: 5485, creix: 29.7 }] },
      { nom: "Educació", eur: 65862, creix: 26.7, claus: "escoles instituts universitats professors beques", desc: "Escoles, instituts, universitats i beques." },
      { nom: "Ordre públic i seguretat", eur: 28628, creix: 22.0, claus: "policia mossos guàrdia civil jutjats justícia presons bombers", desc: "Policia, jutjats, presons i bombers." },
      { nom: "Oci, cultura i religió", eur: 19193, creix: 43.4, claus: "cultura esport televisió pública museus biblioteques", desc: "Esport, cultura, mitjans públics." },
      { nom: "Medi ambient", eur: 15539, creix: 44.1, claus: "residus escombraries aigües depuradores neteja", desc: "Recollida de residus, aigües residuals, protecció de la natura." },
      { nom: "Defensa", eur: 14233, creix: 34.9, claus: "exèrcit militar armament otan", desc: "Forces armades. Amb el criteri de l'OTAN la xifra és més alta, perquè inclou pensions militars i altres partides." },
      { nom: "Habitatge i serveis comunitaris", eur: 7613, creix: 47.9, claus: "habitatge públic pisos urbanisme enllumenat aigua", desc: "Habitatge públic, urbanisme, abastament d'aigua, enllumenat. És l'1% de la despesa." }
    ]
  },

  // Mercat del lloguer d'habitatge habitual (territori fiscal comú, sense País Basc ni Navarra), 2023.
  // Pisos de particulars: Ministeri de Drets Socials i CSIC, a partir del Panel de Hogares de l'IRPF.
  // Repartiment per nombre de pisos llogats per llar: EsadeEcPol, mateixa font de dades.
  // Empreses i parc públic: estimació del Banc d'Espanya citada a l'informe del Ministeri.
  lloguer: {
    any: 2023,
    particulars: 2570845,
    particulars2016: 1900883,
    pctLlarsArrendadores: 9.3,
    pctLlarsLlogateres: 20.2,
    segments: [
      { nom: "1 pis", grup: "Particulars", pisos: 1198014, mercat: true },
      { nom: "2 a 4 pisos", grup: "Particulars", pisos: 1020625, mercat: true },
      { nom: "5 a 9 pisos", grup: "Particulars", pisos: 259655, mercat: true },
      { nom: "10 o més", grup: "Particulars", pisos: 92550, mercat: true },
      { nom: "Empreses i fons", grup: "Empreses", pisos: 223552, mercat: true },
      { nom: "Públic i social", grup: "Públic", pisos: 300000, mercat: false }
    ],
    fonts: [
      ["Ministeri de Drets Socials, Consum i Agenda 2030 i CSIC (2026), «Un mercado dominado por multiarrendadores»", "https://www.dsca.gob.es/sites/default/files/prensa/Informe%201%20Multiarrendadores.pdf"],
      ["EsadeEcPol (2026), «Radiografía del alquiler residencial en España en manos de personas físicas»", "https://www.esade.edu/ecpol/es/blog/radiografia-del-alquiler-residencial-en-espana-en-manos-de-personas-fisicas/"]
    ]
  },

  // Resultats 2025 de grans empreses. Benefici net atribuït, benefici abans d'impostos (BAI) i despesa per impost
  // sobre beneficis del compte consolidat (tot el món). isEsp = impost de societats pagat en caixa a Espanya.
  // contribEsp = contribució tributària total a Espanya (inclou IVA, IRPF i cotitzacions que l'empresa recapta).
  empreses: [
    { nom: "Banco Santander", sector: "Banca", seu: "Santander / Boadilla del Monte (Madrid)", net: 14101, bai: 18681, imp: 4723, pes: "~30% del benefici a Espanya", nota: "BAI i impost de les operacions continuades (sense Polònia).", font: "https://www.santander.com/content/dam/santander-com/es/documentos/informacion-privilegiada/2026/02/hr-2026-02-03-resultados-obtenidos-durante-el-ejercicio-2025-nota-de-prensa-es.pdf" },
    { nom: "BBVA", baiEsp: 4138, sector: "Banca", seu: "Bilbao / Madrid", net: 10511, bai: 16227, imp: 5100, isEsp: 1032, contribEsp: 4208, pes: "~40% del benefici a Espanya; Mèxic és el primer mercat", nota: "L'impost inclou 318 M€ de l'impost a la banca.", font: "https://accionistaseinversores.bbva.com/wp-content/uploads/2026/05/Informe-Contribucion-Fiscal-2025-ESP.pdf" },
    { nom: "CaixaBank", baiEsp: 7446, sector: "Banca", seu: "València / Barcelona", net: 5891, bai: 8674, imp: 2775, isEsp: 620, contribEsp: 5299, pes: "86% del benefici a Espanya", nota: "L'impost inclou 611 M€ de l'impost a la banca i un ingrés de 420 M€ per crèdits fiscals. Impost de societats meritat a Espanya: 2.439 M€; pagat en caixa: 620 M€.", font: "https://www.caixabank.com/deployedfiles/caixabank_com/Estaticos/PDFs/Sostenibilidad/InformeFiscal_2025_ESP.pdf" },
    { nom: "Banco Sabadell", sector: "Banca", seu: "Sabadell", net: 1775, bai: 2601, imp: 824, pes: "~83% del benefici fora del Regne Unit", nota: "Impost segons la presentació de resultats.", font: "https://comunicacion.grupbancsabadell.com/wp-content/uploads/Presentacion-Banco_Sabadell_4T2025.pdf" },
    { nom: "Bankinter", sector: "Banca", seu: "Madrid", net: 1090, bai: 1535, imp: 445, pes: "84% del benefici a Espanya", nota: "", font: "https://www.bankinter.com/webcorporativa/en/communication-room/news/institutional/bankinter-posts-a-record-profit-of-1090-million-euros-in-2025-14-4-driven-by-growth-in-its-business-with-customers" },
    { nom: "Unicaja", sector: "Banca", seu: "Màlaga", net: 632, bai: 902, imp: 268, pes: "Gairebé tot a Espanya", nota: "", font: "https://www.unicajabanco.com/content/dam/unicaja/unicaja-corporacion/documentos-corporacion/noticias/tablas-resultados-unicaja-4t25.pdf" },
    { nom: "Abanca", sector: "Banca", seu: "Galícia", net: 902, bai: null, imp: null, pes: "~84% del negoci a Espanya", nota: "No cotitza. Sense dades d'impost verificades.", font: "https://comunicacion.abanca.com/es/noticias/abanca-gana-9024-millones-de-euros-con-una-rentabilidad-del-151-por-ciento/" },
    { nom: "Mapfre", sector: "Assegurances", seu: "Majadahonda (Madrid)", net: 1133, bai: 2525, imp: 728, pes: "~27% del benefici a Espanya i Portugal", nota: "Xifres NIIF. Molts socis minoritaris (665 M€).", font: "https://www.mapfre.com/media/2026/02/cuentas-anuales-e-informe-gestion-consolidados-2025.pdf" },
    { nom: "Iberdrola", sector: "Energia", seu: "Bilbao", net: 6285, bai: 8492, imp: 1702, contribEsp: 4700, pes: "~38% del resultat operatiu a Espanya i Portugal", nota: "BAI calculat a partir del compte de resultats.", font: "https://www.iberdrola.com/documents/20125/5693151/informe-25FY.pdf" },
    { nom: "Endesa", sector: "Energia", seu: "Madrid (matriu: Enel, Itàlia)", net: 2198, bai: 2915, imp: 681, isEsp: 820, contribEsp: 4459, pes: "~90% del negoci a Espanya", nota: "BAI i impost provisionals (font secundària, pendent de confirmar als comptes anuals).", font: "https://www.endesa.com/es/prensa/sala-de-prensa/noticias/informacion-economica/compromiso-fiscal-contribucion-tributaria-record" },
    { nom: "Naturgy", sector: "Energia", seu: "Madrid", net: 2023, bai: 3218, imp: 833, pes: "Sense desglossament", nota: "Tipus efectiu publicat: 25,9%.", font: "https://www.naturgy.com/files/Naturgy_Resultados_Informe_FY2025.pdf" },
    { nom: "Repsol", sector: "Energia", seu: "Madrid", net: 1899, bai: 2817, imp: 717, isEsp: -490, contribEsp: 9922, pes: "32% del benefici a Espanya", nota: "El 2025 Hisenda li va tornar 490 M€ nets d'impost de societats (sentència contra el RDL 3/2016). La contribució total és sobretot impost d'hidrocarburs i IVA que paga el consumidor.", font: "https://www.repsol.com/content/dam/repsol-corporate/es/sostenibilidad/informes/2025/informe-contribucion-fiscal-2025.pdf" },
    { nom: "Redeia (Red Eléctrica)", baiEsp: 631, sector: "Infraestructures", seu: "Alcobendas (Madrid)", net: 506, bai: 701, imp: 165, isEsp: 156, pes: "90% del benefici a Espanya", nota: "", font: "https://www.redeia.com/sites/default/files/publication/2026/06/downloadable/transparencia-tributaria-2025.pdf" },
    { nom: "Aena", baiEsp: 2765, sector: "Infraestructures", seu: "Madrid (majoria de l'Estat)", net: 2137, bai: 2859, imp: 674, isEsp: 588, pes: "85% dels ingressos a Espanya", nota: "", font: "https://www.aena.es/es/accionistas-e-inversores/informacion-economico-financiera/transparencia-fiscal/contribucion-tributaria-territorios.html" },
    { nom: "ACS", sector: "Construcció", seu: "Madrid", net: 950, bai: 1662, imp: 453, pes: "8% de les vendes a Espanya; 59% als EUA", nota: "", font: "https://pressroom.grupoacs.com/en/news/acs-group-increases-its-net-profit-by-15-to-950-million" },
    { nom: "Ferrovial", sector: "Infraestructures", seu: "Amsterdam (Països Baixos)", net: 888, bai: 1070, imp: -60, isEsp: -4.9, isEspAny: 2024, pes: "Resultat a Espanya: -4 M€", nota: "Va traslladar la seu als Països Baixos el 2023. El 2025 l'impost va ser un ingrés de 60 M€ per crèdits fiscals.", font: "https://www.ferrovial.com/en/sustainability/governance/tax-corner/taxation-country-by-country-report/" },
    { nom: "Acciona", sector: "Energia i infraestructures", seu: "Madrid", net: 803, bai: 1392, imp: 264, pes: "22% dels ingressos a Espanya", nota: "Benefici amb plusvàlues per venda d'actius.", font: "https://www.acciona.com/content/dam/acciona-global/documentos/cnmv/2026/fy-2025-results.pdf" },
    { nom: "Amadeus", sector: "Tecnologia", seu: "Madrid", net: 1336, bai: 1718, imp: 385, pes: "4% dels ingressos a Espanya (per client)", nota: "", font: "https://amadeus.com/content/dam/amadeus/corporate/documents/en/investors/2025/financial-results/quarterly-results/q4-2025/2025-financial-results-pr-en.pdf" },
    { nom: "IAG (Iberia, Vueling)", baiEsp: 1438, sector: "Transport aeri", seu: "Madrid (cotitza a Londres)", net: 3342, bai: 4505, imp: 1163, isEsp: 228, pes: "~31% del benefici a Espanya", nota: "", font: "https://www.iairgroup.com/media/cpibkql1/public-cbcr-of-iag-uk.pdf" },
    { nom: "Inditex", sector: "Moda", seu: "Arteixo (A Coruña)", net: 6220, bai: 8020, imp: null, contribEsp: 2600, pes: "17% de les vendes a Espanya", nota: "Exercici de febrer del 2025 a gener del 2026. Despesa per impost pendent de verificar.", font: "https://www.inditex.com/itxcomweb/api/media/95537a57-b33e-4fcb-8822-a200d9da68c1/INDITEXResultadosEjercicio2025.pdf" },
    { nom: "Mercadona", sector: "Supermercats", seu: "València", net: 1729, bai: null, imp: null, contribEsp: 3110, pes: "95% de les vendes a Espanya", nota: "No cotitza. La contribució total inclou 1.372 M€ que recapta per compte d'altres (IVA, IRPF).", font: "https://www.elindependiente.com/economia/2026/03/10/mercadona-beneficio-ventas-2025/" },
    { nom: "Telefónica", sector: "Telecomunicacions", seu: "Madrid", net: -4318, bai: -1403, imp: 365, contribEsp: 3043, pes: "38% dels ingressos a Espanya", nota: "Pèrdues per reestructuració de plantilla i vendes a Llatinoamèrica.", font: "https://www.telefonica.com/es/wp-content/uploads/sites/4/2026/02/resultados-telefonica-4t-2025-nota-de-prensa.pdf" },
    { nom: "Cellnex", sector: "Telecomunicacions", seu: "Madrid", net: -361, bai: -452, imp: -99, isEsp: 46, pes: "15% dels ingressos a Espanya", nota: "Pèrdues per l'ERO i deterioraments.", font: "https://www.cellnex.com/app/uploads/2026/06/Informe-Impuesto-de-Sociedades-EU-Public-Country-by-Country-2025_SP.pdf" },
    { nom: "Lidl España", sector: "Supermercats", seu: "Montcada i Reixac (matriu: Schwarz, Alemanya)", net: null, bai: null, imp: null, contribEsp: 643, pes: "Vendes de 7.641 M€ a Espanya", nota: "Declara un benefici de 274 M€ sense precisar si és net.", font: "https://www.alimarket.es/alimentacion/noticia/431861/lidl-gana-274-m---un-20--mas--y-eleva-sus-ventas-un-10--hasta-los-7-641-m--en-2025" },
    { nom: "Carrefour España", sector: "Supermercats", seu: "Alcobendas (matriu: Carrefour, França)", net: null, bai: null, imp: null, pes: "Vendes de 10.958 M€ a Espanya", nota: "Sense comptes del 2025 de la filial espanyola. Resultat operatiu: 463 M€.", font: "https://www.carrefour.com/sites/default/files/2026-02/Press%20release%20Carrefour%20Q4+FY%202025.pdf" }
  ]
};
