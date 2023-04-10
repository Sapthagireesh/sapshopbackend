const express = require("express");
const router = express.Router();
const userController = require("../RouteControllers/projectController");

router
  .route("/")
  .get(userController.getProject)
  .post(userController.createProject);


  module.exports = router;