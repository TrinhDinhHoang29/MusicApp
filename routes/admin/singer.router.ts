import express,{Router} from 'express';
import * as singerController from '../../controllers/admin/singer.controller';
import multer from 'multer';
const upload = multer();
import uploadCloud from "../../middlewares/uploadCloud.middleware";

const router = Router();


router.get("/",singerController.index);
router.get("/create",singerController.create);
router.post("/create",upload.single('avatar'),uploadCloud,singerController.createPost);
router.get("/detail/:id",singerController.detail);
router.get("/edit/:id",singerController.edit);
router.patch("/edit/:id",upload.single('avatar'),uploadCloud,singerController.editPatch);
router.patch("/:actionUpdate/:id/:status",singerController.actionUpdate);
router.patch("/change-multi",singerController.changeMulti)

export default router;


