"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAction = void 0;
const react_redux_1 = require("react-redux");
const redux_1 = require("redux");
const store_1 = require("../store");
const useAction = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    return (0, redux_1.bindActionCreators)(store_1.actionCreators, dispatch);
};
exports.useAction = useAction;
