const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "todo",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("connected");
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM todolist2;";
  con.query(sql, function (err, result) {
    if (err) {
      console.log(err);
    }
    const arr = [];
    for (i = 0; i < result.length; i++) {
      arr.push({ list: result[i].list, id: result[i].id });
    }
    //console.log(result[0].list);
    res.status(200).json(arr);
  });
});

router.post("/", (req, res) => {
  console.log(req.body.list);
  const sql = "INSERT into todolist2 (list) VALUES(?)";
  let values = req.body.list;
  con.query(sql, values, function (err) {
    if (err) throw err;
    res.status(200).send("เพิ่มข้อมูลเรียบร้อย");
  });
});

router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM todolist2 WHERE id = ?";
  let values = req.params.id;
  console.log(values);
  con.query(sql, values, function (err, result) {
    if (err) throw err;
    console.log("Delete Row:", result.affectedRows);
    res.status(200).send("ลบข้อมูลเรียบร้อย");
  });
});

module.exports = router;
