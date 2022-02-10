//Requires
const chargepointSchema = require("../models/chargepoint");
const { sendMessage } = require("../utils/socket-io");

// create chargepoint
exports.insert = (req, res) => {
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
};

// get all chargepoints where deleted_at is NULL
exports.getAll = (req, res) => {
  chargepointSchema
    .find({ deleted_at: null })
    .then((data) => {
      res.json({
        message: `Información recibida correctamente!`,
        data: data,
      });
    })
    .catch((error) => res.json({ message: error }));
};

// get a chargepoint
exports.getByID = (req, res) => {
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
};

// update a chargepoint
exports.updateByID = (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  //Validamos que el estado actual no sea igual al estado nuevo
  chargepointSchema
    .find({ id })
    .then((data) => {
      const lastStatus = data[0].status;
      if (lastStatus == status) {
        res.json({
          message: `Error: El Chargepoint ya tiene el estado que intenta insertar`,
        });
      } else {
        chargepointSchema
          .updateOne({ id }, { $set: { name, status } })
          .then((data) => {
            res.json({
              message: `Checkpoint modificado correctamente!`,
              data: data,
            }),
              ws_emiter(id, name, status, lastStatus);
          })
          .catch((error) => res.json({ message: error }));
      }
    })
    .catch((error) => res.json({ message: error }));
};

// delete a chargepoint
exports.logicalDeleteByID = (req, res) => {
  const { id } = req.params;

  //Validamos que el checkpoint no este dado de baja con aterioridad
  chargepointSchema
    .find({ id })
    .then((data) => {
      if (data[0].deleted_at != null) {
        res.json({
          message: `Error: El Chargepoint ya esta dado de baja`,
        });
      } else {
        chargepointSchema
          .updateOne({ id }, { $set: { deleted_at: new Date() } })
          .then((data) =>
            res.json({
              message: `Checkpoint elimnado correctamente!`,
              data: data,
            })
          )
          .catch((error) => res.json({ message: error }));
      }
    })
    .catch((error) => res.json({ message: error }));
};

//Metodo para emitir mensaje websocket
const ws_emiter = async (id, name, status, lastStatus) => {
  const key = "status-updated";
  const message = `[Cambio de estado] Chargepoint ${id}${
    name != undefined ? ` con nombre ${name}` : ""
  }, estado anterior ${lastStatus}, estado actual ${status}`;

  sendMessage(key, message);
};
