import cause from '../controller/causes'
import express from 'express';
const causeRoute=express.Router();

causeRoute.get('/getcauses',cause.getAllCauses);
causeRoute.get('/getcause/:id',cause.getOneCause);
causeRoute.post('/postcauses',cause.postOneCauses);
causeRoute.get('/getcauseby/:category',cause.getByCategory);
causeRoute.put('/acceptcause/:id',cause.acceptCause);
causeRoute.put('/archivecause/:id',cause.archiveCause)
causeRoute.delete('/deletecause/:id',cause.deleteCause)
causeRoute.get('/causeactive',cause.getAllActive)
causeRoute.get('/causenonactive',cause.getAllNonActive)
causeRoute.get('/causeaccepted',cause.getAllAccepted)
causeRoute.get('/causenonaccepted',cause.getAllNonAccepted)
export default causeRoute;
