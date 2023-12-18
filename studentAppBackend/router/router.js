const express=require("express")
const router = express.Router();
const {getReq,loginFunc}=require("../controllers/controlers");   //OBJECT DESTRUCTURING
const upload=require("../multerConfig/storageConfig");


router.post("/sendData",upload.single("file"),getReq);

router.post("/login",loginFunc);



module.exports =router;