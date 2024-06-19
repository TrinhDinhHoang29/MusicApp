
import express,{Router} from 'express';
import * as otpController from '../../controllers/client/otp.controller';

const router = Router();


router.post("/create",otpController.create)


export default router;


