const sql = require("knex")({
    client: "better-sqlite3",
    connection: {
        filename: "./db/data.sqlite3",
    },
    useNullAsDefault: true,
});

module.exports = sql;