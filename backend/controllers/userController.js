const User = require("../models/user");
const bcrypt = require('bcrypt');

const saltRounds = 10;

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validar que no falten campos
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el correo ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear el nuevo usuario
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Listar todos los usuarios
const getUsers = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email es obligatorio" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.role === "admin") {
      const users = await User.find();
      return res.json(users);
    } else {
      return res.status(403).json({ message: "El usuario no es administrador" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};


// valida usuario y contrasena
const validateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Si pasa la validación
    res.status(200).json({
      message: "Login exitoso",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// Borra Usuarios
const userDelete = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email es obligatorio" });
    }

    const deletedUser = await User.findOneAndDelete({ email });
    
    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

module.exports = { registerUser, getUsers, validateUser, userDelete };