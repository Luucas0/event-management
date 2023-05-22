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
    getUserEvents,
    getUserUnactiveEvents,
    getUserActiveEvents,

} = require("../controller/events");
const { validateAuth, validateAdmin } = require("../middleware/validations");

//Función para mostrar TODOS los eventos.
router.get("/getAll", validateAuth, getEvents)
//Función para filtrar eventos de un mes específico.
router.get("/monthlyEvents", getMonthlyEvents)
//Función para filtrar eventos en un día específico.
router.get("/dailyEvents", getDailyEvents)
//Función para buscar eventos por ID.
router.get("/getEventById/:id", validateAuth, getEventsById)
//Función para traer eventos públicos.
router.get("/publicEvents", validateAuth, getPublicEvents)
//Función para traer eventos privados.
router.get("/privateEvents", validateAuth, validateAdmin, getPrivateEvents)
//Función para traer los eventos vinculados a un usuario.
router.get("/myevents", validateAuth, getUserEvents)
//Función para búsqueda de eventos.
router.get("/search/:search", searchEvent)
//Función para traer los eventos INACTIVOS (Dados de baja, finalizados o cancelados) de un usuario logeado.
router.get("/userUnactiveEvents", validateAuth, getUserUnactiveEvents)
//Función para traer los eventos ACTIVOS de un usuario logeado.
router.get("/userActiveEvents", validateAuth, getUserActiveEvents)

//Crear eventos
router.post("/createEvent", validateAuth, validateAdmin, createEvent)

//Dar de baja un evento
router.put("/unsubscribeEvent", validateAuth, unsubscribeEvent)
//Mostrar eventos públicos
router.put("/eventPublic", validateAuth, validateAdmin, setPublicEvent)
//Actualizar información de un evento.
router.put("/updateEvent/:id", validateAuth, validateAdmin, updateEvent)
//Función para que un usuario pueda asistir a un evento.
router.put("/assistEvent/:id", validateAuth, assistEvent)

router.delete("/deleteAll", validateAuth, validateAdmin, deleteAll)
module.exports = router;