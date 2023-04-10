const { v4: uuid } = require("uuid");
const fs = require("fs");
const path = require("path");
const { format } = require("date-fns");

const logEvent = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  //date and time values is set to dateTime
  const logItem = `${dateTime} \t${uuid()} \t ${message}\n`;
  // the log iteam is the variable which contain dateTime unique id and the message
  try {
    if (!fs.existsSync(path.join(__dirname, "../logs"))) {
      await fs.promises.mkdir(path.join(__dirname, "../logs"));
    }
    await fs.promises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

const logger = (req, res, next) => {
  logEvent(
    `Method: ${req.method}\tURL: ${req.url}\t Origin: ${req.get("origin")}`,
    "reqLog.log"
  );
  console.log(
    `Method: ${req.method}\tURL: ${req.url}\t Origin: ${req.get("origin")}`
  );
  next();
};

module.exports = { logEvent, logger };
