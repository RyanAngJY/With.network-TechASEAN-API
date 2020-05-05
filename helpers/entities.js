const con = require("../db");
const sql_query = require("../sql");

// UNUSED
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

exports.getEntitiesWithRole = (req, res) => {
    console.log("Get entities with specific role");
    const pageNumber = parseInt(req.query.page) || 0;
    const pageSize = 10;
    const startIndex = pageNumber * pageSize;
    const searchTerm = req.query.search;
    const roleId = req.query.roleId;
    console.log(req.query);

    if (searchTerm) {
        const searchRegex = `%${searchTerm}%`;
        con.query(
            sql_query.query.searchEntitiesWithRole,
            [roleId, searchRegex, startIndex, pageSize],
            (err, rows1) => {
                if (err) {
                    res.send(err);
                }
                con.query(
                    sql_query.query.searchEntitiesWithRoleCount,
                    [roleId, searchRegex],
                    (err, rows2) => {
                        if (err) {
                            res.send(err);
                        }
                        const count = rows2[0]["COUNT(*)"];
                        data = {
                            rows: rows1,
                            count,
                        };
                        // res.send(rows);
                        res.send(data);
                    }
                );
                // res.send(rows);
            }
        );
    } else {
        con.query(
            sql_query.query.getEntitiesWithRole,
            [roleId, startIndex, pageSize],
            (err, rows1) => {
                if (err) {
                    res.send(err);
                }
                con.query(
                    sql_query.query.getEntitiesWithRoleCount,
                    [roleId],
                    (err, rows2) => {
                        if (err) {
                            res.send(err);
                        }
                        const count = rows2[0]["COUNT(*)"];
                        data = {
                            rows: rows1,
                            count,
                        };
                        // res.send(rows);
                        res.send(data);
                    }
                );
                // res.send(rows);
            }
        );
    }
};

exports.getEntitiesWithRoleCount = (req, res) => {
    console.log("Get entity count");
    const roleId = req.query.roleId;

    con.query(
        sql_query.query.getEntitiesWithRoleCount,
        [roleId],
        (err, rows) => {
            if (err) {
                res.send(err);
            }
            const count = rows[0]["COUNT(*)"];
            res.send({ count });
        }
    );
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
