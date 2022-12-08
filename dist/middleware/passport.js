"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
// @ts-ignore
const keys_1 = require("../../config/keys");
//define a middleware to handle passport
const passportMiddleware = passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: keys_1.googleClientID,
    clientSecret: keys_1.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken, profile, done);
    // cb(null,profile);
}));
exports.default = passportMiddleware;
