var express = require("express");
var router = express.Router();
var helpers = require("../helpers/entities");

router.route("/").get(helpers.getEntities);

router.route("/:entityId").get(helpers.getEntity);

module.exports = router;
