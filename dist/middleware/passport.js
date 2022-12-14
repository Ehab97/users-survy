"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
// @ts-ignore
const keys_1 = require("../../config/keys");
const passport_controller_1 = require("../controller/passport-controller");
passport_1.default.serializeUser(passport_controller_1.serializeUser);
passport_1.default.deserializeUser(passport_controller_1.deserializeUser);
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: keys_1.googleClientID,
    clientSecret: keys_1.googleClientSecret,
    callbackURL: keys_1.isDev ? '/auth/google/callback' : process.env.BASE_URL + 'auth/google/callback'
}, passport_controller_1.verifyUser));
exports.default = passport_1.default;
