const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer");
const callinController = require("../controllers/callin");
const routesController = require("../controllers/routes");
const userController = require("../controllers/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();

//Customer Routes
router.get("/customer/", customerController.getAllCustomers);
router.get("/customer/:id", customerController.getSingleCustomer);
router.post("/customer/", customerController.postCustomer)
router.put("/customer/:id", customerController.updateCustomer);
router.delete("/customer/:id", customerController.deleteCustomer);

//CallIn Routes
router.get("/callin/", callinController.getAllCallIns);
router.get("/callin/:id", callinController.getSingleCallIn);
router.post("/callin/", callinController.postCallIn)
router.put("/callin/:id", callinController.updateCallIn);
router.delete("/callin/:id", callinController.deleteCallIn);

//Routes Routes
router.get("/routes/", routesController.getAllRoutes);
router.get("/routes/:id", routesController.getSingleRoutes);
router.post("/routes/", routesController.postRoutes);
router.post("/routes/checkin/:id", routesController.postCheckin);
router.put("/routes/:id", routesController.updateRoutes);
router.delete("/routes/:id", routesController.deleteRoutes);

//Login Routes
router.post("/login/", userController.login);

router.get("/logout/", userController.logout);
router.post("/signup/", userController.signup);

module.exports = router;