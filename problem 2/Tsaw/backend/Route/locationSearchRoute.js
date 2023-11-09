const express = require("express");
const {locationSearch,} = require("../Controller/LocationSearchc.js")
const router = express.Router();

router.post("/", locationSearch);
module.exports = router;
