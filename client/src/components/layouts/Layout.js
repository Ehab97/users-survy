"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Header_1 = __importDefault(require("./Header"));
const Footer_1 = __importDefault(require("./Footer"));
const Layout = ({ children }) => {
    return (<>
    <Header_1.default />
      <main>
        {children}
      </main>
    <Footer_1.default />
  </>);
};
exports.default = Layout;
