const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Minimun password length is 8 characters"],
    },
    salt: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.default.isEmail, "Please enter a valid email"],
    },
    phone: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: "user",
    },
    events: {
      type: Array,
    },
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String,
    },
})



// Schema Hook => has de la password y creacion del salt del usuario
UserSchema.pre("save", async function () {
  if (!this.salt && this.password) {
    this.salt = bcrypt.genSaltSync();
    return (this.password = await bcrypt.hash(this.password, this.salt));
  }
});

UserSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt
    .hash(password, this.salt)
    .then((newHash) => newHash === this.password);
};

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("User", UserSchema);