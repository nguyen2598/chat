const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

const db = require('./app/config/db');
const route = require('./app/routes');
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
);
db.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
route(app);

app.listen(process.env.PORT || 8000, () => {
    console.log(`Example app listening on port `);
});

// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Cấu hình và xử lý kết nối Socket.io ở đây
// io.on('connection', (socket) => {
//     console.log('A user connected');

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });

//     socket.on('chat message', (msg) => {
//         io.emit('chat message', msg);
//     });
// });

// server.listen(5000, () => {
//     console.log('Server is running on port 3000');
// });
