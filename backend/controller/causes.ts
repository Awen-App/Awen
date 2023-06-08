import { PrismaClient } from "@prisma/client";
import {Request,Response} from 'express'
const prisma =new PrismaClient();
const cause=prisma.cause

//this functions gets all causes
const getAllCauses =async (req:Request,res:Response) =>{
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
// this function updates one cause 
const updateCause=async (req:Request,res:Response) => {
    try {
        const updated = await cause.update({where:{
            causeId:req.params.id
        },data:{}})
        res.status(200).send("updated")
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
export default{
    getAllCauses,
    getOneCause,
    postOneCauses,
    getByCategory,
    updateCause,
    deleteCause
}