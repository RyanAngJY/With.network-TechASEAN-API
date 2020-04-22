const con = require("../db");
const sql_query = require("../sql");

exports.getEntities = (req, res) => {
    console.log("Get entities");
    const pageNumber = parseInt(req.query.page) || 0;
    const pageSize = 10;
    const startIndex = pageNumber * pageSize;
    const searchTerm = req.query.search;

    if (searchTerm) {
        const searchRegex = `%${searchTerm}%`;
        con.query(
            sql_query.query.searchEntities,
            [searchRegex, startIndex, pageSize],
            (err, rows) => {
                if (err) {
                    res.send(err);
                }
                res.send(rows);
            }
        );
    } else {
        con.query(
            sql_query.query.getEntities,
            [startIndex, pageSize],
            (err, rows) => {
                if (err) {
                    res.send(err);
                }
                res.send(rows);
            }
        );
    }
};

exports.getEntity = (req, res) => {
    console.log("Get entity");
    const entityId = parseInt(req.params.entityId);
    con.query(sql_query.query.getEntity, [entityId], (err, rows) => {
        if (err) {
            res.send(err);
        }
        res.send(rows);
    });
};

module.exports = exports;
