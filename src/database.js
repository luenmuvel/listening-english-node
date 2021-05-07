const mongoose = require("mongoose");
const { MONGODB_URI } = process.env;
mongoose
  .connect(`${MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Nos conectamos a la BD", db.connection.host))
  .catch((err) => console.error(err));
