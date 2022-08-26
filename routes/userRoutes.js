const { Router } = require('express');
const express = require('express')
const router = express.Router();


const {createUser, getAllUsers,getUser,getContent, deleteUser, updateUser, deleteAllUsers} = require("../controllers/user/userController")

router.post('/users/', createUser);
router.get('/users/',getAllUsers);
router.get('/users/:id',getUser);
router.delete('/users/:id', deleteUser);
router.delete('/users/', deleteAllUsers);
router.put('/users/:id',updateUser);



module.exports = router