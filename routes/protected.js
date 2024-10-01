const express = require("express");
const router = express.Router();
const Transactions = require("../controller/transactions");

const Authorization = require("../middleware/authorization");
const { transaction } = require("../db");

router.use(Authorization.API_Auth);

router.post("/transfer", async (req, res) => {
    const { sender, receiver, amount, note } = req.body;

    try {
        var transaction = await Transactions.createTransaction(sender, receiver, amount, note);
    } catch(error) {
        console.log(error);
        return res.status(500).json({"error": error.message});
    }

    console.log(transaction);
    res.status(200).json(transaction);
});

module.exports = router;