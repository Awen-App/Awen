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
            orgName:req.body.orgName,
            orgEmail: req.body.orgEmail,
            description:req.body.description,
            category:req.body.category,
            orgImg:"https://1000logos.net/wp-content/uploads/2020/08/Anonymous-Logo.png",
            rip:req.body.rip
            },
          });
          console.log(req.body)
        res.status(201).json(organizations)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
export default {getAllOrg,postOrg}
