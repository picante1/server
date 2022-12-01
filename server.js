const express = require("express");
const app = express();
const bodyParser = require('body-parser');

require("./app/routes/tutorial.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.use(bodyParser.json());


// aca le decimos que vamos a usar una app express
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Hola, esta es la pagina de inicio" });
});



// set port, listen for requests

