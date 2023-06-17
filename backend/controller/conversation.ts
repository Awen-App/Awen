import { PrismaClient } from "@prisma/client";
import {Request,Response} from 'express'
const prisma =new PrismaClient();


const getConversations=async(req:Request,res:Response)=>{
    try{
        const conversations=await prisma.conversation.findMany()
        res.status(200).json(conversations)
    }catch(err){
        console.log(err)
        res.send(err)
    }
}

const getRoom=async(req:Request,res:Response)=>{
    try{
        const conversation=await prisma.conversation.findMany({
            where:{
                orgName:req.params.org,
                userEmail:req.params.user
            }
        })
        res.status(200).json(conversation)

    }catch(err){
        console.log(err)
        res.json(err)
    }
}
const startConversation=async(req:Request,res:Response)=>{
    try{
        await prisma.conversation.create({
            data:{
                orgName:req.body.orgName,
                userEmail:req.body.userEmail,
                orgId:req.body.orgId
            }
        })
        res.status(200).json("created")
    }catch(err){
        console.log(err)
        res.json(err)
    }
}
const addConversation=async(req:Request,res:Response)=>{
    try{
        await prisma.conversation.create({
            data:{
                orgName:req.body.orgName,
                userEmail:req.body.userEmail,
                orgId:req.body.orgId,
                messages:{
                    create:[
                        {
                            sender:req.body.sender,
                            content:req.body.content
                        }
                    ]
                }
            }
        })
        res.status(200).json("created")

    }catch(err){
        console.log(err)
        res.json(err)
    }
}
const userConversation=async(req:Request,res:Response)=>{
    try{
        const conversation=await prisma.conversation.findMany({
            where:{
                userEmail:req.params.user
            }
        })
        res.status(200).json(conversation)

    }catch(err){
        console.log(err)
        res.json(err)
    }
}
const orgConversation=async(req:Request,res:Response)=>{
    try{
        const conversation=await prisma.conversation.findMany({
            where:{
                orgName:req.params.orgName
            }
        })
        res.status(200).json(conversation)

    }catch(err){
        console.log(err)
        res.json(err)
    }
}
export default {
    getConversations,
    getRoom,
    addConversation,
    startConversation,
    userConversation,
    orgConversation
}