"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
// @ts-ignore
const keys_1 = require("../../config/keys");
const user_schema_1 = __importDefault(require("../models/user-schema"));
//define a middleware to handle passport
const passportMiddleware = passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: keys_1.googleClientID,
    clientSecret: keys_1.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    new user_schema_1.default({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
    }).save()
        .then((user) => {
        console.log(user);
        // done(null,user);
    })
        .catch((err) => console.log(err));
    console.log(accessToken, refreshToken, profile, done);
    // done(null,profile);
}));
exports.default = passportMiddleware;
