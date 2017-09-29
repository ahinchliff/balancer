const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
  amount: Number,
  description: String,
  userPayee: Boolean,
  date: Date
});

mongoose.model('transactions', transactionSchema);

