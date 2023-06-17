import express from 'express';
import message from '../controller/message';
const route=express.Router();


route.get('/message',message.getAllMessage);
route.get('/message/:id',message.getConversation)
route.post('/message',message.addMessage)

export default route;