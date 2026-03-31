const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Evitar bloqueos identificando apropiadamente cada tipo de archivo web
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Si la ruta es la raíz '/', servir index2.html
    let filePath = req.url === '/' ? './index2.html' : '.' + req.url;
    
    // Limpiar Query strings (evita bloqueos en recursos con variables)
    filePath = filePath.split('?')[0];
    
    const extname = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Archivo No Encontrado</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Error de Servidor: ' + error.code + ' ..\n');
            }
        } else {
            // Entrega correcta resolviendo las restricciones de CORS
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n==============================================`);
    console.log(`✅ ¡Servidor Web Local Inicializado con Éxito!`);
    console.log(`👉 Entorno: CSS, JS y Protocolos Fetch (CORS) Operativos`);
    console.log(`==============================================\n`);
    console.log(`Abre tu navegador (Chrome/Edge/Firefox) y entra a esta dirección:`);
    console.log(`\x1b[36mhttp://localhost:${PORT}\x1b[0m\n`);
    console.log(`* Presiona Ctrl + C en esta consola para detener el servidor.\n`);
});
