var express = require("express");
var router = express.Router();
const cors = require("cors");
router.use(cors())
var helpers = require("../helpers/entities");

router.route("/").get(helpers.getEntitiesWithRole);
router.route("/count").get(helpers.getEntitiesWithRoleCount);
router.route("/:entityId").get(helpers.getEntity);

module.exports = router;
