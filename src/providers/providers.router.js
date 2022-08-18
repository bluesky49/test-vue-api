const express = require("express");
const controller = require("./providers.controller");
const router = express.Router();

router.get("/", [controller.getProviders]);
router.post("/", [controller.addProvider]);
router.put("/", [controller.updateProvider]);
router.delete("/", [controller.deleteProvider]);

module.exports = router;
