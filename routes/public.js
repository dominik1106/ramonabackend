const express = require("express");
const router = express.Router();
const Transactions = require("../controller/transactions");
const Accounts = require("../controller/accounts");

router.get("/transaction/:id", async (req, res) => {
    const id = req.params.id;

    try {
        var transaction = await Transactions.getTransaction(id);
    } catch(error) {
        console.log(error);
        return res.status(500).json({"error": error.message});
    }
    res.status(200).json(transaction);
});

router.get("/transactions", async (req, res) => {
    const { offset, limit } = req.params;
    let 

    try {
        var transactions = await Transactions.getTransactions(offset, limit);
    } catch(error) {
        console.log(error);
        return res.status(500).json({"error": error.message});
    }
    res.status(200).json(transactions);
});

router.get("/account/:id", async (req, res) => {
    const id = Number(req.params.id).toString();

    console.log("Getting Account: " + id + " " + typeof id);
    
    try {
        var account = await Accounts.getAccount(id);
        if(typeof account === "undefined") {
            account = await Accounts.createAccount(id);
        }
    } catch(error) {
        console.log(error);
        return res.status(500).json({"error": error.message});
    }
    res.status(200).json(account);
});

module.exports = router;