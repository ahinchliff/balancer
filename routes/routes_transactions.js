const mongoose = require('mongoose');
const Friend = mongoose.model('friends');
const Transaction = mongoose.model('transactions');
const requireLogin = require('../middlewares/requireLogin');


module.exports = app => {
  app.post('/api/transactions', requireLogin, async (req, res) => {
    const { description, amount, userPayee = false, friendId } = req.body;
    const currentUserId = req.user.id;
    const friend = await Friend.findOne({_user: currentUserId, _id: friendId});
    
    if (!friend) {
      return res.status(422).send({ success: false, message: "Could not find friend"});
    }
    friend.transactions.push(new Transaction({ description, amount, userPayee, date: Date.now() }));

    try {
      const updatedFriend = await friend.save();
      const updatedBalance = updatedFriend.balance();
      const updatedTransactions = updatedFriend.transactions;
      res.send({ success: true, updatedTransactions, updatedBalance });
    } catch(err) {
      res.status(422).send({ success: false, message: err });
    }
  });
}
