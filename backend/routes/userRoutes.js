const express = require("express");
const { registerUser, getUsers, validateUser, userDelete } = require("../controllers/userController");

const router = express.Router();

// POST -> registrar usuario
router.post("/register", registerUser);

// GET -> listar usuarios
router.get("/", getUsers);

// POST -> login / validar usuario
router.post("/login", validateUser);

router.delete("/delete", userDelete);

module.exports = router;
