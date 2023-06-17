import express from "express"
import cors from 'cors'
import routeUser from './routes/userRoutes'
import causeRoute from "./routes/causeRoutes";
import organizationRoute  from './routes/organizations'
import donationRoute from './routes/donationRoutes'
import conversationRoute from './routes/conversationRoutes'
import messageRoute from './routes/messageRoute'
import http from 'http';
import {Server} from 'socket.io';
const app=express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
const server=http.createServer(app)
// const socketServer = http.createServer();
const io=new Server(server,{
    cors:{
        origin:"*"
    }
})

app.use(routeUser)

app.use(causeRoute)

app.use(organizationRoute)

app.use(donationRoute)

app.use(conversationRoute)

app.use(messageRoute)


io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join", (room) => {
      console.log(room)
      socket.join(room);
      console.log(`User with ID: ${socket.id} joined room: ${room}`);
    });
  
    socket.on("send", (data) => {
      console.log(data)
      socket.to(data.conversationId).emit("receive", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
server.listen(3001,()=>{
    console.log("server listen to port 3001")
})
io.listen(4001);
const main=()=>{
    console.log("prisma")
}

main()
