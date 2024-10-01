const sql = require("../db");
const Accounts = require("./accounts");

/**
 * An account sends another account a certain amount of ramonas
 * 
 * @param {number} sender The discord id of the sender
 * @param {number} receiver The discord id of the receiver
 * @param {number} amount How much the sender wants to transfer
 * @param {string} note The reason of the transaction
 * @returns The newly created transaction
 */
async function createTransaction(sender, receiver, amount, note) {
    if(amount < 0) {
        throw new Error("Can't send negative amounts!");
    }

    let senderAccount = await Accounts.getAccount(sender);
    if(!senderAccount) {
        senderAccount = await Accounts.createAccount(sender);
    }
    let receiverAccount = await Accounts.getAccount(receiver);
    if(!receiverAccount) {
        receiverAccount = await Accounts.createAccount(receiver);
    }

    if((senderAccount.balance - amount) < 0) {
        throw new Error("Sender balance is insufficent!");
    }

    const trx = await sql.transaction();
    try {
        await trx("Accounts").where("discord_id", sender).decrement("balance", amount);
        await trx("Accounts").where("discord_id", receiver).increment("balance", amount);

        var [newTransaction] = await trx("Transactions").insert({
            sender_id:      sender,
            receiver_id:    receiver,
            amount:         amount,
            timestamp:      Date.now(),
            note:           note,
        });

        trx.commit();
    } catch(error) {
        await trx.rollback();
        console.error(error);
        throw error;
    }

    return await sql("Transactions").where("id", newTransaction).first();
}

/**
 * 
 * @param {number} id The id of the transaction
 * @returns Either the details of the transaction or null in the case that the transaction id is not found
 */
async function getTransaction(id) {
    return await sql("Transactions").select().where("id", id).first();
}

/**
 * Sorted by date, the newest being first, get the latest transactions
 * 
 * @param {number} offset How many transactions since the latest should be skipped
 * @param {number} limit How many transactions should be retrieved
 * @returns An array containing the transactions
 */
async function getTransactions(offset = 0, limit = 10) {
    return await sql("Transactions").select().orderBy("timestamp", "desc").offset(offset).limit(limit);
}

module.exports = { createTransaction, getTransaction, getTransactions };