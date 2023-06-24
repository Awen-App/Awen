import { Prisma, PrismaClient } from "@prisma/client";
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
            orgImg:req.body.orgImg,
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
//--------------------get organization by id---------------------------------
const getOneOrgById=async(req:Request,res:Response)=>{
    // console.log(req.params)
    try {
        const one= await prisma.organization.findUnique({where:{orgId:req.params.id}})
        // console.log(req.params.id,one,'hhhh')
        res.status(200).json(one)
    } catch (error) {
        res.status(500).json(error)
    }
}
//------------------update organization -----------------
const updateImage = async (req: Request, res: Response) => {
    try {
        const updated = await prisma.organization.update({
            where: {
                orgId: req.params.id
            },
            data:{orgImg:req.body.orgImg}
        });

        res.status(200).send("image updated");
        console.log(res,'okk')
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};
const updatemail = async (req: Request, res: Response) => {
    try {
        const updated = await prisma.organization.update({
            where: {
                orgId: req.params.id
            },
            data:{orgEmail:req.body.orgEmail}
        });

        res.status(200).send("image updated");
        console.log(res,'okk')
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
};



export default {getAllOrg,postOrg,getOneOrgByEmail,getOneOrgById,updateImage,updatemail}
