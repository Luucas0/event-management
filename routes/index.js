const express = require("express");
const router = express.Router();
const User = require("./users");
const Events = require("./events");

router.use("/users", User);
router.use("/events", Events);

module.exports = router;