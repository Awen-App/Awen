import cause from '../controller/causes'
import express from 'express';
const causeRoute=express.Router();
causeRoute.get('/slidecauses',cause.getLimitToSlideShow)
causeRoute.get('/getcauses',cause.getAllCauses);
causeRoute.get('/getcause/:id',cause.getOneCause);
causeRoute.get('/causeactive',cause.getAllActive);
causeRoute.get('/causenonactive',cause.getAllNonActive);
causeRoute.get('/causeaccepted',cause.getAllAccepted);
causeRoute.get('/causenonaccepted',cause.getAllNonAccepted);
causeRoute.get('/getcauseby/:category',cause.getByCategory);
causeRoute.post('/postcauses',cause.postOneCauses);
causeRoute.put('/acceptcause/:id',cause.acceptCause);
causeRoute.put('/archivecause/:id',cause.archiveCause);
causeRoute.put('/donate/:id',cause.updateCurrent);
causeRoute.put('/img/:id',cause.updateImg);
causeRoute.delete('/deletecause/:id',cause.deleteCause);


export default causeRoute;
