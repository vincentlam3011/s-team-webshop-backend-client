const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const userModel = require('./models/UserModel');

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    function (req, email, password, cb) {
        let type = req.body.type;
        return userModel.getByEmail(email, type)
            .then((data) => {
                if (data.length > 0) {
                    if (password === data[0].password) {
                        console.log("data 0 ");
                        console.log(data[0]);
                        return cb(null, { loginUser: data[0] }, { message: 'Logged in successfully', code: 2 });
                    }
                    else {
                        cb(null, false, { message: 'Wrong password', code: 1 });
                    }
                }
                else {
                    return cb(null, false, { message: 'Wrong username', code: 0 });
                }
            })
            .catch((error) => {
                return cb(error)
            });
    }
));

passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 's_team_webshop',
    },
    function (jwtPayload, cb) {
        return userModel.getById(jwtPayload.id)
            .then(data => {
                if (data.length > 0) {
                    user = data[0];
                    return cb(null, user, { message: 'Authorized', code: 1 });
                }
                else {
                    return cb(null, null, { message: 'Can not authorized', code: 0 });
                }
            })
            .catch(err => {
                return cb(err, null, { message: 'Can not authorized', code: 0 });
            });
    }
));