//Requires
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const chargepointRoutes = require("./routes/chargepoint");

//Initializations
const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(chargepointRoutes);

// routes
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API ChargePoint." });
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connectado a MongoDB"))
  .catch((error) => console.error(`Error: ${error}`));

// server listening
app.listen(PORT, () => {
  console.log(`Server encendido en el puerto ${PORT}.`);
});
