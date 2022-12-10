"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    googleId: { type: String, required: true, unique: true },
    image: { type: String }
});
const userModel = (0, mongoose_1.model)('User', userSchema);
exports.default = userModel;
