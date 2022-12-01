const Financetable = require("../models/tutorial.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Tutorial
    const financetable = new Financetable({
        description: req.body.description,
        amount: req.body.amount,
        method: req.body.method,
        frecuency: req.body.frecuency,
    });

    // Save Tutorial in the database
    Financetable.create(financetable, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        else res.send(data);
    });
};

// Retrieve all Tutorials from the database (with condition).

// Retrieve all Tutorials from the database (with condition).

exports.findAll = (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    const description = req.query.description;

    Financetable.getAll(description, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    Financetable.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {

    Financetable.getAllPublished((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving tutorials."
                });
            else res.send(data);
        });
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
// Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Financetable.updateById(
        req.params.id,
        new Financetable(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Tutorial with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Tutorial with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    Financetable.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Tutorial with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Tutorial with id " + req.params.id
                });
            }
        } else res.send({ message: `Tutorial was deleted successfully!` });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Financetable.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        else res.send({ message: `All Tutorials were deleted successfully!` });
    });
};

