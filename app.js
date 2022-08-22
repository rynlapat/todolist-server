const express = require("express");
const app = express();
const router = require("./routes/todolistroute");
const cors = require("cors");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.listen(3003, () => {
  console.log("รัน server ที่ port 3003");
});
