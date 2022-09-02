const { Router } = require('express');
const express = require('express');
const login = require('../../src/controllers/auth/login');
const userRoutes = express.Router();


const {createUser, getAllUsers,getUser,getContent, deleteUser, updateUser, deleteAllUsers} = require("../../src/controllers/user/userController")

userRoutes.post('/users/', createUser);
userRoutes.get('/users/',getAllUsers);
userRoutes.get('/users/:id',getUser);
userRoutes.delete('/users/:id', deleteUser);
userRoutes.delete('/users/', deleteAllUsers);
userRoutes.put('/users/:id',updateUser);
userRoutes.post('/login/',login)



module.exports = userRoutes