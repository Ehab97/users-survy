import passport, {Profile} from 'passport';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';
// @ts-ignore
import {googleClientID,googleClientSecret} from '../../config/keys';

//define a middleware to handle passport

const passportMiddleware= passport.use(new Strategy({
        clientID:googleClientID,
        clientSecret:googleClientSecret,
        callbackURL:'/auth/google/callback'
    },
    (accessToken:string, refreshToken:string, profile:Profile, done:VerifyCallback)=> {
        console.log(accessToken,refreshToken,profile,done);
        // cb(null,profile);
    }
));

export default passportMiddleware;





