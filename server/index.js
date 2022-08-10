const express=require('express')
const cors = require('cors')
const mongoose=require('mongoose')
const AuthRoutes=require('./Routes/AuthRouter')
const app = express();
const cookieParser =require('cookie-parser')

app.listen(4000,()=>{
    console.log("server started");
});

mongoose.connect('mongodb://127.0.0.1:27017/usermanagement',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB Connetion Successfull");
}).catch(err=>{
    console.log(err.message);
});

app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET',"POST","PUT","PATCH"],
    credentials:true
}));

app.use(cookieParser());
app.use(express.json());
app.use('/',AuthRoutes);