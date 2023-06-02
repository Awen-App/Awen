import organization from '../controller/organization'
import express from 'express';
const route=express.Router();

route.get('/organizations',organization.getAllOrg);
route.post('/organizations',organization.postOrg);
export default route;