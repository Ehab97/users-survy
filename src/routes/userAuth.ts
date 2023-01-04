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
        //get cookie session  token
        console.log(req.session)
        console.log(req.user)
        const expires = 30*24 * 60 * 60 * 1000;
        res.cookie('user',req.user,{maxAge:expires});
        process.env.NODE_ENV?res.redirect(process.env.WEBSITE_URL+'/surveys'):res.redirect(process.env.WEBSITE_URL_LOCAL+'/surveys')
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