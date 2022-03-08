const express = require("express");
const router = express.Router();
router.post("/", (req, res) => {
  const id =req.query.empno
  const pw = req.query.empno
  res.send({pw});
  console.log(pw)
});
module.exports = router;
