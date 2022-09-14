const { celebrate, Segments,error,Joi, errors } = require('celebrate');
const { Router } = require('express');
const express = require('express');
const login = require('../../src/controllers/auth/login');
const userRoutes = express.Router();


const {createUser, getAllUsers,getUser,getContent, deleteUser, updateUser, deleteAllUsers} = require("../../src/controllers/user/userController")

userRoutes.post('/users/', createUser);
userRoutes.get('/users/',getAllUsers);
userRoutes.get('/users/:id',celebrate({[Segments.PARAMS]:Joi.object().keys({
    id: Joi.string().alphanum(),
  })}),getUser)
userRoutes.use(errors())
//app.use(celebrate({[Segments.PARAMS]:Joi.string()}))
userRoutes.delete('/users/:id',celebrate({[Segments.PARAMS]:Joi.object().keys({
    id: Joi.string().alphanum(),
  })}),deleteUser);
userRoutes.delete('/users/', deleteAllUsers);
userRoutes.put('/users/:id',celebrate({[Segments.PARAMS]:Joi.object().keys({
    id: Joi.string().alphanum(),
  })}),updateUser);
userRoutes.post('/login/',login)



module.exports = userRoutes