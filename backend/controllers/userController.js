const User = require("../models/user");

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar que no falten campos
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Crear el nuevo usuario
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Listar todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

module.exports = { registerUser, getUsers };
