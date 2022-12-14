
import passport from 'passport';
import {Strategy} from 'passport-google-oauth20';
// @ts-ignore
import {googleClientID,googleClientSecret,isDev} from '../../config/keys';
import {deserializeUser, serializeUser, verifyUser} from "../controller/passport-controller";


passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

passport.use(new Strategy({
        clientID:googleClientID,
        clientSecret:googleClientSecret,
        callbackURL:isDev?'/auth/google/callback':process.env.BASE_URL+'auth/google/callback'
    },
    verifyUser
));

export default passport;




