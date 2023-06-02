import express from "express"
import routeUser from './routes/userRoutes'
import causeRoute from "./routes/causeRoutes";
import organizationRoute  from './routes/organizations'
const app=express();


app.use(express.json())
app.use(express.urlencoded({extended:false}))
//app.use(cors())
app.use(routeUser)
<<<<<<< HEAD
=======

app.use(causeRoute)

app.use(organizationRoute)

>>>>>>> eb5e14be3ff4b7c0b7b80f2b676c837e2ef66ebb

app.listen(3001,()=>{
    console.log("server listen to port 3001")
})
const main=()=>{
    console.log("learninig prisma")
}

main()
