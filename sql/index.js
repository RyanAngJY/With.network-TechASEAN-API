const sql = {};

sql.query = {
    // get_courses: 'SELECT * FROM Courses',
    getEntities: "SELECT * FROM entities LIMIT ?, ?",
    getEntity: "SELECT * FROM entities WHERE id = ?",
    searchEntities: "SELECT * FROM entities WHERE name LIKE ? LIMIT ?, ?",
};

module.exports = sql;
