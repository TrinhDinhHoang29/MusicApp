import express,{Router} from 'express';
import * as songsController from '../../controllers/client/songs.controller';
import * as authMiddleware from '../../middlewares/auth.middleware';
const router = Router();


router.get("/:slug",songsController.index)
router.get("/detail/:slug",songsController.detail);
router.get("/like/:idSong",authMiddleware.existsUserInfo,songsController.like)
router.patch("/views/:slug",songsController.views);


export default router;


