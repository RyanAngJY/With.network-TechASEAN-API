const express = require("express");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 8001;
const bodyParser = require("body-parser");
const nodeEnv = process.env.NODE_ENV || "development";

console.log("Running in dev mode");
const cors = require("cors");
var whitelist = [
    "http://localhost:3000",
    "http://techasean.io",
    "http://www.techasean.io",
    "http://tech-asean-prod.eba-ysd5mnpy.ap-southeast-1.elasticbeanstalk.com"
];
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
