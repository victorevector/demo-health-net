var net = require('net');

class TcpClient {
    constructor(port, host) {
        this.port = port;
        this.host = host;
    }

    sendOne(msg) {
        // Assumption: send one message per connection.
        // sends `msg` once
        console.log(`Connecting to ${this.host}:${this.port}...`);
        const socket = net.createConnection(
            { port: this.port, host: this.host },
            () => {
                console.log('Connected to server.');
                console.log('Sending message');
                socket.write(msg);
                console.log('Message sent.');
                console.log('Initiating connection termination...');
                socket.end();
            });
        socket.on('data', (data) => {
            console.log('Received response: ' + data);
        });
        socket.on('error', (err) => {
            console.log('Error occured: ' + err + '\r\nTerminating connection...');
        });
        socket.on('end', () => {
            console.log('Server initiated connection termination.');
        });
        socket.on('close', () => {
            console.log('Connection terminated.');
        });
    }
}

module.exports = TcpClient