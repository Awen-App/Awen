import { PrismaClient } from "@prisma/client";
import {Request,Response} from 'express'
const prisma =new PrismaClient();
const cause=prisma.cause

//this functions gets all causes
const getAllCauses =async (req:Request,res:Response) =>{
    console.log(req.url, 'request url');
    
    try {
        const causes = await cause.findMany()   
        res.status(200).json(causes)    
    } catch (error) {
        res.status(500).json(error)
    }
}
//this functions gets one cause by its Id
const getOneCause = async (req:Request, res:Response) =>{
    try {
        const one= await cause.findUnique({where: {causeId: req.params.id}})
        res.status(200).json(one)
    } catch (error) {
        res.status(500).json(error)
    }
}
//this function posts one cause in the database
const postOneCauses = async (req:Request, res:Response) =>{
    try {
        console.log(req.body)
        const one= await cause.create({data: {
            causeImg: req.body.causeImg,
            title: req.body.title,
            causeDescription: req.body.causeDescription,
            causeCategory: req.body.causeCategory,
            createdAt: new Date(),
            target: req.body.target,
            current: req.body.current,
            accepted: req.body.accepted,
            status: req.body.status,
            author: {
                connect: { orgId: req.body.orgId }
            }
            }})
            res.status(200).json(one)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
//this function gets all causes that shares the same category
const getByCategory= async (req:Request,res:Response)=>{
      try {
        const causes= await cause.findMany({where: {causeCategory: req.params.category}})
        res.status(200).send(causes)
      } catch (error) {
        res.status(500).send(error)
      }
}
// this function accepts one cause 
const acceptCause=async (req:Request,res:Response) => {
    try {
        const updated = await cause.update({where:{
            causeId:req.params.id
        },data:{accepted:true}})
        res.status(200).send("accepted")
    } catch (error) {
        res.status(500).send(error)
    }
}
// this function archives one cause 
const archiveCause=async (req:Request,res:Response) => {
    try {
        const updated = await cause.update({where:{
            causeId:req.params.id
        },data:{status:true,},})
        res.status(200).send("archived")
    } catch (error) {
        res.status(500).send(error)
    }
}
const updateCurrent=async (req:Request,res:Response) => {
    try {
        const updated = await cause.update({where:{
            causeId:req.params.id
        },data:{current:req.body.current,},})
        res.status(200).send("donated")
    } catch (error) {
        res.status(500).send(error)
    }
}
const updateImg=async (req:Request,res:Response) => {
    try {
        const updated = await cause.update({where:{
            causeId:req.params.id
        },data:{causeImg:req.body.causeImg,},})
        res.status(200).send("donated")
    } catch (error) {
        res.status(500).send(error)
    }
}
// this function deletes one cause 
const deleteCause=async (req:Request,res:Response)=>{
    try {
        const deleted = await cause.delete({where:{causeId:req.params.id}})
        res.status(200).send("deleted")
    } catch (error) {
        res.status(500).send(error)
    }
}
const getAllAccepted =async (req:Request,res:Response) =>{ 
    try {
        const causes = await cause.findMany({where:{accepted:true}})   
        res.status(200).json(causes)    
    } catch (error) {
        res.status(500).json(error)
    }
}
const getAllNonAccepted =async (req:Request,res:Response) =>{
    try {
        const causes = await cause.findMany({where:{accepted:false}})   
        res.status(200).json(causes)    
    } catch (error) {
        res.status(500).json(error)
    }
}
const getAllActive =async (req:Request,res:Response) =>{
    try {
        const causes = await cause.findMany({where:{status:true}})   
        res.status(200).json(causes)    
    } catch (error) {
        res.status(500).json(error)
    }
}
const getAllNonActive =async (req:Request,res:Response) =>{
    try {
        const causes = await cause.findMany({where:{status:false}})   
        res.status(200).json(causes)    
    } catch (error) {
        res.status(500).json(error)
    }
}

const getLimitToSlideShow=async(req:Request,res:Response)=>{
    try {
        const causes = await cause.findMany({take:7})   
        res.status(200).json(causes)    
    } catch (error) {
        res.status(500).json(error)
    }
}

const getAllOfOneOrganization = async (req:Request,res:Response) =>{
    try {
        const causes = await cause.findMany({
            where: {
                authorId: req.params.idorg
            }
        })   
        res.status(200).json(causes)    
    } catch (error) {
        res.status(500).json(error)
    }
}

export default{
    getAllCauses,
    getOneCause,
    postOneCauses,
    getByCategory,
    acceptCause,
    archiveCause,
    deleteCause,
    getAllActive,
    getAllNonActive,
    getAllAccepted,
    getAllNonAccepted,
    updateCurrent,
    updateImg,
    getLimitToSlideShow,
    getAllOfOneOrganization
}