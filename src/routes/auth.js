import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import express from 'express';
import { ensureAuth } from '../middleware/auth.js';

const router = express.Router();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production'
    ? 'https://cse341-project-2-api.onrender.com/auth/google/callback'
    : 'http://localhost:8080/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Add this route for Swagger OAuth integration
router.get('/swagger-login', (req, res) => {
  const redirectUrl = req.query.redirect_uri || '/api-docs';
  req.session.swaggerRedirect = redirectUrl;
  res.redirect('/auth/google');
});

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/auth/failure'
}), (req, res) => {
  // Check if this is from Swagger
  if (req.session.swaggerRedirect) {
    const redirect = req.session.swaggerRedirect;
    delete req.session.swaggerRedirect;
    res.redirect(redirect);
  } else {
    res.redirect('/auth/protected');
  }
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

router.get('/protected', ensureAuth, (req, res) => {
  res.json({ 
    message: 'Authentication successful! You are logged in.',
    user: req.user.displayName || req.user.name || 'Authenticated User',
    timestamp: new Date().toISOString()
  });
});

export default router;