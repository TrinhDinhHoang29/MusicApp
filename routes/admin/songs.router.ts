import express,{Router} from 'express';
import * as songsController from '../../controllers/admin/songs.controller';
import multer from 'multer';
const upload = multer();
import * as uploadCloud from "../../middlewares/uploadCloud.middleware";
import * as validate from "../../validates/song.validate";
const router = Router();


router.get("/",songsController.index);
router.get("/create",songsController.create);
// ,upload.single('avatar'),uploadCloud,validate.valiCreate
router.post("/create",
    upload.fields([{name:"avatar",maxCount:1},{name:"audio",maxCount:1}]),
    uploadCloud.uploadFields,
    validate.valiCreate,
    songsController.createPost);
router.get("/detail/:id",songsController.detail);
router.get("/edit/:id",songsController.edit);
router.patch("/edit/:id",
    upload.fields([{name:"avatar",maxCount:1},{name:"audio",maxCount:1}]),
    uploadCloud.uploadFields,
    validate.valiEdit,
    songsController.editPatch);
router.patch("/:actionUpdate/:id/:status",songsController.actionUpdate);
router.patch("/change-multi",songsController.changeMulti)
export default router;


