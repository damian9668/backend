import passport from "passport";
import {Strategy} from "passport-local";
import {searchIfExist} from "../repositories/auth.js";
import {comparePassword} from "../helpers/password-crypt.js";
import {Users} from "../models/users.js";

export const initPassport = () => {
    passport.use('login', new Strategy(
        async (username, password, done) => {

            const user = await searchIfExist({
                email: username
            })

            if(!user || !comparePassword(password, user.password)) {
                console.log('User not found ' + username);
                return done(null, false);
            }

            return done(null, user);
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser((id, done) => {
        Users.findById(id, done);
    });
}