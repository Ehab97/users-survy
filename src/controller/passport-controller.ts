import {Profile} from "passport";
import {VerifyCallback} from "passport-google-oauth20";
import userModel from "../models/user-schema";

export const verifyUser= async (accessToken:string, refreshToken:string, profile:Profile, done:VerifyCallback)=> {
    try {
        const existingUser = await userModel.findOne({googleId:profile.id});
        if(existingUser){
            console.log('user is',existingUser);
            return  done(null,existingUser);
        }
        //create new user
        try {
            const newUser = await new userModel({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails![0].value,
                image: profile.photos![0].value
            }).save();
            console.log('new user,',newUser);
            done(null,newUser);
        }catch (e) {
            console.log('in creating user',e);
        }
        //end create new user

    }catch (e) {
        console.log('error in register user',e);
    }
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