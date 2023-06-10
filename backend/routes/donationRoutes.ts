import Donation from '../controller/donation'
import express from 'express';
const route=express.Router();

route.get('/donation',Donation.getDonations)

export default route;