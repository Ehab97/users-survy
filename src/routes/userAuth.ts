import { Router } from 'express';
import passport from '../middleware/passport';
const router = Router();

router.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}));

router.get(`/auth/google/callback`,passport.authenticate('google'));


export default router;