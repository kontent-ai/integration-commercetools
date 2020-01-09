const fs = require("fs");

module.exports = {
  devServer: {
    host: "localhost",
    https: {
      key: fs.readFileSync("./certs/localhost.key"),
      cert: fs.readFileSync("./certs/localhost.cert")
    }
  }
};
