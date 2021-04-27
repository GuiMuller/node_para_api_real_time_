import express from 'express';
import socketio from 'socket.io';
import path from 'path';
import http from 'http';

const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer);

app.use(express.static(path.resolve(__dirname, '..', 'public')));

io.on('connection', (socket) => {
    console.log(`New Connection: ${socket.id}`);

    socket.on('message', message => {
        socket.emit('received', `received message ${message}`);
    })
});

httpServer.listen(3333);