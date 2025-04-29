const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado');

  socket.on('datos-ruido', (data) => {
    console.log(`🔊 Hinchada A: ${data.hinchadaA.toFixed(1)} | Hinchada B: ${data.hinchadaB.toFixed(1)} | Δ: ${data.diferencia.toFixed(1)} | A%: ${data.porcentaje.toFixed(1)}%`);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado');
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
