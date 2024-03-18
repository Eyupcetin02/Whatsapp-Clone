const express = require("express")
const router = express.Router()
const { users, getAllMessage } = require("../functions/users")



router.post("/users" , users)
router.post("/getAllMessage" , getAllMessage)

module.exports = router