import express,{Router} from 'express';
import * as songsController from '../../controllers/client/songs.controller';
const router = Router();


router.get("/:id",songsController.index)


export default router;


