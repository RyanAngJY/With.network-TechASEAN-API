const sql = {};

sql.query = {
    // Only search entities that are startups or founders
    getEntities:
        "SELECT * FROM entity_roles INNER JOIN entities ON entity_id = entities.id WHERE (role_id = 59 OR role_id = 72) LIMIT ?, ?",
    getEntitiesWithRoleCount:
        "SELECT COUNT(*) FROM entity_roles INNER JOIN entities ON entity_id = entities.id WHERE role_id = ?",
    getEntity: "SELECT * FROM entities WHERE id = ?",
};

module.exports = sql;
