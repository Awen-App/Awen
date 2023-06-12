import Donation from '../controller/donation'
import express from 'express';
const route=express.Router();

route.get('/donation',Donation.getDonations)
route.get('/donation/:id',Donation.getDonationByUser)
route.post('/donation',Donation.AddDonation)
export default route;