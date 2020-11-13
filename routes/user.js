const express = require('express')
const router = express.Router();
// Logipage
router.get('/login',(req,res)=>res.send("Login"))
// Register page
router.get('/register',(req,res)=>res.render("register"))
module.exports = router;