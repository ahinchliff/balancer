import React from 'react';
import FriendColumn from './FriendColumn';
import TransactionList from './TransactionList';
import DetailsColumn from './DetailsColumn';

export default props => {
  return (
    <div className="row" style={{height: 'calc(100vh - 64px)', marginBottom: 0}}>
      <FriendColumn />
      <DetailsColumn />
      <TransactionList />
    </div>
  );
}