import express from "express"
import cors from 'cors'
import routeUser from './routes/userRoutes'
import causeRoute from "./routes/causeRoutes";
import organizationRoute  from './routes/organizations'
import donationRoute from './routes/donationRoutes'
import http from 'http';
import {Server} from 'socket.io';
const app=express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

app.use(routeUser)

app.use(causeRoute)

app.use(organizationRoute)

app.use(donationRoute)

io.on('connection', (socket) => {
    console.log("a user connected "+socket.id)
    socket.on('join_conversation',data=>{
        socket.join(data)
    })
    socket.on("disconnect",()=>{
        console.log('user disconnected '+ socket.id)
    })
  });
server.listen(3001,()=>{
    console.log("server listen to port 3001")
})
const main=()=>{
    console.log("prisma")
}

main()
