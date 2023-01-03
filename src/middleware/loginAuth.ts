import {NextFunction, Request, Response} from "express";

export const checkLogin=(req:Request,res:Response,next:NextFunction)=>{
    if(!req.user){
        return res.status(401).send({error:'You must login first'})
    }
    next();
}