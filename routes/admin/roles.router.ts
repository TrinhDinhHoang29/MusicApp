import express,{Router} from 'express';
import * as rolesController from '../../controllers/admin/roles.controller';
const router = Router();



router.get("/",rolesController.index)


export default router;


