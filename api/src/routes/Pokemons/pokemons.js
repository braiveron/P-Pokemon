const { Router } = require("express");
const { Pokemon, Type } = require("../../db");
const router = Router();
const { getPoke, createPoke, getById } = require("./controllers");

router.get("/", getPoke);

router.post("/", createPoke);

router.get("/:id", getById);

module.exports = router;
