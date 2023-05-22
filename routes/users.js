const express = require("express");
const router = express.Router();

const {validateAuth, validateAdmin} = require("../middleware/validations")
const {
  registerUser,
  allUsers,
  loginUser,
  loggedUser,
  deleteUser,
  changeAdmin,
  logout,
  updateLogedUser,
} = require("../controller/users");

//Mostrar en consola a todos los usuarios.
router.get("/allUsers", validateAuth, validateAdmin, allUsers);

//Recibir perfil de usuario logeado
router.get("/me", validateAuth, loggedUser); //router.get("/me", validateAuth, loggedUser);

//Registrar usuario
router.post("/register", registerUser);

//Logearse
router.post("/login", loginUser);

//Logout
router.post("/logout", validateAuth, logout);

//Actualizar usuario logeado
router.put("/updateUser", validateAuth, updateLogedUser); //router.put("/updateUser", validateAuth, updateLogedUser);

//Actualizar rol a administrador
router.put("/setAdmin/:id", validateAuth, validateAdmin, changeAdmin); //router.put("/setAdmin/:id", validateAuth, changeAdmin);

//Borrar usuario
router.delete("/deleteUser/:id", validateAuth, validateAdmin, deleteUser); //router.delete("/deleteUser/:id", validateAuth, validateAdmin, deleteUser);
module.exports = router;