const express = require("express");
const router = express.Router();
const sql = require("mssql");

const config = require("../config/db");

router.post("/login", (req, res) => {
  const pool = new sql.ConnectionPool(config);
  const request = new sql.Request(pool);
  var result = [];
  request.input("empno", req.query.empno);
  request.input("passwd", req.query.passwd);
  q =
    "SELECT user_id as empno, user_nm as korname  FROM SalesDb.dbo.userm a WHERE a.user_id = @empno AND a.passwd = @passwd";

  pool.connect((err) => {
    if (err) {
      console.error(err);
      return;
    }
    request
      .query(q, (err, data) => {
        if (err) {
          console.error(err);
          return;
        } else {
          if (data.rowsAffected.length > 0) {
          } else {
            console.log("No hay datos en la tabla");
          }
        }
        pool.close();
      })
      .on("error", function (err) {
        console.log(err);
      })
      .on("row", (row) => {
        result.push(row);
      })
      .on("done", (data) => {
        // 마지막에 실행되는
        return data.rowsAffected > 0 ? res.status(200).send({ "result" : true, posts: result }) : res.status(200).send({ "result" : false })
      });
  });
});


module.exports = router;




				
