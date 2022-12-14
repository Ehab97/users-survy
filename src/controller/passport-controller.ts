import {Profile} from "passport";
import {VerifyCallback} from "passport-google-oauth20";
import userModel from "../models/user-schema";

export const verifyUser= (accessToken:string, refreshToken:string, profile:Profile, done:VerifyCallback)=> {
    //check if user exists
    userModel.findOne({googleId:profile.id})
        .then((currentUser)=>{
            if(currentUser){
                console.log('user is',currentUser);
                done(null,currentUser);
            }else {
                new userModel({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails![0].value,
                    image: profile.photos![0].value
                }).save()
                    .then((user) => {
                        console.log(user);
                        done(null, user);
                    })
                    .catch((err) => console.log(err));
            }
        })
}

export const serializeUser= (user:any,done:Function)=> {
    console.log('serialize user',user);
    return  done(null, user);
};
export const deserializeUser= (id:string,done:Function)=>{
    console.log('deserialize user',id);
    userModel.findById(id).then(user => {
        console.log('deserialize user',user);
       return  done(null, user);
    });
};