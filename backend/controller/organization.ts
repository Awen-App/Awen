import { PrismaClient } from "@prisma/client";
import {Request,Response} from 'express'
const prisma =new PrismaClient();


const getAllOrg=async(req:Request,res:Response)=>{
    try{
        const organizations=await prisma.organization.findMany();
        res.status(200).json(organizations)
    }catch(err){
        console.log(err)
        res.send(err)
    }
}
const postOrg=async(req:Request,res:Response)=>{
    try{
        const organizations=await prisma.organization.create({
            data:{
            orgName:req.body.name,
            orgEmail: req.body.email,
            description:req.body.description,
            category:req.body.category,
            orgImg:req.body.image,
            rip:req.body.rib
            },
          });
        res.status(200).json(organizations)
    }catch(err){
        console.log(err)
        res.send(err)
    }
}
export default {getAllOrg,postOrg}
