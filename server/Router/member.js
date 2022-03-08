const express = require("express");
const router = express.Router();
const sql = require("mssql");

const moin_config = require("../config/db_moin");

router.post("/tree_menu", (req, res) => {
  const pool = new sql.ConnectionPool(moin_config);
  const request = new sql.Request(pool);
  var result = [];
  q =	`SELECT 
            DeptID,
            DeptID as 'key', 
            DeptName as 'title',
            [Level] + 2 as 'Level' ,
            CASE WHEN COMPANYCODE ='HPC' AND [Level] + 2=2 THEN '1'
              WHEN COMPANYCODE ='LPC' AND [Level] + 2=2 THEN '2'
              WHEN COMPANYCODE ='KPC' AND [Level] + 2=2 THEN '3'
              ELSE ParentDeptID
            END AS
            ParentDeptID,
            DeptCD,
            --SORTKEY,
            isNull(MailAddress, '') as MailAddress,
            'DEPT|' + CONVERT(VARCHAR(100),DeptID) + '|' + DEPTNAME + '|' as Tag
            , sortkey, null as 'children'
          FROM VW_DEPT (NOLOCK)
          WHERE 
            RootCD = '0'
            AND
            DeleteDate > getDate()
            and display_yn='y'
      ORDER BY [Level] asc,Sortkey asc`
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
        result.map((item) => 
        item.children = []
        );
      
        for (var i = 7; i > 3; i--) {
          result.map((root) => {
            result.map((item) => {
              if(i === root.Level) {
                if(item.DeptID === root.ParentDeptID){
                  item.children.push(root)
                }
              }
            });
          });
        };
        //console.log("result :", result);
        return result.length > 0 ? res.status(200).send({ "result" : true, posts: [result[0]] }) : res.status(200).send({ "result" : false })
      });
  });
});

router.post("/member_list", (req, res) => {
    const pool = new sql.ConnectionPool(moin_config);
    const request = new sql.Request(pool);
    var result = [];
    q =	`select UserName, DeptId, DeptName, JikWi,JikChaek, EmpId, EmpId as 'key'  from VW_USER
          where DisplayYN='Y'`
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
          return result.length > 0 ? res.status(200).send({ "result" : true, posts: result }) : res.status(200).send({ "result" : false })
        });
    });
  });

  router.post("/member_info", (req, res) => {
    const pool = new sql.ConnectionPool(moin_config);
    const request = new sql.Request(pool);
    var result = [];
    request.input("empno", req.query.empno);
    q =	`select UserName, DeptId, DeptName, MailAddress, Fax, OfficePhone, EmpId, JikChaek, JikWi, JikGeup, Address, HandPhone, Phone  from VW_USER
          where empid=@empno`
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
          return result.length > 0 ? res.status(200).send({ "result" : true, posts: result }) : res.status(200).send({ "result" : false })
        });
    });
  });  

module.exports = router;




				
