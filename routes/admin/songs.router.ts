import express,{Router} from 'express';
import * as songsController from '../../controllers/admin/songs.controller';
import multer from 'multer';
const upload = multer();
import * as uploadCloud from "../../middlewares/uploadCloud.middleware";
import * as validate from "../../validates/topic.validate";
const router = Router();


// router.get("/",topicController.index);
router.get("/create",songsController.create);
// ,upload.single('avatar'),uploadCloud,validate.valiCreate
router.post("/create",upload.fields([{name:"avatar",maxCount:1},{name:"audio",maxCount:1}]),uploadCloud.uploadFields,songsController.createPost);
// router.get("/detail/:id",topicController.detail);
// router.get("/edit/:id",topicController.edit);
// router.patch("/edit/:id",upload.single('avatar'),uploadCloud,validate.valiEdit,topicController.editPatch);
// router.patch("/:actionUpdate/:id/:status",topicController.actionUpdate);
// router.patch("/change-multi",topicController.changeMulti)
export default router;


