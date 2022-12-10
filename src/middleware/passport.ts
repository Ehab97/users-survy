import passport, {Profile} from 'passport';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';
// @ts-ignore
import {googleClientID,googleClientSecret} from '../../config/keys';
import userModel from '../models/user-schema';
//define a middleware to handle passport

const passportMiddleware= passport.use(new Strategy({
        clientID:googleClientID,
        clientSecret:googleClientSecret,
        callbackURL:'/auth/google/callback'
    },
     (accessToken:string, refreshToken:string, profile:Profile, done:VerifyCallback)=> {
         new userModel({
             googleId:profile.id,
             name:profile.displayName,
             email:profile.emails![0].value,

         }).save()
            .then((user)=>{
                console.log(user);
                // done(null,user);
            })
            .catch((err)=>console.log(err));
         console.log(accessToken,refreshToken,profile,done);

        // done(null,profile);
    }
));

export default passportMiddleware;





