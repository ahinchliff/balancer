const passport = require('passport');
const LocalStrategy   = require('passport-local').Strategy;
const User = require('mongoose').model('users');
const keys = require('../config/keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
      done(err, user);
  });
});

// SIGNUP
passport.use('signup', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, email, password, done) => {

    const existingUser = await User.findOne({ 'email': email });

    if (existingUser) {
      return done(null, false, { message: 'That email address is already in use' });
    } else {
      let newUser = new User();
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      done(null, await newUser.save());
    }
  })
);


// LOGIN
passport.use('login', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    
    const user = await User.findOne({ email });
    
    if (!user || !user.validPassword(password)) {
      return done(null, false, { message: "Oops! No account found..." });
    }
  
    return done(null, user);
  }
));
