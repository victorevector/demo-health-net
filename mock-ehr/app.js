// MOCK MESSAGE
const fs = require('fs');
const msg = fs.readFileSync('./lab.hl7', 'utf-8');

// TCP CONNECTION
const net = require('net');
const tcpClient = require('./client');

const serverPort = process.env.SERVER_PORT;
const serverHost = process.env.SERVER_HOST;
const remotePort = process.env.REMOTE_PORT;
const remoteHost = process.env.REMOTE_HOST;

const server = net.createServer((socket) => {
    // Assumption: client initiate the termination. 
    console.log(`Connected to ${socket.remoteAddress}:${socket.remotePort}.`);
    socket.on('data', (data) => {
        console.log('Received message: ' + data);
    });
    socket.on('end', () => {
        console.log('Client initiated connection termination.');
    });
    socket.on('error', (err) => {
        console.log('Error occured: ' + err + '\r\nTerminating connection...');
    });
    socket.on('close', () => {
        console.log('Connection terminated.');
    });

});
console.log('Starting server...');
server.listen(serverPort, serverHost);
server.on('listening', () => {
    console.log(`Server listening on ${serverHost}:${serverPort}.`);
    // tcp client will send mock HL7 data to message broker (Mirth) on loop.
    setInterval(() => {
        var c = new tcpClient(remotePort, remoteHost);
        c.sendOne(msg);
    }, 10000);
});
