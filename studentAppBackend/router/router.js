const express=require("express")
const router = express.Router();
const {getReq,loginFunc}=require("../controllers/controlers");   //OBJECT DESTRUCTURING
const upload=require("../multerConfig/storageConfig");
const {tokenCheck}=require("../controllers/controlers");

router.post("/sendData",upload.single("file"),getReq);

router.post("/login",loginFunc);

router.post("/token",tokenCheck);
// router.post("/g",(req,res)=>{
//     res.status(200).cookie("id4","123").json("osm data")
// });



module.exports =router;