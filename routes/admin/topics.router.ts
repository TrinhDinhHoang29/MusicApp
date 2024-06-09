import express,{Router} from 'express';
import * as topicController from '../../controllers/admin/topics.controller';
import multer from 'multer';
const upload = multer();
import uploadCloud from "../../middlewares/uploadCloud.middleware";
const router = Router();


router.get("/",topicController.index)
router.get("/create",topicController.create)
router.post("/create",upload.single('avatar'),uploadCloud,topicController.createPost);


export default router;


