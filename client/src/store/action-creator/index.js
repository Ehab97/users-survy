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
exports.searchRepositories = void 0;
const axios_1 = __importDefault(require("axios"));
const action_types_1 = require("../action-types");
const searchRepositories = (term) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        dispatch({
            type: action_types_1.ActionType.SEARCH_REPOSITORIES,
        });
        try {
            const { data } = yield axios_1.default.get('https://registry.npmjs.org/-/v1/search', {
                params: {
                    text: term,
                },
            });
            const names = data.objects.map((result) => {
                return result.package.name;
            });
            dispatch({
                type: action_types_1.ActionType.SEARCH_REPOSITORIES_SUCCESS,
                payload: names,
            });
        }
        catch (err) {
            dispatch({
                type: action_types_1.ActionType.SEARCH_REPOSITORIES_ERROR,
                payload: err.message,
            });
        }
    });
};
exports.searchRepositories = searchRepositories;
