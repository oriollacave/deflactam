# Com col·laborar

Gràcies per voler millorar Deflacta'm. És una web estàtica sense dependències: HTML, CSS i JavaScript.

## Has trobat una dada incorrecta?

Obre una [incidència](https://github.com/oriollacave/deflactam/issues/new/choose) amb:

1. La pàgina i la xifra que creus que és incorrecta.
2. La xifra correcta.
3. L'enllaç a la font original (INE, AEAT, IGAE, Banc d'Espanya, comptes anuals de l'empresa...).

## Vols proposar un canvi?

1. Fes un *fork* del repositori i crea una branca.
2. Fes el canvi. Les dades són a `js/data.js` i `js/data2.js`; el càlcul de l'IRPF, a `js/irpf.js`.
3. Comprova que els tests passen: `node test/irpf.test.js`.
4. Obre la web en local (`python3 -m http.server 8000`) i mira que la pàgina es veu bé.
5. Obre una *pull request* explicant què canvia i per què.

## Regles de la casa

- **Cap xifra sense font.** Cada dada nova ha de portar l'enllaç a una font primària o, si no n'hi ha, a un mitjà fiable que la citi.
- **Si no hi ha dada, es diu.** Millor un guió que una estimació sense base.
- **Explica els matisos.** Si una comparació té trampa (denominadors diferents, dades de tot el món contra dades d'Espanya), s'ha de dir a la mateixa pàgina.
- **Apuntem a regles, no a col·lectius.** La web denuncia normes i decisions, no grups de persones.
- **Català clar.** Frases curtes, sense argot.

## Idees pendents

- Conclusions de l'AIReF sobre l'eficàcia de cada partida de despesa.
- Evolució dels preus per partida (IPC per grups) des del 2019.
- Impost de societats pagat a Espanya per les empreses que encara no el tenim.
- Altres comunitats autònomes a la calculadora de l'IRPF.
- Grans tenidors per municipi a Catalunya.
