const express = require("express");
const { registerUser, getUsers } = require("../controllers/userController");

const router = express.Router();

// POST -> registrar usuario
router.post("/register", registerUser);

// GET -> listar usuarios
router.get("/", getUsers);

module.exports = router;
