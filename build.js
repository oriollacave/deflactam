// Opcional: genera a dist/ una còpia de cada pàgina amb el CSS i el JS incrustats (per compartir un sol fitxer).
// La web publicada no ho necessita. Execució: node build.js
const fs = require("fs");
const path = require("path");
const root = __dirname;
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.readdirSync(root).filter((f) => f.endsWith(".html")).forEach((page) => {
  let html = fs.readFileSync(path.join(root, page), "utf8");
  html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, href) =>
    "<style>\n" + fs.readFileSync(path.join(root, href), "utf8") + "\n</style>");
  html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, src) =>
    "<script>\n" + fs.readFileSync(path.join(root, src), "utf8").replace(/<\/script/gi, "<\\/script") + "\n</script>");
  fs.writeFileSync(path.join(root, "dist", page), html);
  console.log("dist/" + page, (html.length / 1024).toFixed(0) + " KB");
});
