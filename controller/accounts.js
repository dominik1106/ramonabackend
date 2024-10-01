const sql = require("../db");

async function createAccount(id) {
    await sql.insert({ discord_id: id }).into("Accounts");
    return await sql.select().from("Accounts").where("discord_id", id).first();
}

async function getAccount(id) {
    let account = await sql.select().from("Accounts").where("discord_id", id).first();
    return account;
}

module.exports = { createAccount, getAccount };