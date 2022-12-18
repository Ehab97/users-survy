"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Layout_1 = __importDefault(require("../components/layouts/Layout"));
const RespositriesList_1 = require("../components/RespositriesList");
const Search = () => {
    return (<Layout_1.default>
        <RespositriesList_1.RepositoriesList />
      </Layout_1.default>);
};
exports.default = Search;
