const sql = require("./db.js");

// constructor

const Financetable = function(financetable) {
    this.description = financetable.description ;
    this.amount = financetable.amount;
    this.method = financetable.method;
    this.frecuency = financetable.frecuency;
};


Financetable.create = (newFinancetable, result) => {
    sql.query("INSERT INTO financetable SET ?", newFinancetable, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tutorial: ", { id: res.insertId, ...newFinancetable });
        result(null, { id: res.insertId, ...newFinancetable });
    });
};

Financetable.findById = (id, result) => {
    sql.query(`SELECT * FROM financetable WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("movimiento: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "no_encontrado" }, null);
    });
};

Financetable.getAll = (description, result) => {
    let query = "SELECT * FROM financetable";
    if (description) {
        query += ` WHERE description LIKE '%${description}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("movimiento: ", res);
        result(null, res);
    });
};

Financetable.getAllPublished = result => {
    sql.query("SELECT * FROM financetable WHERE published=true", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("movimiento: ", res);
        result(null, res);
    });
};

Financetable.updateById = (id, financetable, result) => {
    sql.query(
        "UPDATE financetable SET description = ?, amount = ?, method = ?, frecuency = ? WHERE id = ?",
        [financetable.description, financetable.amount, financetable.method, financetable.frecuency, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("movimiento actualizado: ", { id: id, ...financetable });
            result(null, { id: id, ...financetable });
        }
    );
};

Financetable.remove = (id, result) => {
    sql.query("DELETE FROM financetable WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "no_encontrado" }, null);
            return;
        }

        console.log("movimiento eliminado: ", id);
        result(null, res);
    });
};

Financetable.removeAll = result => {
    sql.query("DELETE FROM financetable", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`eliminado ${res.affectedRows}`);
        result(null, res);
    });
};

module.exports = Financetable;
