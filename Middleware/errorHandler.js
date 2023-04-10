const { logEvent } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvent(
    `${err.name}\t${err.message}\t${req.method}\t${req.baseUrl}\t${req.header.origin}`,
    "errLog.log"
  );
  console.log(err.stack);
  const status = res.statusCode ? res.statusCode : 500;
  res.status(status);
  res.json({ message: err.message });
};

module.exports = {errorHandler};

/* 
Basically we are importhing the method from the Logevent and sending the value 
to the same event by adding 2 paramater and new File name
and sending the required responce 
*/
