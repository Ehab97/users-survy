import express from 'express';
import {userStripToken} from "../controller/user-controller";
import {checkLogin} from "../middleware/loginAuth";
const router = express.Router();

router.post(`/api/stripe`,checkLogin,userStripToken)

export default router;