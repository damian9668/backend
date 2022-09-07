const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./mongo");
const sgMail = require("@sendgrid/mail");
const bCrypt = require("bcrypt");
const {loggerInfo} = require("./logger")

const emailSender = 'damian.ullmann@hotmail.com'
const apiKey = process.env.twilio_email
function serverPassport(){
    passport.use('login', new LocalStrategy(
        (username, password, done) => {
            User.findOne({ username }, (err, user) => {
                if (err)
                    return done(err);
                if (!user) {
                    console.log('User not found ' + username);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));

    passport.use('signup', new LocalStrategy({
        passReqToCallback: true
    }, (req, username, password, done) => {
        User.findOne({ 'username': username }, (err, user) => {
            if (err) {
                loggerInfo.info(err);
                return done(err);
            }
            if (user) {
                return done(null, false);
            }

            const newUser = {
                username: username,
                password: createHash(password),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                age: req.body.age,
                phone: req.body.phone,
                prefix: req.body.prefix,
                urlPhoto:req.body.url

            }

            User.create(newUser, (err, userWithId) => {
                if (err) {
                    loggerInfo.info(err);
                    return done(err);
                }

                const sgMail = require('@sendgrid/mail')
                sgMail.setApiKey(apiKey)
                const msg = {
                    to: emailSender, // Change to your recipient
                    from: emailSender, // Change to your verified sender
                    subject: 'New User',
                    text: `Email: ${username}\nNombre: ${req.body.firstName} ${req.body.lastName}\nDireccion: ${req.body.address}\nEdad: ${req.body.age}\nTelefono: ${req.body.prefix} ${req.body.phone}\nAvatar: ${req.body.url}`
                }
                sgMail
                    .send(msg)
                    .then(() => {
                        console.log('Email sent')
                    })
                    .catch((error) => {
                        console.error(error)
                    })

                return done(null, userWithId);
            })
        })
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, done);
    });
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = {
    serverPassport
}