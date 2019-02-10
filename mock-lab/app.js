// Payload
const msgJ = require('./diagnosticReport.json');
const msg = JSON.stringify(msgJ);

// Server and Client
const http = require('http');

const hostname = process.env.HOST;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
    const { headers, method, url } = req;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Ok!\n');

    //SIMULATE SERVERSIDE PROCESSES
    // Create resource instance based on request
    console.log(
        `Received request: ${method} ${url}
        Validating...
        Creating new resource instance...
        /ServiceRequest/003038-002`);
    // Lab order gets processed
    setTimeout(() => {
        // Configure http client
        const options = {
            hostname: process.env.REMOTE_HOST,
            port: process.env.REMOTE_PORT,
            path: '/order/observations/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(msg)
            }
        };
        const req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                console.log('No more data in response.');
            });
        });

        req.write(msg);
        req.end(() => {
            console.log('Message Sent');
        });
    }, 5000);

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
