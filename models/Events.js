const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Object,
    },
    organizer: {
        type: String,
        default: null
    },
    location: {
        type: String,
        required: true,
    },
    status: {
      type: String, //Borrador o publicada.
      default: "private"
    },
    active: {
        type: Boolean, //true, false.
        default: true,
    },
    assist: {
        type: Array, //Nombre, id y mail de los clientes que asistan.
    },
    tags: {
        type: Array
    },
    createdAt: {
        type: String,
    },
})

module.exports = mongoose.model("Events", EventsSchema);