import {Router} from "express";
import {passwordCrypt} from "../helpers/password-crypt.js";
import {createUser} from "../repositories/auth.js";
import passport from "passport";
import {sendRegisterEmail} from "../helpers/twilio.js";

export const authRoutes = Router();

authRoutes.post('/register', async (req, res) => {
    try {
        const user = {
            ...req.body,
            password: await passwordCrypt(req.body.password)
        }

        await createUser(user);

        await sendRegisterEmail(req.body.email);

        res.redirect('/')
    } catch (e) {
        console.error('Something went wrong!', e.message)
    }
})

authRoutes.post('/login', passport.authenticate('login', {
    failureRedirect: '/?reason=invalid',
    successRedirect: '/productos'
}))