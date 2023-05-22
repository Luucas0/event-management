//DESEABLE: DAR DE BAJA A OPERADORES

const User = require("../models/Users");
const { generateToken } = require("../config/auth");
const bcrypt = require("bcrypt");

const usersManagement = {
  //Función para registrar un usuario.

  registerUser: async function (req, res) {
    try {
      let usuario = await User.findOne({ email: req.body.email });
      if (usuario) {
        return res.status(400).send("Email already exists");
      }
      if (
        data.password.charAt(0) ===
        data.password.charAt(0).toLowerCase()
      ) {
        return res.status(400).send("First letter have to upper case.");
      }

      function containsNumber(str) {
        return /\d/.test(str);
      }

      if (!containsNumber(data.password)) {
        return res.status(400).send("The password need 1 number.");
      }

      const user = req.body
      const newUser = new User({
        fullName: user.fullName,
        password: user.password,
        email: user.email,
        phone: user.phone,
      });

      newUser.save().then((savedUser) => {
        res.status(201).send(savedUser);
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  },

  //Función de logeo de usuarios

  loginUser: async function (req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ msg: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid credential" });
      }
  
      const payload = {
        email: user.email,
        id: user._id,
        fullName: user.fullName,
        phone: user.phone,
        role: user.role,
        events: user.events,
        createdAt: user.dni,
      };
  
      const token = generateToken(payload);
      res.cookie("token", token);
      return res.json({ token, user: payload });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  },

  //Función para mostrar TODOS los usuarios.
  allUsers: async function (req, res) {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(404).send(error);
    }
  },

  //Función para traer un usuario por su ID.
  catchUserById: async function (req, res) {
    try {
      const users = await User.findOne({ _id: req.params.id });

      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  //Función para buscar usuarios. [Nombre, email, phone, dni] /=WIP=\
  searchUser: async function (req, res) {
    const user = await User.find();
    let filterUsers = [];

    user.forEach((users) => {
      if (
        users.fullName.toLowerCase().includes(req.params.search.toLowerCase())
      )
        filterUsers.push(users);
      else if (
        users.dni.toLowerCase().includes(req.params.search.toLowerCase())
      )
        filterUsers.push(users);
      else if (
        users.email.toLowerCase().includes(req.params.search.toLowerCase())
      )
        filterUsers.push(users);
      else if (
        users.phone.toLowerCase().includes(req.params.search.toLowerCase())
      )
        filterUsers.push(users);
    });

    res.send(filterUsers);
  },
  //Traer información de usuario logeado
  loggedUser: async function (req, res) {
    let users = await User.findOne({ _id: props.user.id });
    res.send(users);
  },

  //Función para deslogearse
  logout: async function (req, res) {
    res.clearCookie("token");
    res.sendStatus(200);
  },

  //Setear privilegios de administrador
  changeAdmin: async function (req, res) {
    try {
      const user = await User.update(
        {
          _id: req.params.id,
        },
        {
          role: "administrator",
        }
      );
      res.send(200).status(user);
    } catch (error) {
      res.status(401).send(error);
    }
  },

  changePassword: async function (req, res) {
    const userFound = await User.findOne({ email: req.body.email });
    userFound.validatePassword(req.body.oldPassword).then((isValid) => {
      if (!isValid) return res.status(401).send("Invalid credentials");

      console.log(userFound.password);

      try {
        let newHash = bcrypt.hashSync(req.body.newPassword, 10);
        const user = User.update(
          {
            email: userFound.email,
          },
          {
            password: newHash,
          }
        )
          .then((savedUser) => {
            res.status(201).send(savedUser);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      } catch (err) {
        res.status(500).send(err);
      }
    });
  },

  //Actualizar perfil de un usuario
  updateLogedUser: async function (req, res) {
    try {
      let data = req.body;

      if (data.password && data.phone) {
        let newHash = bcrypt.hashSync(req.body.password, 10);

        const upd = await User.update(
          { _id: props.user.id },
          {
            password: newHash,
            phone: data.phone,
          }
        );
        return res.status(200).send("Password and Phone updated!");
      } else if (data.password) {
        let newHash = bcrypt.hashSync(req.body.password, 10);

        const update = await User.update(
          { _id: props.user.id },
          {
            password: newHash,
          }
        );

        return res.status(200).send("Password updated!");
      } else if (data.phone) {
        const updated = await User.update(
          { _id: props.user.id },
          {
            phone: data.phone,
          }
        );

        return res.status(200).send("Phone updated!");
      } else {
        return res
          .status(400)
          .send("Credentials are invalid or send empty fields.");
      }
    } catch (error) {
      res.status(404).send(error);
    }
  },

  //Borrar un usuario
  deleteUser: async function (req, res) {
    const user = await User.deleteOne({ _id: req.params.id })

      .then((userDeleted) => {
        res.status(200).send(userDeleted);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
};

module.exports = usersManagement;