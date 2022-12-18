"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Home_1 = __importDefault(require("../../pages/Home"));
const About_1 = __importDefault(require("../../pages/About"));
const Search_1 = __importDefault(require("../../pages/Search"));
const Routing = () => {
    return (<react_router_dom_1.Routes>
      <react_router_dom_1.Route path="/" element={<Home_1.default />}/>
      <react_router_dom_1.Route path="/about" element={<About_1.default />}/>
      <react_router_dom_1.Route path="/search" element={<Search_1.default />}/>
    </react_router_dom_1.Routes>);
};
exports.default = Routing;
