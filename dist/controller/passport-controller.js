"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeUser = exports.serializeUser = exports.verifyUser = void 0;
const user_schema_1 = __importDefault(require("../models/user-schema"));
const verifyUser = (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_schema_1.default.findOne({ googleId: profile.id });
        if (existingUser) {
            console.log('user is', existingUser);
            return done(null, existingUser);
        }
        //create new user
        try {
            const newUser = yield new user_schema_1.default({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                image: profile.photos[0].value
            }).save();
            console.log('new user,', newUser);
            done(null, newUser);
        }
        catch (e) {
            console.log('in creating user', e);
        }
        //end create new user
    }
    catch (e) {
        console.log('error in register user', e);
    }
});
exports.verifyUser = verifyUser;
const serializeUser = (user, done) => {
    console.log('serialize user', user);
    return done(null, user);
};
exports.serializeUser = serializeUser;
const deserializeUser = (id, done) => {
    console.log('deserialize user', id);
    user_schema_1.default.findById(id).then(user => {
        console.log('deserialize user', user);
        return done(null, user);
    });
};
exports.deserializeUser = deserializeUser;
