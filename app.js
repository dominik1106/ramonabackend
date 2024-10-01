const express = require('express');
const app = express();
const port = 3000;

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const publicRoutes = require("./routes/public");
const protectedRoutes = require("./routes/protected");

app.use("/pub", publicRoutes);
app.use("/prv", protectedRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});