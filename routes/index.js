const express = require("express");
const router = express.Router();
const User = require("./users");
const Events = require("./events");
const Tags = require("./tags")

router.use("/users", User);
router.use("/events", Events);
router.use("/tags", Tags)

module.exports = router;