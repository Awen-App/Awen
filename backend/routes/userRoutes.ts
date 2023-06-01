import User from '../controller/user'
import express from 'express';
const route=express.Router();


route.get('/users',User.getAllUsers)
route.post('/users',User.addUser)
export default route;