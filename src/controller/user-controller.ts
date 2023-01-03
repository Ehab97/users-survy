import userModel from "../models/user-schema";
import {User} from '../types/user'
import {Response,Request,NextFunction} from "express";

type RequestBody = {
    token: any;
    user:User;
    googleId:string;
};

export const userStripToken=async (req:Request,res:Response,next:NextFunction)=>{
    console.log(req.user)
    if(!req.user){
        return res.status(401).send('You must login first')
    }
    const body= req.body as RequestBody
    const token=body.token;
    const googleId=body.googleId;
    // console.log('token',token)
    // console.log('body',body)
    const stripe =await require('stripe')(process.env.STRIPE_SECRET_KEY);
    try {
        const charge=await stripe.charges.create({
            amount:500,
            currency:'usd',
            description:'$5 for 5 credits',
            source:token.id
        });

        // // @ts-ignore
        // req.user.credits += 5;
        // // @ts-ignore
        // const user = await req.user.save();
        // res.send(user);
        const userData=await userModel.findOneAndUpdate({googleId},{$inc:{'credits':5}})
        const user=await userModel.findOne({googleId})
         // console.log(user,charge)
        res.send({message:'success!!',user})
    }catch (e){
        console.log(e)
    }


}