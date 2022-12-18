"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActions = void 0;
const redux_1 = require("redux");
const react_redux_1 = require("react-redux");
const react_1 = require("react");
function useActions(actions, deps) {
    const dispatch = (0, react_redux_1.useDispatch)();
    return (0, react_1.useMemo)(() => {
        if (Array.isArray(actions)) {
            return actions.map(a => (0, redux_1.bindActionCreators)(a, dispatch));
        }
        return (0, redux_1.bindActionCreators)(actions, dispatch);
    }, deps ? [dispatch, ...deps] : [dispatch]);
}
exports.useActions = useActions;
