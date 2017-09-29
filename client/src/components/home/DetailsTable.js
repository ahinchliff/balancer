import React from 'react';

export default (props) => {
  const { transactionList, selectedFriend } = props;

  const userTransactions = () => {
    return transactionList.filter(transaction => {
      if (transaction.userPayee) {return transaction}
    });
  }

  const friendTransactions = () => {
    return transactionList.filter(transaction => {
      if (!transaction.userPayee) {return transaction}
    });
  }

  const usersTotal = () => {
    const amounts = userTransactions().map(transaction => transaction.amount);
    return amounts.reduce((x, y) => {
      return x + y;
    }, 0)
  }

  const friendsTotal = () => {
    const amounts = friendTransactions().map(transaction => transaction.amount);
    return amounts.reduce((x, y) => {
      return x + y;
    }, 0)
  }


  return (
    <div>
      <table className="bordered" style={{tableLayout: 'fixed'}}>
        <tbody>
        <tr style={{height: '66px'}}>
            <td style={{width: '60%', paddingLeft: '20px'}}>Total Expenditure</td>
            <td style={{width: '40%', paddingRight: '20px', textAlign: "right"}}>${(friendsTotal() + usersTotal()).toFixed(2)}</td>
          </tr>
          <tr style={{height: '66px'}}>
            <td style={{width: '60%', paddingLeft: '100px'}}>{selectedFriend.friendName}</td>
            <td style={{width: '40%', paddingRight: '20px', textAlign: "right"}}>${(friendsTotal()).toFixed(2)}</td>
          </tr>
          <tr style={{height: '66px'}}>
            <td style={{width: '60%', paddingLeft: '100px'}}>You</td>
            <td style={{width: '40%', paddingRight: '20px', textAlign: "right"}}>${(usersTotal()).toFixed(2)}</td>
          </tr>
          <tr style={{height: '66px'}}>
            <td style={{width: '60%', paddingLeft: '20px'}}>Expenditure per person</td>
            <td style={{width: '40%', paddingRight: '20px', textAlign: "right"}}>${((friendsTotal() + usersTotal()) / 2).toFixed(2)}</td>
          </tr>
          <tr style={{height: '66px', fontWeight: 'bold'}}>
            <td style={{width: '60%', paddingLeft: '20px'}}>Your position</td>
            <td style={{width: '40%', paddingRight: '20px', textAlign: "right"}}>${((usersTotal() - friendsTotal()) / 2).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}


