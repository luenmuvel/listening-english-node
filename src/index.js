const app = require("express")();
require("dotenv").config();
require("./database");
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.listen(PORT, () => {
  console.log("Escuchando en el puerto", PORT);
});
