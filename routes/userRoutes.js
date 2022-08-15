const { Router } = require('express');
const express = require('express')
const router = express.Router();


const {createUser, getAllUsers,getUser} = require("../controllers/user/userController")


router.post('/users/post',createUser);
router.get('/users/all',getAllUsers);
router.get('/users/:id',getUser)


module.exports = router