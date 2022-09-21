const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { getTypes } = require("./controllers");

router.get("/", getTypes);

module.exports = router;
