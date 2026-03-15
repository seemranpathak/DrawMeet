import express from 'express';
import connect from './db/connect.js';
import { Server } from 'socket.io';
import http from 'http'
import cors from 'cors';
import router from './routes/auth.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
  res.json({ port });
});

app.use('/api/auth', router);
connect();


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your React app's origin
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 8000;
console.log(`✅ Server will run on port ${port}`);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle drawing events
  socket.on('drawing', (data) => {
    socket.broadcast.emit('drawing', data); // Broadcast to others
    // Save to database here
  });

  // Handle cursor movements
  socket.on('cursorMove', (data) => {
    socket.broadcast.emit('cursorMove', data); // Broadcast to others
  });

  // Handle object creation/modification (shapes)
  socket.on('objectModified', (data) => {
    socket.broadcast.emit('objectModified', data);
    // Save to database here
  });

  // Handle clear canvas
  socket.on('clearCanvas', () => {
    socket.broadcast.emit('clearCanvas');
    // Clear from database here
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(port, (req, res) => {
  console.log(`Socket.IO server listening on port ${port}`);
});


