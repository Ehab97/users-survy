import userModel from "../models/user-schema";
import { User } from "../types/user";
import { Response, Request, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import express from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import HttpError from "../models/http-Error";
import crypto from 'crypto';

type Token = {
    id: string;
}

type RequestBody = {
    token: Token;
    user: User;
    googleId: string;
    _id: string;
};

type RequestParams = {
    userId: string;
}

export const userStripToken = async (req: Request, res: Response) => {
    // console.log(req.user);
    const user = req.body.user as User;
    if (!user) {
        return res.status(401).send("You must login first");
    }
    const body = req.body as RequestBody;
    console.log(body)
    const token = body.token;
    const _id = body._id;

    const stripe = await require("stripe")(process.env.STRIPE_SECRET_KEY);
    // const stripe=stripModule(process.env.STRIPE_SECRET_KEY);
    try {
         await stripe.charges.create({
            amount: 500,
            currency: "usd",
            description: "$5 for 5 credits",
            source: token.id,
        });

         await userModel.findOneAndUpdate({  _id}, { $inc: { credits: 5 } });
        const userInfo = await userModel.findOne({  _id });

        res.send({ message: "success!!", user:userInfo });
    } catch (e) {
        console.log(e);
    }
};


export const getUserById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const params = req.params as RequestParams;
    const userId = params.userId;
    try {
        const user = await userModel.findById(userId, '-password');
        res.status(200).json({ status: 'success', data: { user: user } });
    } catch (err) {
        return next(new HttpError('Could not find user', 500));
    }
};

export const userSignin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError('Invalid inputs passed, please check your data.', 422);
    }
    const body = req.body as User;
    const { email, password } = body;
    console.log('body', body);
    let googleId=crypto.randomBytes(16).toString("hex");
    const createdUser: any = {
        email,
        password,
        credits:0,
        googleId
    }
    console.log('createdUser', createdUser);
    //check if user already exists
    const isUserExists = await userModel.findOne({ email: email });
    if (isUserExists) {
        return userLogin(req,res,next,isUserExists,password,email);
    }
    console.log('isUserExists', isUserExists);
    let hashPassword;
    try {
        hashPassword = await bcrypt.hash(password, 12);
    } catch (e) {
        const error = new HttpError(
            'Could not create user, please try again.',
            500
        );
        return next(error);
    }
    createdUser['password'] = hashPassword;
    let user;
    try {
        user = new userModel(createdUser);
        await user.save();
    } catch (err) {
        console.log(err);
        return next(new HttpError('Could not save user', 500));
    }

    try {
      const  token = await jwt.sign(
            { userId: user.id, email: user.email },
            'supersecret_dont_share',
            { expiresIn: '30d' }
            // ,(err, asyncToken) => {
            //     if (err) throw err;
            //     console.log(asyncToken);
            //     return asyncToken;
            // }
        )
        console.log('user and token', {user, token})
        res.status(201).json({
            message: "Signed Up", status: 'success',
            data: { user: user, token }
        });

    } catch (e) {
        return next(new HttpError('Could not sign up, please try again.', 500));
    }
};

const userLogin = async (req: express.Request, res: express.Response, next: express.NextFunction,isUserExists:any,password:string,email:string) => {

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, isUserExists.password);
    } catch (e) {
        return next(new HttpError('Could not login, please check your credentials and try again.', 500));
    }
    console.log(isValidPassword, password, isUserExists.password)
    if (!isValidPassword) {
        return next(new HttpError('Invalid credentials, could not log you in.', 403));
    }
    let user;
    try {
        //get user
        user = await userModel.findOne({ email: email});
        console.log('user', user, 'email', email, 'password', password);
        if (!user) {
            return next(new HttpError('Invalid credentials', 422));
        }
    } catch (err) {
        console.log(err);
        return next(new HttpError('Could not find user', 500));
    }
    let token;
    try {
        token = await jwt.sign(
            { userId: user.id, email: user.email },
            'supersecret_dont_share',
            { expiresIn: '30d' },
        )
        res.status(200).json({
            message: 'Logged In ', status: 'success',
            data: { user: user.toObject({ getters: true }), token }
        });

    } catch (e) {
        return next(new HttpError('Could not login, please try again.', 500));
    }
};
