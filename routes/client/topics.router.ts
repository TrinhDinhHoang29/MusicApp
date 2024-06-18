import express,{Router} from 'express';
import * as topicController from '../../controllers/client/topics.controller';
const router = Router();


router.get("/",topicController.index)

router.get("/detail/:slug",topicController.detail)

export default router;


