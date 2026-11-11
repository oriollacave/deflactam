/* Navegació comuna i pàgines «El teu sou», «On van els impostos» i cercador d'empreses. */
(function () {
  "use strict";
  var D = window.DATA2;
  var SVGNS = "http://www.w3.org/2000/svg";
  var nf0 = new Intl.NumberFormat("ca-ES", { maximumFractionDigits: 0 });
  var nf1 = new Intl.NumberFormat("ca-ES", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  function $(id) { return document.getElementById(id); }
  function eur(x) { return nf0.format(Math.round(x)) + " €"; }
  function pct(x) { return nf1.format(x) + "%"; }
  function h(tag, attrs, text) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) n.setAttribute(k, attrs[k]);
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function s(tag, attrs, text) {
    var n = document.createElementNS(SVGNS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (text !== undefined) n.textContent = text;
    return n;
  }
  function link(text, url) {
    var a = h("a", { href: url }, text);
    if (/^https?:/.test(url)) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }
  function norm(t) { return String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); }

  // ---------- nav + footer ----------
  var PAGES = [
    ["index.html", "Inici"],
    ["sou.html", "El teu sou"],
    ["irpf.html", "IRPF"],
    ["impostos.html", "On van els impostos"],
    ["empreses.html", "Empreses"],
    ["habitatge.html", "Habitatge"]
  ];
  function renderNav() {
    var nav = $("nav"); if (!nav) return;
    var here = location.pathname.split("/").pop() || "index.html";
    var wrap = h("div", { class: "wrap" });
    var brand = h("a", { class: "brand", href: "index.html" });
    brand.appendChild(document.createTextNode("Deflacta"));
    brand.appendChild(h("span", {}, "'m"));
    wrap.appendChild(brand);
    PAGES.slice(1).forEach(function (p) {
      var a = h("a", { class: "link" + (here === p[0] ? " on" : ""), href: p[0] }, p[1]);
      wrap.appendChild(a);
    });
    nav.appendChild(wrap);
    var f = $("footer");
    if (f) {
      var w = h("div", { class: "wrap" });
      w.appendChild(document.createTextNode("Projecte ciutadà de codi obert. Dades consultades el novembre del 2026. Has trobat un error o tens una proposta? "));
      w.appendChild(link("Obre una incidència a GitHub", "https://github.com/oriollacave/deflactam/issues"));
      w.appendChild(document.createTextNode("."));
      f.appendChild(w);
    }
  }

  // ---------- El teu sou ----------
  function renderSou() {
    if (!$("souBars")) return;
    var input = $("souNet"), q = "mitjana";
    function draw() {
      var net = Math.max(0, Number(input.value) || 0);
      var svg = $("souBars"); while (svg.firstChild) svg.removeChild(svg.firstChild);
      var rows = D.epf.grups.map(function (g) { return { g: g, p: q === "q1" ? g.q1 : q === "q5" ? g.q5 : g.pct }; });
      rows.sort(function (a, b) { return b.p - a.p; });
      var W = 900, rowH = 30, m = { l: 270, r: 150, t: 6 };
      svg.setAttribute("viewBox", "0 0 " + W + " " + (m.t + rows.length * rowH + 6));
      var vmax = 42;
      rows.forEach(function (r, i) {
        var y = m.t + i * rowH, w = r.p / vmax * (W - m.l - m.r);
        svg.appendChild(s("text", { x: m.l - 10, y: y + 20, "text-anchor": "end", class: "lbl" }, r.g.nom));
        svg.appendChild(s("rect", { x: m.l, y: y + 6, width: Math.max(1, w), height: rowH - 12, rx: 4, fill: i < 3 ? "var(--accent)" : "var(--grey-bar)" }));
        svg.appendChild(s("text", { x: m.l + w + 8, y: y + 20, class: "lbl" }, pct(r.p) + " · " + eur(net * r.p / 100) + "/mes"));
      });
      var top3 = rows.slice(0, 3).reduce(function (a, r) { return a + r.p; }, 0);
      $("souSay").textContent = "De cada " + eur(net) + " que gasta la llar, " + eur(net * top3 / 100) + " (" + pct(top3) + ") se'n van en les tres primeres partides: " +
        rows.slice(0, 3).map(function (r) { return r.g.nom.toLowerCase(); }).join(", ") + ".";
    }
    input.addEventListener("input", draw);
    Array.prototype.forEach.call(document.querySelectorAll("#souQ button"), function (b) {
      b.addEventListener("click", function () {
        q = b.dataset.q;
        Array.prototype.forEach.call(document.querySelectorAll("#souQ button"), function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
        draw();
      });
    });
    draw();

    var tb = $("quiCobra");
    D.quiCobra.forEach(function (r) {
      var d = h("div", { class: "item" });
      d.appendChild(h("div", { class: "g" }, r.grup));
      var p = h("p", { class: "nums" }, r.text + " ");
      r.fonts.forEach(function (f, i) { if (i) p.appendChild(document.createTextNode(" · ")); p.appendChild(link(f[0], f[1])); });
      d.appendChild(p); tb.appendChild(d);
    });
  }

  function renderRendes() {
    var svg = $("chartRendes"); if (!svg) return;
    var R = D.rendes, W = 900, rowH = 46, m = { l: 60, r: 20, t: 8 };
    svg.setAttribute("viewBox", "0 0 " + W + " " + (m.t + R.anys.length * rowH + 4));
    R.anys.forEach(function (a, i) {
      var y = m.t + i * rowH, x = m.l, full = W - m.l - m.r;
      svg.appendChild(s("text", { x: m.l - 10, y: y + 26, "text-anchor": "end", class: "lbl-strong" }, a.any));
      [[a.salaris, "var(--accent)", "Salaris"], [a.excedent, "var(--blue)", "Excedent"], [a.impostos, "var(--grey-bar)", "Imp."]].forEach(function (p) {
        var w = p[0] / a.pib * full;
        svg.appendChild(s("rect", { x: x, y: y + 6, width: w, height: 30, fill: p[1] }));
        svg.appendChild(s("text", { x: x + w / 2, y: y + 26, "text-anchor": "middle", style: "fill:#fff;font-weight:700;font-size:13px" }, pct(p[0] / a.pib * 100)));
        x += w;
      });
    });
  }

  // ---------- On van els impostos ----------
  function renderCofog() {
    if (!$("cofogList")) return;
    var C = D.cofog, input = $("cofogSearch"), gross = $("cofogGross");
    function taxes() {
      var g = Math.max(0, Number(gross.value) || 0);
      return window.IRPF ? window.IRPF.compute(g).irpf : 0;
    }
    function draw() {
      var q = norm(input.value.trim()), t = taxes();
      var box = $("cofogList"); box.innerHTML = "";
      var shown = 0;
      C.funcions.forEach(function (f) {
        var hay = norm(f.nom + " " + f.claus + " " + f.desc + " " + (f.sub || []).map(function (x) { return x.nom; }).join(" "));
        if (q && hay.indexOf(q) < 0) return;
        shown++;
        var share = f.eur / C.total * 100;
        var d = h("div", { class: "item" });
        d.appendChild(h("div", { class: "g" }, f.nom));
        d.appendChild(h("div", { class: "pct" }, pct(share)));
        var bar = h("div", { class: "bar" }); var i = h("i"); i.style.width = Math.min(100, share / 41 * 100) + "%"; bar.appendChild(i); d.appendChild(bar);
        d.appendChild(h("div", { class: "nums" }, nf0.format(f.eur) + " M€ · " + eur(f.eur / C.poblacio) + " per habitant · " + (f.creix >= 0 ? "+" : "") + pct(f.creix) + " des del 2020"));
        if (t > 0) d.appendChild(h("div", { class: "nums strong" }, "Del teu IRPF: " + eur(t * share / 100) + " l'any"));
        d.appendChild(h("p", { class: "nums" }, f.desc));
        if (f.sub) {
          var ul = h("ul", { class: "subs" });
          f.sub.forEach(function (x) { ul.appendChild(h("li", {}, x.nom + ": " + nf0.format(x.eur) + " M€ (" + pct(x.eur / C.total * 100) + " del total, " + (x.creix >= 0 ? "+" : "") + pct(x.creix) + " des del 2020)")); });
          d.appendChild(ul);
        }
        box.appendChild(d);
      });
      $("cofogEmpty").textContent = shown ? "" : "Cap partida coincideix amb la cerca. Prova «pensions», «policia», «hospitals» o «carreteres».";
      $("cofogYou").textContent = t > 0 ? "Amb aquest sou pagues uns " + eur(t) + " d'IRPF l'any. A cada partida veus quina part li correspondria." : "";
    }
    input.addEventListener("input", draw); gross.addEventListener("input", draw); draw();
    $("cofogTotal").textContent = nf0.format(C.total) + " M€";
    $("cofogPer").textContent = eur(C.total / C.poblacio);
    $("cofogPib").textContent = pct(C.pctPib);
    $("cofogGrowth").textContent = "+" + pct((C.total / C.total2020 - 1) * 100);
  }

  // ---------- Cercador d'empreses ----------
  function renderEmpreses() {
    var tb = $("empBody"); if (!tb) return;
    var input = $("empSearch"), sel = $("empSort");
    function rate(e) { return e.bai > 0 && e.imp != null ? e.imp / e.bai * 100 : null; }
    function num(v, suffix) { return v == null ? "—" : nf0.format(v) + (suffix || ""); }
    function draw() {
      var q = norm(input.value.trim());
      var rows = D.empreses.filter(function (e) { return !q || norm(e.nom + " " + e.sector + " " + e.seu).indexOf(q) >= 0; });
      var key = sel.value;
      rows.sort(function (a, b) {
        var va = key === "rate" ? rate(a) : a[key], vb = key === "rate" ? rate(b) : b[key];
        if (va == null) return 1; if (vb == null) return -1;
        return key === "rate" ? va - vb : vb - va;
      });
      tb.innerHTML = "";
      rows.forEach(function (e) {
        var tr = h("tr");
        var td = h("td"); td.appendChild(link(e.nom, e.font)); td.appendChild(h("div", { class: "small" }, e.sector + " · " + e.seu)); tr.appendChild(td);
        tr.appendChild(h("td", { class: "num" }, num(e.net)));
        tr.appendChild(h("td", { class: "num" }, num(e.imp)));
        var r = rate(e);
        var tdr = h("td", { class: "num" }, r == null ? "—" : pct(r)); if (r != null && r < 15) tdr.className = "num low"; tr.appendChild(tdr);
        tr.appendChild(h("td", { class: "num" }, e.isEsp == null ? "—" : num(e.isEsp) + (e.isEspAny ? " (" + e.isEspAny + ")" : "")));
        var tdn = h("td", { class: "small" }, e.pes + (e.nota ? ". " + e.nota : "")); tr.appendChild(tdn);
        tb.appendChild(tr);
      });
      $("empEmpty").textContent = rows.length ? "" : "Cap empresa coincideix amb la cerca.";
    }
    input.addEventListener("input", draw); sel.addEventListener("change", draw); draw();
  }

  renderNav();
  renderSou();
  renderRendes();
  renderCofog();
  renderEmpreses();
})();
