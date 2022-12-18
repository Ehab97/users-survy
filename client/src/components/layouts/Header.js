"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
require("../../styles/styles.scss");
const Header = () => {
    return (<nav>
        <ul>
          <li><react_router_dom_1.NavLink className={(navData) => navData.isActive ? 'active' : ''} to="/">Home</react_router_dom_1.NavLink></li>
          <li><react_router_dom_1.NavLink className={(navData) => navData.isActive ? 'active' : ''} to="/about">About</react_router_dom_1.NavLink></li>
          <li><react_router_dom_1.NavLink className={(navData) => navData.isActive ? 'active' : ''} to="/search">search</react_router_dom_1.NavLink></li>
        </ul>
    </nav>);
};
exports.default = Header;
