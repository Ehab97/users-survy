"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Layout_1 = __importDefault(require("../components/layouts/Layout"));
const Home = () => {
    return (<Layout_1.default>
        <h3>
          Hello World this main page
        </h3>
        
      </Layout_1.default>);
};
exports.default = Home;
