let io;

exports.socketConnection = (server) => {
  io = require("socket.io")(server);
  io.on("connection", (socket) => {
    console.info(`Cliente conectado [id=${socket.id}]`);

    socket.on("disconnect", () => {
      console.info(`Client desconectado [id=${socket.id}]`);
    });
  });
};

exports.sendMessage = (key, message) => io.sockets.emit(key, message);
