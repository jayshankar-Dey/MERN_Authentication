const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport');
const Users = require('../model/user.model');

const Google_Auth = async(req, res) => {
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8800/api/v1/auth/google/callback"
        },
        async(accessToken, refreshToken, profile, cb) => {
            try {
                const user = await Users.findOne({
                    $or: [
                        { Id: profile.id },
                        { email: profile.emails[0].value }
                    ]

                })
                if (user) {
                    const token = await user.generateToken("15d")
                    return cb(null, { user, token })
                } else {
                    const password = Math.floor(Math.random() * 900000) + profile.id
                    const user = await Users.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: password.toString(),
                        profile: {
                            url: profile.photos[0].value
                        },
                        is_google: true,
                        is_verify: true
                    })
                    const token = await user.generateToken("15d")
                    return cb(null, { user, token, password })
                }
            } catch (error) {
                return cb(error);
            }
        }
    ));

}

module.exports = Google_Auth