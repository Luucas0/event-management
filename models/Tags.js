const mongoose = require("mongoose");

const TagsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    events: {
        type: Array,
        required: true,
    },
})

module.exports = mongoose.model("Tags", TagsSchema);