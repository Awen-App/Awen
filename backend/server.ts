import express from "express"
import routeUser from './routes/userRoutes'
import causeRoute from "./routes/causeRoutes";
import organizationRoute  from './routes/organizations'
const app=express();


app.use(express.json())
app.use(express.urlencoded({extended:false}))
//app.use(cors())
app.use(routeUser)

app.use(causeRoute)

app.use(organizationRoute)


app.listen(3001,()=>{
    console.log("server listen to port 3001")
})
const main=()=>{
    console.log("learninig prisma")
}

main()
