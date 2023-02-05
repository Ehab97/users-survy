import express from 'express';
import jwt from 'jsonwebtoken';
import HttpError from "../models/http-Error";

export const checkAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.method == 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('Authentication failed');
        }
        const decodedToken = jwt.verify(token, 'supersecret_dont_share');
        console.log('decodedToken',decodedToken)
        req.body.user = decodedToken;
        next();
    } catch (e) {
        console.log('err', e)
        return next(new HttpError('Not authenticated', 403));
    }

}