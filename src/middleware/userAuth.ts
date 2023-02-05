import {NextFunction, Request, Response} from "express";
import {User} from "../types/user";

export const checkLogin=(req:Request,res:Response,next:NextFunction)=>{
    if(!req.user){
        return res.status(401).send({error:'You must login first'})
    }
    next();
}

export const checkCredits=(req:Request,res:Response,next:NextFunction)=>{
    let user= req.body.user as User;
    if(user.credits <1){
        return res.status(403).send({error:"You don't have enough credits"})
    }
    next();
}