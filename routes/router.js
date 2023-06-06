const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer");
const callinController = require("../controllers/callin");
const routesController = require("../controllers/routes");
const jwt = require("jsonwebtoken");
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
router.post("/routes/", routesController.postRoutes)
router.put("/routes/:id", routesController.updateRoutes);
router.delete("/routes/:id", routesController.deleteRoutes);

//Login Routes
router.post("/login/", (req, res) => {
    console.log(req.body);
    console.log(req.cookies);
    const token = jwt.sign({
        name: req.body.name, pass: req.body.pass 
    }, process.env.SECRETKEY, {expiresIn: "24h"});
    console.log(token);
    res.status(200).cookie('Name', token, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(2023, 6, 6, 1),
        httpOnly: true,
        secure: true,
        domain: "https://cit490front.onrender.com"
    }).send("creating cookie");
})

router.get("/logout/", (req, res) => {
    console.log(req.cookies);
    console.log(jwt.verify(req.cookies.Name, process.env.SECRETKEY))
    res.sendStatus(200);
})
module.exports = router;