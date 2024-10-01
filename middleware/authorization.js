const express = require("express");

const API_Auth = (req, res, next) => {
    const api_key = req.headers["x-api-key"];
    if(api_key !== process.env.BOT_KEY) {
        res.status(403).send("Unauthorized!");
    }

    next();
};

module.exports = { API_Auth };