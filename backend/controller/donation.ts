import { PrismaClient } from "@prisma/client";
import {Request,Response} from 'express'
const prisma =new PrismaClient();

const getDonations=async(req:Request,res:Response)=>{
    try{
        const donations=await prisma.donation.findMany();
        res.status(200).json(donations)
    }catch(err){
        console.log(err)
        res.send(err)
    }
}
const getDonationByUser=async(req:Request,res:Response)=>{
    try{
        const userDonations=await prisma.donation.findMany({
            where:{
                userId:req.params.id           }
        })
        res.status(200).json(userDonations)
    }catch(err){
        console.log(err);
        res.json(err)
    }
}
export default {
    getDonations,
    getDonationByUser
}