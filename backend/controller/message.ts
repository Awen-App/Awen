import { PrismaClient } from "@prisma/client";
import {Request,Response} from 'express'
const prisma =new PrismaClient();


const getAllMessage=async(req:Request,res:Response)=>{
    try{
        const messages=await prisma.message.findMany();
        res.status(200).json(messages)
    }catch(err){
        console.log(err)
        res.send(err)
    }
}
const addMessage=async(req:Request,res:Response)=>{
    try{
        await prisma.message.create({
            data:{
                sender:req.body.sender,
                content:req.body.content,
                conversationId:req.body.conversationId
            }
        })
        res.json('created')
    }catch(err){
        res.json(err)
    }
}

const getConversation=async(req:Request,res:Response)=>{
    
    try{
        const conversation=await prisma.message.findMany({
            where:{
                conversationId:req.params.id
            }
        })
        res.status(200).json(conversation)
    }catch(err){
        console.log(err)
        res.json(err)
    }
}
export default {
    getAllMessage,
    addMessage,
    getConversation
}