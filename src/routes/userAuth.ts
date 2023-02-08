import express from "express";
// import passport from "../middleware/passport";
import {getUserById, userSignin} from "../controller/user-controller";
import { check } from "express-validator";

const router = express.Router();

// router.get(
//     "/auth/google",
//     passport.authenticate("google", {
//         scope: ["profile", "email"],
//     })
// );
//
// router.get(`/auth/google/callback`, passport.authenticate("google"), (req, res) => {
//     //get cookie session  token
//     console.log("get cookie session  token");
//     console.log(req.session);
//     console.log(req.user);
//     const expires = 30 * 24 * 60 * 60 * 1000;
//     res.cookie("user", req.user, { maxAge: expires });
//     process.env.NODE_ENV
//         ? res.redirect(process.env.WEBSITE_URL + "/surveys")
//         : res.redirect(process.env.WEBSITE_URL_LOCAL + "/surveys");
// });
//
// router.get("/api/logout", (req: any, res) => {
//     req.logout();
//     res.redirect("/");
// });
//
// router.get(`/api/current_user`, (req, res, next) => {
//     console.log("req user", req.user);
//     res.status(200).send({
//         user: req.user,
//         message: "Success",
//     });
// });

//custom signing
router.post("/api/signin", [check("email").normalizeEmail().isEmail(), check("password").isLength({ min: 8 })], userSignin);
//get user by id
router.get("/api/user/:userId", getUserById);
export default router;
