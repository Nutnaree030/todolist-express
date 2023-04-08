const Todolist = require("../models/todolist.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Todolist
  const todolist = new Todolist({
    title: req.body.title,
    body: req.body.body,
    completed: req.body.completed || false
  });

  // Save Todolist in the database
  Todolist.create(todolist, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Todolist."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
    const title = req.query.title;

    Todolist.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving todolists."
        });
      else res.send(data);
    });
  };
  
exports.findAllCompleted = (req, res) => {
    Todolist.getAllCompleted((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving todolists."
        });
      else res.send(data);
    });
};

exports.findOne = (req, res) => {
    Todolist.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Todolist with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Todolist with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

exports.findAllCompleted = (req, res) => {
    Todolist.getAllCompleted((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving todolists."
          });
        else res.send(data);
      });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Todolist.updateById(
    req.params.id,
    new Todolist(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Todolist with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Todolist with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
    Todolist.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Todolist with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Todolist with id " + req.params.id
            });
          }
        } else res.send({ message: `Todolist was deleted successfully!` });
      });
};
