const express = require("express");
const router = express.Router();

const {validateAuth, validateAdmin} = require("../middleware/validations")

const {
  createTag,
  getAllTags,
  addEvent,
  filterByTag,
  clearEventsTag
} = require("../controller/tags");

router.post("/create", validateAuth, validateAdmin, createTag)
router.get("/getByTag", validateAuth, filterByTag)
router.get("/getAll", validateAuth, getAllTags)
router.put("/addEvent/:id", validateAuth, validateAdmin, addEvent)
router.put("/clearTags/:id", validateAuth, validateAdmin, clearEventsTag )

module.exports = router