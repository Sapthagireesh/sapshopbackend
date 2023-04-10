//Library imports
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { default: mongoose } = require("mongoose");

//internal imports
const connectDB = require("./Config/dbConn");
const { logger } = require("./Middleware/logger");
const { logEvent } = require("./Middleware/logger");
const { errorHandler } = require("./Middleware/errorHandler");
const projects = require("./Routes/projectsRoutes");
const components = require("./Routes/componentsRoutes");

//configs
const app = express();
PORT = 3010;
connectDB(); //Establishing the DC conn Mongoose DB

//Middlewares
app.use(logger); // to log the data in the stack
app.use(cors({ origin: "*" })); // to allow Cross origin access
app.use(express.json({ limit: "5mb" })); //then incoming req data is parved with JSON type
//as of now we are not storing any data in the form of Cookie so no cookieParser()

//Request Handlers
app.get("/", (req, res) => {
  res.send("This is the backend App with no UI");
});

//Router handler Middleware
app.use("/projects", projects);
app.use("/projectComponents", components);

//Handlig undefined/Unhandeled URL's
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.send("This URL is not supported by SapShop");
  } else if (req.accepts("json")) {
    res.send({ message: "404 page not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

app.use(errorHandler);

//---------------------------------------------------------------------------------------

//Starting the server if the Connection is successfu
mongoose.connection.once("open", () => {
  console.log("Mongoose on Startup");
  app.listen(process.env.PORT, () => {
    console.log(
      `Express is up and listening http://localhost:${process.env.PORT}`
    );
  });
});

//Writing logs on mongoose error
mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvent(
    `${err.no}:${err.code}\t${err.syscall}\t${err.hostname},${mongoErrLog.log}`
  );
});
