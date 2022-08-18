const express = require("express");
const controller = require("./clients.controller");
const router = express.Router();

router.get("/", [controller.getClients]);
router.post("/", [controller.addClients]);
router.put("/", [controller.updateClients]);
router.delete("/", [controller.deleteClients]);

module.exports = router;
