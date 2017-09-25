const passport = require('passport');

module.exports = app => {
  
  app.post('/auth/signup', (req, res, next) => {
    
    passport.authenticate('signup', (err, user, info) => {
      if (!user) {return res.send({ success: false, message: info.message })}

      req.login(user, () => {
        res.send({ success: true, user })
      });
    })(req, res, next);
  });

  app.post('/auth/login', (req, res, next) => {
    
    passport.authenticate('login', (err, user, info) => {
      
      if (!user) {return res.send({ success: false, message: info.message })}

      req.login(user, () => {
        res.send({ success: true, user });
      });

    })(req, res, next);
  });

  app.get('/auth/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect("/");
  });
}
