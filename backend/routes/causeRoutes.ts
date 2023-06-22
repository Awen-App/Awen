import cause from '../controller/causes'
import express from 'express';
const causeRoute=express.Router();
causeRoute.get('/slidecauses',cause.getLimitToSlideShow)
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
causeRoute.get('/causes/:idorg',cause.getAllOfOneOrganization);
causeRoute.get('/latest',cause.getLatest);
causeRoute.put('/current/:id',cause.updateCurrent);
export default causeRoute;
