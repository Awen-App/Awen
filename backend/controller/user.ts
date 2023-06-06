import { PrismaClient } from "@prisma/client";
import {Request,Response} from 'express'
const prisma =new PrismaClient();

const getAllUsers=async(req:Request,res:Response)=>{
    try{
        const users=await prisma.user.findMany();
        res.status(200).json(users)
    }catch(err){
        console.log(err)
        res.send(err)
    }
}

const addUser=async(req:Request,res:Response)=>{
    try {
        await prisma.user.create({
            data:{
                email:req.body.email
            }
        })
        res.json("created")
    } catch (error) {
        res.json(error)
    }
}


export default {
    getAllUsers,
    addUser
}