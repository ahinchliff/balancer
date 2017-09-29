const mongoose = require('mongoose');
const { Schema } = mongoose;
const transactionSchema = require('./Transaction');

const friendSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User'},
  name: String,
  transactions: [transactionSchema],
});

friendSchema.methods.userTransactions = function() {
  return this.transactions.filter((transaction) => {
    if (transaction.userPayee) {return true}
  })
}

friendSchema.methods.friendTransactions = function() {
  return this.transactions.filter((transaction) => {
    if (!transaction.userPayee) {return true}
  })
}

friendSchema.methods.userTransactionsTotal = function() {
  const amounts = this.userTransactions().map(transaction => transaction.amount);
  return amounts.reduce((x, y) => {
    return x + y;
  }, 0);
}

friendSchema.methods.friendTransactionsTotal = function() {
  const amounts = this.friendTransactions().map(transaction => transaction.amount);
  return amounts.reduce((x, y) => {
    return x + y;
  }, 0);
} 


friendSchema.methods.balance = function() {
  return (this.userTransactionsTotal() - this.friendTransactionsTotal()) / 2;
}
mongoose.model('friends', friendSchema);
