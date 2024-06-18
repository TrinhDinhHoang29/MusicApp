import express,{Router} from 'express';
import * as authController from '../../controllers/client/auth.controller';
const router = Router();
import * as validate from '../../validates/user.validate';


router.get("/login",authController.login);
router.patch("/login",validate.valiLogin,authController.loginPatch);

router.get("/register",authController.register);
router.post("/register",validate.valiCreate,authController.registerPost);


export default router;


