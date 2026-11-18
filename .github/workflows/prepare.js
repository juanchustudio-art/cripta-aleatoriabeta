// Arma la carpeta www/ con el juego y las librerías LOCALES (three.js y PeerJS), para que funcione sin descargarlas de internet.
const fs = require('fs'), path = require('path');
const root = __dirname, www = path.join(root, 'www');
fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(www, { recursive: true });
let html = fs.readFileSync(path.join(root, 'game', 'index.html'), 'utf8');
const three = path.join(root, 'node_modules', 'three', 'build', 'three.min.js');
const peer = path.join(root, 'node_modules', 'peerjs', 'dist', 'peerjs.min.js');
for (const f of [three, peer]) if (!fs.existsSync(f)) { console.error('Falta ' + f + '. Corré primero: npm install'); process.exit(1); }
fs.copyFileSync(three, path.join(www, 'three.min.js'));
fs.copyFileSync(peer, path.join(www, 'peerjs.min.js'));
const a = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
const b = "const PEER_URLS=['https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.5.4/peerjs.min.js'";
if (!html.includes(a) || !html.includes(b)) { console.error('No encontré las referencias a las librerías en game/index.html'); process.exit(1); }
html = html.replace(a, 'three.min.js').replace(b, "const PEER_URLS=['peerjs.min.js','https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.5.4/peerjs.min.js'");
fs.writeFileSync(path.join(www, 'index.html'), html);
console.log('www/ listo (' + (html.length / 1e6).toFixed(2) + ' MB de HTML)');
