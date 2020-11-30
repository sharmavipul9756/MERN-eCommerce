
const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const router = express.Router();

const {makePayment} = require("../controllers/stripePayment");


router.post("/stripePayment", makePayment)


module.exports = router;