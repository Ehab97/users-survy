"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeUser = exports.serializeUser = exports.verifyUser = void 0;
const user_schema_1 = __importDefault(require("../models/user-schema"));
const verifyUser = (accessToken, refreshToken, profile, done) => {
    //check if user exists
    user_schema_1.default.findOne({ googleId: profile.id })
        .then((currentUser) => {
        if (currentUser) {
            console.log('user is', currentUser);
            done(null, currentUser);
        }
        else {
            new user_schema_1.default({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                image: profile.photos[0].value
            }).save()
                .then((user) => {
                console.log(user);
                done(null, user);
            })
                .catch((err) => console.log(err));
        }
    });
};
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
