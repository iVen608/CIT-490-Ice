const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer");

//Customer Routes
router.get("/customer/", customerController.getAllCustomers);
router.get("/customer/:id", customerController.getSingleCustomer);
router.post("/customer/", customerController.postCustomer)
router.put("/customer/:id", customerController.updateCustomer);
router.delete("/customer/:id", customerController.deleteCustomer);

module.exports = router;