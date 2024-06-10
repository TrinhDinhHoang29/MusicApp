import express,{Router} from 'express';
import * as topicController from '../../controllers/admin/topics.controller';
import multer from 'multer';
const upload = multer();
import uploadCloud from "../../middlewares/uploadCloud.middleware";
import * as validate from "../../validates/topic.validate";
const router = Router();


router.get("/",topicController.index);
router.get("/create",topicController.create);
router.post("/create",upload.single('avatar'),uploadCloud,validate.valiCreate,topicController.createPost);
router.get("/detail/:id",topicController.detail);
router.get("/edit/:id",topicController.edit);
router.patch("/edit/:id",upload.single('avatar'),uploadCloud,validate.valiEdit,topicController.editPatch);
router.patch("/:actionUpdate/:id/:status",topicController.actionUpdate);
router.patch("/change-multi",topicController.changeMulti)
export default router;


