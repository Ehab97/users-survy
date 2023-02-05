import express from 'express';
import {userStripToken} from "../controller/user-controller";
import {checkLogin} from "../middleware/userAuth";
import {checkAuth} from "../middleware/check-auth";
const router = express.Router();
//checkLogin or checkAuth
router.post(`/api/stripe`,checkAuth,userStripToken)

export default router;