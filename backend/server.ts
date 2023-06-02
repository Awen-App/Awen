import express from "express"
import routeUser from './routes/userRoutes'
import organizationRoute  from './routes/organizations'
const app=express();


app.use(express.json())
app.use(express.urlencoded({extended:false}))
// app.use(cors())
app.use(routeUser)
app.use(organizationRoute)


// app.post('/',async (req :Request,res:Response)=>{
//     await prisma.user.create({
        
//             data: {
//             username: 'Alice',
//             email: 'alice@prisma.io',
//             password:"alice123",
//             posts: {
//                 create: { title: 'Hello World' },
//               },
//             },
//           },
//     );
//     res.json('created')
// })

app.listen(3001,()=>{
    console.log("server listen to port 3001")
})
const main=()=>{
    console.log("learninig prisma")
}

main()
