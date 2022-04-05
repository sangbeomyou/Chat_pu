const express = require("express");
const router = express.Router();
const sql = require("mssql");

const config = require("../config/db_test");

router.post("/chatroomlist", (req, res) => {
  const pool = new sql.ConnectionPool(config);
  const request = new sql.Request(pool);
  var result = [];
  request.input("empno", req.query.empno);
  q = `select a.room_id,
  STUFF((select ',' + name  from chatroomjoin
  where room_id = a.room_id and room_id in (
  select room_id  from chatroomjoin 
  where empno = @empno)
  FOR XML PATH('') 
  ),1,1,'') as chatusers,
  a.usercnt
  from (select a.room_id, b.usercnt  from chatroomjoin as a
  INNER JOIN chatroom as b
  on a.room_id = b.room_id
  where a.empno = @empno
  ) as a
  group by a.room_id, a.usercnt`;
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
        //console.log("result :", result);
        return result.length > 0
          ? res.status(200).send({ result: true, posts: result })
          : res.status(200).send({ result: false });
      });
  });
});

module.exports = router;
