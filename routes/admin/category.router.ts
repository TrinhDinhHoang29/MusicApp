import express,{Router} from 'express';
import * as categoryController from '../../controllers/admin/category.controller';
import * as validate from  '../../validates/category.validate';
const router = Router();


router.get("/",categoryController.index)
router.get("/create",categoryController.create);
router.post("/create",validate.valiCreate,categoryController.createPost);
router.get("/detail/:id",categoryController.detail);
router.get("/edit/:id",categoryController.edit);
router.patch("/edit/:id",validate.valiCreate,categoryController.editPatch);
router.patch("/:actionUpdate/:id/:status",categoryController.actionUpdate);
router.patch("/change-multi",categoryController.changeMulti)
export default router;


