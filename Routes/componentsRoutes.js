const express = require("express");
const router = express.Router();
const componentController = require("../RouteControllers/componentsController");

router
  .route("/")
  .get(componentController.getComponents)
  .post(componentController.createComponent);

module.exports = router;
