import express,{Router} from 'express';
import * as songsController from '../../controllers/client/songs.controller';
const router = Router();


router.get("/:slug",songsController.index)
router.get("/detail/:slug",songsController.detail);


export default router;


