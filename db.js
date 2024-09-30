const sql = require("knex")({
    client: "better-sqlite3",
    connection: {
        filename: process.env.SQLITE_DB,
    },
    useNullAsDefault: true,
});

module.exports = sql;