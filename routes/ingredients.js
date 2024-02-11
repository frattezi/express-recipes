var express = require("express");
var router = express.Router();
var sqlite3 = require("sqlite3").verbose();

var db = new sqlite3.Database("./myDatabase.db");
/* GET ingredients listing. */
router.get("/", function (req, res, next) {
  db.all("SELECT * FROM ingredients", [], (err, rows) => {
    if (err) {
      // Handle error - send error response or pass error to next
      res.status(500).send({ error: err.message });
      return;
    }
    // On success, send the rows as JSON
    res.send(JSON.stringify(rows));
  });
});

router.post("/", function (req, res, next) {
  const { name, price, image } = req.body;
  db.run(
    "INSERT INTO ingredients (name, price, image) VALUES (?, ?, ?)",
    [name, price, image],
    (err) => {
      if (err) {
        res.status(500).send({ error: err.message });
        return;
      }
      res.send("Ingredient added");
    }
  );
});

module.exports = router;
