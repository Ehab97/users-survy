import express from 'express';
import passport from '../middleware/passport';
const router = express.Router();

router.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}));

router.get(
    `/auth/google/callback`,
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/surveys');
    }
);

router.get("/api/logout", (req:any, res) => {
    req.logout();
    res.redirect('/');
});

router.get(`/api/current_user`,(req, res, next)=>{
    console.log('req user',req.user);
    res.status(200).send({
        user:req.user,
        message:'Success'
    })
})

export default router;