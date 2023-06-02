import cause from '../controller/causes'
import express from 'express';
const causeRoute=express.Router();

causeRoute.get('/getcauses',cause.getAllCauses);
causeRoute.get('/getcause/:id',cause.getOneCause);
causeRoute.post('/postcauses',cause.postOneCauses);
causeRoute.get('/getcauseby/:category',cause.getByCategory);
causeRoute.put('/updatecause/:id',cause.updateCause);
causeRoute.delete('/deletecause/:id',cause.deleteCause)
export default causeRoute;
