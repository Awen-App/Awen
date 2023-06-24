import organization from '../controller/organization'
import express from 'express';
const route=express.Router();

route.get('/organizations',organization.getAllOrg);
route.post('/organizations',organization.postOrg);
route.get('/organizations/:email',organization.getOneOrgByEmail)
route.get('/organizations/id/:id',organization.getOneOrgById)
route.put('/organizations/update/:id',organization.updateImage)
route.put('/mail/:id',organization.updatemail)
export default route;