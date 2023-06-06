import User from '../controller/user'
import express from 'express';
const route=express.Router();


route.get('/users',User.getAllUsers)
route.get('/users/:email',User.checkUser)
route.post('/users',User.addUser)
route.delete('/users/:email',User.removeUser)
export default route;