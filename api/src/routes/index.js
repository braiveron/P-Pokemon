const { Router } = require("express");
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemon = require("./Pokemons/pokemons");
const types = require("./Types/types");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/pokemons", pokemon);
router.use("/types", types);

module.exports = router;
