//Requires
const express = require("express");
const chargepointSchema = require("../models/chargepoint");

//Initializations
const router = express.Router();

// create chargepoint
router.post("/chargepoint", (req, res) => {
  const chargepoint = chargepointSchema(req.body);
  chargepoint
    .save()
    .then((data) =>
      res.json({
        message: `Chargepoint creado correctamente!`,
        data: data,
      })
    )
    .catch((error) => res.json({ message: error }));
});

// get all chargepoints where deleted_at is NULL
router.get("/chargepoint", (req, res) => {
  chargepointSchema
    .find({ deleted_at: null })
    .then((data) =>
      res.json({
        message: `Información recibida correctamente!`,
        data: data,
      })
    )
    .catch((error) => res.json({ message: error }));
});

// get a chargepoint
router.get("/chargepoint/:id", (req, res) => {
  const { id } = req.params;
  chargepointSchema
    .find({ id })
    .then((data) =>
      res.json({
        message: `Información recibida correctamente!`,
        data: data,
      })
    )
    .catch((error) => res.json({ message: error }));
});

// update a chargepoint
router.put("/chargepoint/:id", (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;
  chargepointSchema
    .updateOne({ id }, { $set: { name, status } })
    .then((data) =>
      res.json({
        message: `Checkpoint modificado correctamente!`,
        data: data,
      })
    )
    .catch((error) => res.json({ message: error }));
});

// delete a chargepoint
router.delete("/chargepoint/:id", (req, res) => {
  const { id } = req.params;
  chargepointSchema
    .updateOne({ id }, { $set: { deleted_at: new Date() } })
    .then((data) =>
      res.json({
        message: `Checkpoint elimnado correctamente!`,
        data: data,
      })
    )
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
