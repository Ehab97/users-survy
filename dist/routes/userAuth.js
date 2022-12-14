"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("../middleware/passport"));
const router = express_1.default.Router();
router.get('/auth/google', passport_1.default.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get(`/auth/google/callback`, passport_1.default.authenticate('google'), (req, res) => {
    res.redirect('/api/current_user');
});
router.get("/api/logout", (req, res) => {
    req === null || req === void 0 ? void 0 : req.logout();
    res.send(req.user);
});
router.get(`/api/current_user`, (req, res, next) => {
    console.log('req user', req.user, req.session);
    res.send({
        user: req.user,
        message: 'hello world'
    });
});
exports.default = router;
