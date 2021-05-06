const con = require("../db");
const sql_query = require("../sql");

exports.getEntitiesWithRole = (req, res) => {
    console.log("Get entities with specific role");
    const pageNumber = parseInt(req.query.page) || 0;
    const pageSize = 10;
    const startIndex = pageNumber * pageSize;
    const searchTerm = req.query.search;
    const roleId = req.query.roleId;
    const countryOrigin = req.query.countryOrigin;

    selectQuery =
        "SELECT * FROM entity_roles INNER JOIN entities ON entity_id = entities.id";
    selectQuery += roleId ? " WHERE role_id = ?" : "";
    selectQuery += countryOrigin ? " AND country_origin = ?" : "";
    selectQuery += searchTerm ? " AND name LIKE ?" : "";
    selectQuery += startIndex
        ? ` LIMIT ?, ${pageSize}`
        : ` LIMIT 0, ${pageSize}`;

    searchRegex = searchTerm ? `${searchTerm}%` : null;
    selectQueryParams = [roleId, countryOrigin, searchRegex, startIndex].filter(
        Boolean
    );

    countQuery =
        "SELECT COUNT(*) FROM entity_roles INNER JOIN entities ON entity_id = entities.id";
    countQuery += roleId ? " WHERE role_id = ?" : "";
    countQuery += countryOrigin ? " AND country_origin = ?" : "";
    countQuery += searchTerm ? " AND name LIKE ?" : "";
    countQueryParams = [roleId, countryOrigin, searchRegex].filter(Boolean);

    con.query(selectQuery, selectQueryParams, (err, rows1) => {
        if (err) {
            console.log(err);
            res.send(err);
        }
        con.query(countQuery, countQueryParams, (err, rows2) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            const count = rows2[0]["COUNT(*)"];
            data = {
                rows: rows1,
                count,
            };
            res.send(data);
        });
    });
};

exports.getEntitiesWithRoleCount = (req, res) => {
    console.log("Get entity count");
    
    res.header('Access-Control-Allow-Origin', "http://tech-asean-prod.eba-ysd5mnpy.ap-southeast-1.elasticbeanstalk.com");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
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
