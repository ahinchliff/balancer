module.exports = app => {
  require('./routes_auth')(app);
  require('./routes_friends')(app);
  require('./routes_transactions')(app);
};