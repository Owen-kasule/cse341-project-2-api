import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import express from 'express';

const router = express.Router();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Optionally, save/find user in DB here
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/auth/failure'
}), (req, res) => {
  res.redirect('/protected');
});

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.send(err);
    res.redirect('/');
  });
});

router.get('/failure', (req, res) => {
  res.send('Failed to authenticate.');
});

export default router;