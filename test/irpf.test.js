// Execució: node test/irpf.test.js
const assert = require("assert");
const IRPF = require("../js/irpf.js");

function close(a, b, tol, msg) {
  assert.ok(Math.abs(a - b) <= tol, `${msg}: ${a.toFixed(2)} vs ${b.toFixed(2)}`);
}

// 1. Escales: exemple de taxdown.es amb base liquidable 27.926,40 €
const base = 27926.4;
close(IRPF.scaleTax(base, IRPF.STATE_SCALE) - IRPF.scaleTax(5550, IRPF.STATE_SCALE), 2744.46, 0.01, "Quota estatal");
close(IRPF.scaleTax(base, IRPF.CAT_SCALE_2025) - IRPF.scaleTax(5550, IRPF.CAT_SCALE_2025), 2795.97, 0.01, "Quota catalana");

// 2. Sou mínim exempt: ~16.000 € no ha de pagar IRPF
assert.strictEqual(IRPF.compute(15876).irpf, 0, "SMI 2025 sense IRPF");

// 3. Factor IPC 2015→2025 raonable (~26-28%)
const f = IRPF.cpiFactor(2015, 2025);
assert.ok(f > 1.25 && f < 1.29, "Factor IPC " + f);

// 4. Situació deflactada mai paga més que la real
for (let g = 10000; g <= 150000; g += 5000) {
  const c = IRPF.compare(g, 2015);
  assert.ok(c.extra >= 0, "Extra negatiu a " + g);
}

// 5. Monotonia: més sou, més IRPF
let prev = -1;
for (let g = 0; g <= 200000; g += 1000) {
  const t = IRPF.compute(g).irpf;
  assert.ok(t >= prev - 1e-9, "No monòton a " + g);
  prev = t;
}

// 6. Escala de l'estalvi
close(IRPF.savingsTax(6000), 1140, 0.01, "Estalvi 6.000");
close(IRPF.savingsTax(10000), 1140 + 840, 0.01, "Estalvi 10.000");

// 7. Les cadenes sumen el total
[20000, 50000, 200000].forEach((X) => {
  [IRPF.laborChain(X), IRPF.dividendChain(X, 0.0887), IRPF.holdingChain(X, 0.0887)].forEach((r) => {
    close(r.corporate + r.irpf + r.contributions + r.net, X, 0.01, "Cadena no quadra a " + X);
  });
});

console.log("OK. Factor IPC 2015-2025:", f.toFixed(4));
[50000, 100000].forEach((X) => {
  const p = (r) => ((r.corporate + r.irpf) / X * 100).toFixed(1) + "% imp + " + (r.contributions / X * 100).toFixed(1) + "% cot";
  console.log("Cadena", X, "| treball", p(IRPF.laborChain(X)), "| dividend gran", p(IRPF.dividendChain(X, 0.0887)),
    "| dividend 25%", p(IRPF.dividendChain(X, 0.25)), "| holding", p(IRPF.holdingChain(X, 0.0887)));
});
[20000, 25000, 30000, 40000, 60000, 100000].forEach((g) => {
  const c = IRPF.compare(g, 2015);
  console.log(g, "IRPF", c.real.irpf.toFixed(0), "deflactat", c.indexed.irpf.toFixed(0), "extra", c.extra.toFixed(0),
    "tipus", (c.real.effective * 100).toFixed(1) + "%");
});
