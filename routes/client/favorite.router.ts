import express,{Router} from 'express';
import * as favoriteController from '../../controllers/client/favorite.controller';
const router = Router();


router.get("/",favoriteController.index)
router.get("/create/:idSong",favoriteController.create)


export default router;


