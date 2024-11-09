//
const FacebookStrategy = require('passport-facebook').Strategy
const passport = require('passport')
const Users = require('../model/user.model');
const Facebook_Auth = async() => {
    passport.use(new FacebookStrategy({
            clientID: process.env.PACEBOOK_APP_ID,
            clientSecret: process.env.PACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:8800/api/v1/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email']
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
                    return cb(null, { user, token });
                } else {
                    const password = Math.floor(Math.random() * 900000) + profile.id
                    const user = await Users.create({
                        Id: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: password.toString(),
                        profile: {
                            url: profile.photos[0].value
                        },
                        is_Facebook: true,
                        is_verify: true
                    })
                    const token = await user.generateToken("15d")
                    return cb(null, { user, token });
                }

            } catch (error) {
                console.log(error)
            }
        }
    ));
}

module.exports = Facebook_Auth