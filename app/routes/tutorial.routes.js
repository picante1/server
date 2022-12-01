module.exports = app => {
    const financetables = require("../controllers/tutorial.controller.js");

    const router = require("express").Router();

    // Create a new Tutorial
    router.post("/", financetables.create);

    // Retrieve all Tutorials
    router.get("/", financetables.findAll);

    // Retrieve all published Tutorials
    router.get("/published", financetables.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", financetables.findOne);

    // Update a Tutorial with id
    router.put("/:id", financetables.update);

    // Delete a Tutorial with id
    router.delete("/:id", financetables.delete);

    // Delete all Tutorials
    router.delete("/", financetables.deleteAll);

    app.use('/api/tutorials', router);
};
