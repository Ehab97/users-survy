"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Layout_1 = __importDefault(require("../components/layouts/Layout"));
const About = () => {
    return (<Layout_1.default>
        <h3>
          Hello World
        </h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, mollitia. Veniam vitae maiores, molestias quibusdam facere, mollitia neque recusandae corrupti perspiciatis ducimus tenetur amet maxime minus autem facilis quae. Minus.</p>
      </Layout_1.default>);
};
exports.default = About;
