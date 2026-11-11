// Genera dist/deflactam.html: una sola pàgina amb CSS i JS incrustats (per compartir o publicar).
// Execució: node build.js
const fs = require("fs");
const path = require("path");
const root = __dirname;
let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, href) =>
  "<style>\n" + fs.readFileSync(path.join(root, href), "utf8") + "\n</style>");
html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, src) =>
  "<script>\n" + fs.readFileSync(path.join(root, src), "utf8").replace(/<\/script/gi, "<\\/script") + "\n</script>");
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.writeFileSync(path.join(root, "dist", "deflactam.html"), html);
console.log("dist/deflactam.html", (html.length / 1024).toFixed(0) + " KB");
