const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const port = process.env.PORT || 8000;
const bodyParser = require("body-parser");

var whitelist = ["http://localhost:3000"];
const corsOptions = {
    origin: whitelist,
    methods: ["GET"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
};
app.use(cors(corsOptions));

var entityRoutes = require("./routes/entities");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.send("Test route");
});

app.use("/api/entities", entityRoutes);

app.listen(port, function () {
    console.log("APP IS RUNNING ON PORT " + port);
});
