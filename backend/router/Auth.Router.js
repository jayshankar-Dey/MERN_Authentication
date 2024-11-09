const express = require('express')
const router = express.Router()
const passport = require('passport');
const AuthController = require('../controllers/Auth.controller');


/////user Routs
router.post('/register', AuthController.Register)
router.post('/otp/verify', AuthController.Otp_Verify)
router.post('/login', AuthController.Login)
router.post('/get/link/forgate', AuthController.Get_Forgate_password_Link)
router.post('/forgate/password', AuthController.Forgate_password)
router.post('/verify/gmail', AuthController.Verify_Gmail_auth)
    ////facebook Routes //////////////////////////////////
router.get('/auth/facebook', passport.authenticate('facebook', { session: false }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/login' }),
    function(req, res) {
        console.log("login succesfull")
            // Successful authentication, redirect home.
        res.redirect(`http://localhost:5173/${req.user.token}`);
    });

//GoogleRoutes / ////////////////////////////////////////////////
router.get('/auth/google',
    passport.authenticate('google', { session: false, scope: ['profile', "email"] }));

router.get('/auth/google/callback', passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:5173/' }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.log("login succesfull")
        res.redirect(`http://localhost:5173/${req.user.token}`);
    });

module.exports = router