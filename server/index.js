const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
//const User = require("./config");
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "sql6.freesqldatabase.com",
  user: "sql6519206", // e.g. 'my-db-user'
  password: "yML6TFniNZ", // e.g. 'my-db-password'
  database: "sql6519206", // e.g. 'my-database'
  port: "3306",
  //socketPath: `/cloudsql/coolercrud-362214:asia-southeast1:roots`, // e.g. '/cloudsql/project:region:instance'
  // Specify additional properties here
});
console.log(db);

// };
// createUnixSocketPool;
// console.log(createUnixSocketPool());

app.post("/create", (req, res) => {
  const idnum = req.body.idnum;
  const name = req.body.name;
  const Quantity = req.body.Quantity;
  const supplier = req.body.supplier;
  const monthadded = req.body.monthadded;

  db.query(
    "INSERT INTO products (ID,Name,Quantity,Supplier,Month) VALUES (?,?,?,?,?)",
    [idnum, name, Quantity, supplier, monthadded],
    (err, result) => {
      if (err) {
        console.log("error");
      } else {
        res.send("value inserted");
      }
    }
  );
});

app.get("/stocks", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const Quantity = req.body.Quantity;
  console.log(id);
  db.query(
    "UPDATE products SET Quantity = ? WHERE id = ?",
    [Quantity, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM products WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3005, function () {
  console.log("server is now running on port 3005");
});
