import express from 'express';
import passport from '../middleware/passport';
const router = express.Router();

router.get('/auth/google',passport.authenticate('google',{
    scope:['profile','email']
}));

router.get(`/auth/google/callback`,
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/api/current_user');
});

router.get("/api/logout", (req:any, res) => {
    req?.logout();
    res.send(req.user);
});

router.get(`/api/current_user`,(req, res, next)=>{
    console.log('req user',req.user,req.session);
    res.send({
        user:req.user,
        message:'hello world'
    })
})


export default router;