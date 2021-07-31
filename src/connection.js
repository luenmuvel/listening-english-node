const mongoose = require("mongoose");
const { MONGODB_URI } = process.env;
mongoose
  .connect(`${MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Conectados a la BD", db.connection.host))
  .catch((err) => console.error(err));

mongoose.connection.once("open", (_) => {
  console.log("Conectados a", MONGODB_URI);
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
