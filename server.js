const app=require("./app");
const mongoose=require('mongoose');
const dotenv=require("dotenv");
// const connectDatabase=require("./config/database")
MONGO_URL="mongodb+srv://harshita123:harshita00@cluster0.jpmzgxy.mongodb.net/?retryWrites=true&w=majority"


const cors=require("cors");
const path = require("path");
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // Set credentials to true
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
app.use(cors({
    origin:"http://localhost:3000"
}))

mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(()=>{console.log("connected successfully to mongodb")});

//config
dotenv.config({path:"./config.env"});

//Handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`shutting down the server due to uncaught expression`);
    process.exit(1);
})



const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})


//unhandled Promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`);
    console.log(`shutting down the server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    })
})