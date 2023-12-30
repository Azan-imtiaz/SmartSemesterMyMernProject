
const express=require("express")
const router = express.Router();
const {deleteResultItem,getReq,loginFunc,getDataForProfile,tokenCheck,updateData,storeResult,getResult,updateResultItem,getResultItem}=require("../controllers/controlers");   //OBJECT DESTRUCTURING

const upload=require("../multerConfig/storageConfig");

router.post("/sendData",upload.single("file"),getReq);

router.post("/login",loginFunc);

router.post("/token",tokenCheck);
router.post("/AddResult",storeResult);

router.post("/getProfileData",getDataForProfile)
router.post("/updateData",upload.single("fileName"),updateData)
router.post("/getResult",getResult);
router.post("/updateResultItem",updateResultItem);
router.post("/getResultItem",getResultItem);
router.post("/deleteResultItem",deleteResultItem);


module.exports =router;