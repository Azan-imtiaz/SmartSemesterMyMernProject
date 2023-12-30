
const mongoose=require("mongoose");
const DB = process.env.DATABASE;

mongoose.connect(DB,{
    serverSelectionTimeoutMS: 5000
}).then(()=>{
    console.log("Succesfuly connected to database");

}).catch((err)=>{
    console.log(`Error in conected to database ${err}`)
})