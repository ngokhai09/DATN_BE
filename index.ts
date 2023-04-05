// index.ts
import express from 'express';
import bodyParser from 'body-parser';
import {AppDataSource} from './src/data-source';
import cors from 'cors';
import router from './src/routes/router';
import http from 'http';
import {Server} from 'socket.io';
import {Message} from "./src/models/Message";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
});
const message = AppDataSource.getRepository(Message)
AppDataSource.initialize().then(() => {
    console.log('Connect database success');
});

app.set("io", io);
app.set("socket", {});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('', router);
socketIo.on("connection", (socket) => {
    console.log("New client connected"  + socket.id);

    socket.on("sendDataClient", async function (data) {
        const newMessage = new Message();
        newMessage.content = data.content;
        newMessage.sender = data.id;
        newMessage.receiver = data.idReceiver;
        await message.save(newMessage)
        let sql = `select content, time, senderIdAccount
                   from message
                   where (senderIdAccount = '${data.id}' and receiverIdAccount = '${data.idReceiver}')
                      or (senderIdAccount = '${data.idReceiver}' and receiverIdAccount = '${data.id} ')
                   order by (time) ASC`
        let content = await message.query(sql)
        await socketIo.emit("sendDataServer", {content});
    });
    socket.on('new message', (data: any) => {
        console.log(`Received message: ${data}`);
        io.emit('new message', { message: 'New message received' });
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(4000, () => {
    console.log('Server đang chay tren cong 4000');
});

