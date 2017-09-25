if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prodKeys');
} else {
  module.exports = require('./devKeys');
}