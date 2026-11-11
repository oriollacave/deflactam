# Deflacta'm

Web estàtica de conscienciació amb tres blocs:

1. **Calculadora d'IRPF no deflactat.** Quant pagues de més perquè els trams estatals, el mínim personal i les despeses deduïbles no s'actualitzen amb l'IPC des del 2015.
2. **Qui paga què.** Tipus efectiu de l'Impost de Societats per mida d'empresa (AEAT 2023), comparat amb l'IRPF efectiu d'un assalariat.
3. **Habitatge.** Qui són els grans tenidors de pisos de lloguer (Civio) i una estimació del que ingressen.

Més una secció d'acció amb carta als diputats generada amb la xifra personal (es copia; no s'envia res automàticament).

## Executar

No cal compilar. Obre `index.html` al navegador, o serveix la carpeta:

```bash
python3 -m http.server 8000
```

Tests del càlcul:

```bash
node test/irpf.test.js
```

## Estructura

```
index.html        pàgina
css/styles.css    estils (mode clar/fosc)
js/irpf.js        motor de càlcul IRPF (navegador i Node)
js/data.js        totes les dades amb font i URL
js/app.js         interfície i gràfics SVG
test/             tests del càlcul
```

## Metodologia i límits

- Assalariat resident a Catalunya, declaració individual, sense fills ni altres rendes. Exercici 2025.
- Cotització del treballador 6,48% amb base màxima 2025; 2.000 € de despeses; reducció per treball art. 20 LIRPF (versió 2024); mínim personal 5.550 €.
- Escala estatal art. 63 LIRPF; escala catalana art. 611-1 CTC (DL 5/2025). Validat amb l'exemple de taxdown.es (base 27.926,40 €).
- Escenari deflactat: multiplica per l'IPC acumulat (INE, mitjana anual; 2025 provisional 2,7%) els trams estatals, el mínim personal i els 2.000 €. No deflacta l'escala catalana ni la reducció per treball, perquè ja s'han reformat recentment: el resultat és **conservador**.
- No inclou deduccions autonòmiques ni la deducció per a perceptors del SMI. És orientatiu, no una declaració.
- Tipus de Societats: sobre el resultat comptable, no sobre la base imposable. Part de la diferència és legítima (compensació de pèrdues, doble imposició internacional). La web ho diu explícitament.
- Habitatge: dades de fiances de 11 CCAA (Civio, 2024). S'ha descartat el rànquing d'euribor.com.es (2026) perquè les seves xifres són internament incoherents.

## Per actualitzar les dades

Tot és a `js/data.js` i a les constants de `js/irpf.js` (escales, IPC). Afegir un any nou d'IPC: `CPI[2026] = x`.

## Idees següents

- Afegir la resta de comunitats autònomes.
- Opció de fills i tributació conjunta.
- Gràfic de recaptació IRPF vs salaris reals per anys.
- Mapa de grans tenidors per municipi a Catalunya (dades de l'Incasòl / registre de grans tenidors).
- Directori de diputats per circumscripció amb enllaç `mailto:` (l'usuari envia des del seu correu).
