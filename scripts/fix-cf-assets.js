// Cloudflare Pages ignore les dossiers nommes "node_modules" lors du deploiement.
// Expo exporte les polices/icones dans dist/assets/node_modules/...
// Ce script renomme le dossier en "vendor" et met a jour les references.
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'dist');
const oldDir = path.join(dist, 'assets', 'node_modules');
const newDir = path.join(dist, 'assets', 'vendor');

if (fs.existsSync(oldDir)) {
  fs.renameSync(oldDir, newDir);
  console.log('Renomme: assets/node_modules -> assets/vendor');
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const exts = new Set(['.js', '.html', '.json', '.css', '.map']);
let patched = 0;
for (const file of walk(dist)) {
  if (!exts.has(path.extname(file))) continue;
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('assets/node_modules')) {
    fs.writeFileSync(file, content.replaceAll('assets/node_modules', 'assets/vendor'));
    patched++;
  }
}
console.log(`References corrigees dans ${patched} fichier(s).`);
