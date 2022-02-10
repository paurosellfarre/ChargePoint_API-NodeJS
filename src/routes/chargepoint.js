//Requires
const express = require("express");
const chargepointSchema = require("../models/chargepoint");
const {
  getAll,
  insert,
  getByID,
  updateByID,
  logicalDeleteByID,
} = require("../utils/chargepoint");

//Initializations
const router = express.Router();

router.post("/chargepoint", (req, res) => {
  insert(req, res);
});

router.get("/chargepoint", (req, res) => {
  getAll(req, res);
});

router.get("/chargepoint/:id", (req, res) => {
  getByID(req, res);
});

router.put("/chargepoint/:id", (req, res) => {
  updateByID(req, res);
});

router.delete("/chargepoint/:id", (req, res) => {
  logicalDeleteByID(req, res);
});

module.exports = router;
