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
    //get cookie session  token
    console.log(req.session);
    console.log(req.user);
    const expires = 30 * 24 * 60 * 60 * 1000;
    res.cookie('user', req.user, { maxAge: expires });
    process.env.NODE_ENV ? res.redirect(process.env.WEBSITE_URL + '/surveys') : res.redirect(process.env.WEBSITE_URL_LOCAL + '/surveys');
});
router.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect('/');
});
router.get(`/api/current_user`, (req, res, next) => {
    console.log('req user', req.user);
    res.status(200).send({
        user: req.user,
        message: 'Success'
    });
});
exports.default = router;
