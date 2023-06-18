import conversation from '../controller/conversation'
import express from 'express';
const route=express.Router();

route.get('/allconversations',conversation.getConversations)
route.get('/room/:user/:org',conversation.getRoom)
route.get('/conversations/:user',conversation.userConversation)
route.get('/orgconversations/:orgName',conversation.orgConversation)
route.post('/addConversation',conversation.addConversation)
route.post('/startConversation',conversation.startConversation)

export default route