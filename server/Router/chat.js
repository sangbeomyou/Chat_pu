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
  q = `
  select a.room_id,
  STUFF(
    (select ',' + name  from chatroomjoin
        where room_id = a.room_id and room_id in (
    select room_id  from chatroomjoin 
        where empno = @empno)
        FOR XML PATH('') 
        ),1,1,'') as chatusers,
  a.usercnt,
  a.message
  from (
  select a.room_id, max(b.usercnt) as 'usercnt' , max(b.isdeleted) as 'isdeleted', 
         max(c.message) as 'message', max(c.time)as 'time' 
        from chatroomjoin as a
  Left JOIN chatroom as b
    on a.room_id = b.room_id
  Left JOIN chatmessage as c
    on a.room_id = c.room_id
  where a.empno = @empno
    group by a.room_id
  ) as a
  where a.isdeleted = 'N'`;
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
        // console.log( new Date(),'chatroomlist');

        return result.length > 0
          ? res.status(200).send({ result: true, posts: result })
          : res.status(200).send({ result: false, posts: data });
      });
  });
});

//새방초대하기
router.post("/newchatroominsert", (req, res) => {
  const pool = new sql.ConnectionPool(config);
  const request = new sql.Request(pool);
  const invitelist = req.query.invitelist.map(JSON.parse);
  var str = "";

  request.input("usercnt", req.query.usercnt);
  invitelist.map((item) => {
    str += `  INSERT INTO [dbo].[ChatRoomJoin]
    ([empno]
    ,[name]
    ,[room_id])
    VALUES ('${item.EmpId}',
            '${item.UserName}',
            IDENT_CURRENT('[ChatRoom]'))`;
  });
  q = `
  INSERT INTO [dbo].[ChatRoom]
  ([isDeleted]
  ,[usercnt])
VALUES
  ('N'
  ,@usercnt)
  ${str}`;
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
        console.log(data);
        return data.rowsAffected[0] > 0
          ? res.status(200).send({ result: true })
          : res.status(200).send({ result: false });
      });
  });
});

//기존방초대하기
router.post("/chatroominsert", (req, res) => {
  const pool = new sql.ConnectionPool(config);
  const request = new sql.Request(pool);
  const invitelist = req.query.invitelist.map(JSON.parse);
  var str = "";
  request.input("usercnt", req.query.usercnt);
  request.input("room_id", req.query.room_id);

  invitelist.map((item) => {
    str += `INSERT INTO [dbo].[ChatRoomJoin]
    ([empno]
    ,[name]
    ,[room_id])
    VALUES ('${item.EmpId}',
            '${item.UserName}',
            @room_id)`;
  });
  q = `
  UPDATE [dbo].[ChatRoom]
  SET
     [usercnt] = [usercnt] + @usercnt
     WHERE room_id = @room_id
  ${str}`;
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
        console.log(data);
        return data.rowsAffected[0] > 0
          ? res.status(200).send({ result: true })
          : res.status(200).send({ result: false });
      });
  });
});

//기존방 나가기
router.post("/chatroomexit", (req, res) => {
  const pool = new sql.ConnectionPool(config);
  const request = new sql.Request(pool);
  request.input("room_id", req.query.room_id);
  request.input("empno", req.query.empno);

  q = `
  UPDATE [dbo].[ChatRoom]
  SET
     [usercnt] = [usercnt] - 1
     WHERE room_id = @room_id

	 DELETE FROM [dbo].[ChatRoomJoin]
      WHERE room_id = @room_id and empno = @empno
    `;
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
        return data.rowsAffected[0] > 0
          ? res.status(200).send({ result: true })
          : res.status(200).send({ result: false });
      });
  });
});

//메세지 리스트 불러오기
router.post("/chatmessagelist", (req, res) => {
  const pool = new sql.ConnectionPool(config);
  const request = new sql.Request(pool);
  var result = [];
  q = `select 
  a.message, a.time, a.room_id, 
  a.empno, b.name 
  from chatMessage as a
  INNER JOIN chatroomjoin as b
  on a.empno = b.empno
  and a.room_id=b.room_id
  where a.isDeleted = 'N'
  and a.room_id = ${req.query.room}
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
        return result.length > 0
          ? res.status(200).send({ result: true, posts: result })
          : res.status(200).send({ result: false });
      });
  });
});
//메세지  인서트
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
