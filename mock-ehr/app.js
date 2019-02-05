// MOCK MESSAGE
const msg = "MSH|^~\&|EPIC|EPICADT|SMS|SMSADT|199912271408|CHARRIS|ADT^A04|1817457|D|2.5<cr>PID||0493575^^^2^ID 1|454721||DOE^JOHN^^^^|DOE^JOHN^^^^|19480203|M||B|254 MYSTREET AVE^^MYTOWN^OH^44123^USA||(216)123-4567|||M|NON|400003403~1129086<cr>NK1||ROE^MARIE^^^^|SPO||(216)123-4567||EC||||||||||||||||||||||||||<cr>PV1||O|168 ~219~C~PMA^^^^^^^^^||||277^ALLEN MYLASTNAME^BONNIE^^^^|||||||||| ||2688684|||||||||||||||||||||||||199912271408||||||002376853<cr>"


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
    }, 3000);
});
