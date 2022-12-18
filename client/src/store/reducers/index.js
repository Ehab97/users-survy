"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const repositoriesReducer_1 = __importDefault(require("./repositoriesReducer"));
const reducers = (0, redux_1.combineReducers)({
    repositories: repositoriesReducer_1.default
});
exports.default = reducers;
