import { PrismaClient } from "@prisma/client";
import {Request,Response} from 'express'
const prisma =new PrismaClient();

//------------------------get all organizations------------------------
const getAllOrg=async(req:Request,res:Response)=>{
    try{
        const organizations=await prisma.organization.findMany();
        res.status(200).json(organizations)
    }catch(err){
        console.log(err)
        res.send(err)
    }
}
//------------------------post one organization-------------------------
const postOrg=async(req:Request,res:Response)=>{
    try{
        const organizations=await prisma.organization.create({
            data:{
                orgId:req.body.orgId,
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
//--------------------get organization by email---------------------------------
const getOneOrgByEmail=async(req:Request,res:Response)=>{
    try {
        const one= await prisma.organization.findMany({where:{orgEmail:req.params.email}})
        res.status(200).json(one)
    } catch (error) {
        res.status(500).json(error)
    }
}

export default {getAllOrg,postOrg,getOneOrgByEmail}
