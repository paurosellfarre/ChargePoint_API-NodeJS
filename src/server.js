//Requires
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const chargepointRoutes = require("./routes/chargepoint");
const { socketConnection } = require("./utils/socket-io");

//Initializations
const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(chargepointRoutes);

//Initializations after app
const server = http.createServer(app);
const io = new Server(server);

// routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connectado a MongoDB"))
  .catch((error) => console.error(`Error: ${error}`));

socketConnection(server);

// server listening
server.listen(PORT, () => {
  console.log(`Server encendido en el puerto ${PORT}.`);
});
