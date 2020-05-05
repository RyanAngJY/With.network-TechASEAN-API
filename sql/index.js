const sql = {};

sql.query = {
    // Only search entities that are startups or founders
    getEntities:
        "SELECT * FROM entity_roles INNER JOIN entities ON entity_id = entities.id WHERE role_id = 59 OR role_id = 72 LIMIT ?, ?",
    searchEntities:
        "SELECT * FROM entity_roles INNER JOIN entities ON entity_id = entities.id WHERE (role_id = 59 OR role_id = 72) AND name LIKE ? LIMIT ?, ?",
    getEntitiesWithRole:
        "SELECT * FROM entity_roles INNER JOIN entities ON entity_id = entities.id WHERE role_id = ? LIMIT ?, ?",
    getEntitiesWithRoleCount:
        "SELECT COUNT(*) FROM entity_roles INNER JOIN entities ON entity_id = entities.id WHERE role_id = ?",
    searchEntitiesWithRole:
        "SELECT * FROM entity_roles INNER JOIN entities ON entity_id = entities.id WHERE role_id = ? AND name LIKE ? LIMIT ?, ?",
    searchEntitiesWithRoleCount:
        "SELECT COUNT(*) FROM entity_roles INNER JOIN entities ON entity_id = entities.id WHERE role_id = ? AND name LIKE ?",
    getEntity: "SELECT * FROM entities WHERE id = ?",
};

module.exports = sql;
