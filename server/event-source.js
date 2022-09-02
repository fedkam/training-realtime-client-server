const cors = require('cors');
const express = require('express');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const server = express()
const PORT = 3002;

server.use(cors());
server.use(express.json());

server.get('/connect', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
    });
    eventEmitter.on('newMessage', (newMessage) => {
        res.write(`data: ${JSON.stringify(newMessage)} \n\n`);
    });
})

server.post('/send-message', (req, res) => {
    console.log('start send', req.body)
    const message = req.body;
    eventEmitter.emit('newMessage', message);
    res.status(200);
})

server.listen(PORT, () => console.log(`server started PORT:${PORT}`))