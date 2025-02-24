const mongoose = require("mongoose");

module.exports = async()=>{
const mongoUrl  = "mongodb+srv://Ramesh:Ramesh2001@cluster0.ssujs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
try{
    
   const connect = await mongoose.connect(mongoUrl,{useUnifiedTopology:true,useNewUrlParser:true,
    });
    console.log("MongoDb Connected",connect.connection.host);
}catch(error){
    console.log(error);
    process.exit(1);
}
}