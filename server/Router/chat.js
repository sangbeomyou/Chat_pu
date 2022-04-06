const express = require("express");
const router = express.Router();
const sql = require("mssql");

const config = require("../config/db_test");
//방목록 불러오기
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
  from (select a.room_id, b.usercnt, b.isdeleted  from chatroomjoin as a
  INNER JOIN chatroom as b
  on a.room_id = b.room_id
  where a.empno = @empno
  ) as a
  where a.isdeleted = 'N'
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
//메세지 리스트 불러오기
router.post("/chatmessagelist", (req, res) => {
  const pool = new sql.ConnectionPool(config);
  const request = new sql.Request(pool);
  var result = [];
  request.input("room", req.query.room);
  q = `select 
  a.message, a.time, a.room_id, 
  a.empno, b.name 
  from chatMessage as a
  INNER JOIN chatroomjoin as b
  on a.empno = b.empno
  and a.room_id=b.room_id
  where a.isDeleted = 'N'
  and a.room_id = @room
  order by a.message_id desc`;
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
//메세지 리스트 인서트
router.post("/sendchatmessage", (req, res) => {
  const pool = new sql.ConnectionPool(config);
  const request = new sql.Request(pool);
  request.input("message", req.query.message);
  request.input("time", req.query.time);
  request.input("room_id", req.query.room_id);
  request.input("empno", req.query.empno);
  q = `
  INSERT INTO [dbo].[ChatMessage]
             ([message]
             ,[time]
             ,[room_id]
             ,[empno]
             ,[isDeleted])
       VALUES
             (@message
             ,@time
             ,@room_id
             ,@empno
             ,'N')`;
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
      .on("done", (data) => {
        // 마지막에 실행되는
        // console.log(data);
        return data.rowsAffected > 0
          ? res.status(200).send({ result: true })
          : res.status(200).send({ result: false });
      });
  });
});
module.exports = router;
