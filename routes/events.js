const express = require("express");
const router = express.Router();

const {
    createEvent,
    getEvents,
    getMonthlyEvents,
    getDailyEvents,
    setPublicEvent,
    unsubscribeEvent,
    updateEvent,
    assistEvent,
    searchEvent,
    getEventsById,
    deleteAll,
    getPublicEvents,
    getPrivateEvents,
    getUserEvents

} = require("../controller/events");
const { validateAuth, validateAdmin } = require("../middleware/validations");


router.get("/events", validateAuth, getEvents)
router.get("/monthlyEvents", getMonthlyEvents)
router.get("/dailyEvents", getDailyEvents)
router.get("/getEventById/:id", validateAuth, getEventsById)
router.get("/publicEvents", validateAuth, getPublicEvents)
router.get("/privateEvents", validateAuth, validateAdmin, getPrivateEvents)
router.get("/myevents", validateAuth, getUserEvents)
router.get("/search/:search", searchEvent)

router.post("/createEvent", validateAuth, validateAdmin, createEvent)

router.put("/unsubscribeEvent", validateAuth, unsubscribeEvent)
router.put("/eventPublic", validateAuth, validateAdmin, setPublicEvent)
router.put("/updateEvent", validateAuth, validateAdmin, updateEvent)
router.put("/assistEvent/:id", validateAuth, assistEvent)

router.delete("/deleteAll", validateAuth, validateAdmin, deleteAll)
module.exports = router;