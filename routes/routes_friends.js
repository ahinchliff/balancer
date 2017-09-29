const mongoose = require('mongoose');
const Friend = mongoose.model('friends');
const Transaction = mongoose.model('transactions');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  
  app.get('/api/friends', async (req, res) => {
    const friends = await Friend.find({ _user: req.user.id })
    
    const formatedFriends = friends.map(friend => {
      return {
        name: friend.name,
        balance: friend.balance(),
        _id: friend._id,
      }
    })
    res.send(formatedFriends);
  });
  

  app.get('/api/friends/:id/transactions', requireLogin, async (req, res) => {
    const transactions = await Friend.findOne({_id: req.params.id}, 'transactions');
    res.send(transactions.transactions);
  });

  app.post('/api/friends/new', requireLogin, async (req, res) => {
    const { name, description, amount, userPayee = false } = req.body;
    const existingFriend = await Friend.findOne({ 'name': name });

    if (existingFriend) {
      res.send({ success: false, message: 'A friend with that name already exists' });
    } else {
      let newFriend = new Friend({ 
        name,
        _user: req.user.id,
        transactions: [new Transaction({description, amount, userPayee, date: Date.now() })]
      });
      
      try {
        newFriend = await newFriend.save();
        const formatedNewFriend = {
          name: newFriend.name,
          _id: newFriend._id,
          balance: newFriend.balance(),
        }
        res.send({ success: true, newFriend: formatedNewFriend });
      } catch(err) {
        res.status(422).send({ success: false, message: err });
      }

    }
  });
}