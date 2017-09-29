import React from 'react';
import { connect } from 'react-redux';
import DetailsTable from './DetailsTable';
import Preloader from '../misc/Preloader';


const DetailsColumn = (props) => {

  const { selectedFriend, transactionList } = props;
  const emptyLedger = (
    <div className="center-align" style={{padding: '100px 40px',}}>
      Select a friend to view their ledger...
    </div>
  );
  const loadingTransactionList = (
    <div className="center-align" style={{paddingTop: '100px'}}>
      <Preloader />
    </div>
  );
  
  return (
    <div className="col s4 blue-grey lighten-5" style={{height: 'calc(100vh - 64px', padding: 0}}>
      <div className="orange white-text valign-wrapper" style={{height: '55px', textAlign: 'center'}}>
        <p style={{width: '100%'}}>LEDGER</p>
      </div>
      {selectedFriend && transactionList && <DetailsTable transactionList={transactionList} selectedFriend={selectedFriend}/>}
      {!selectedFriend && emptyLedger}
      {selectedFriend && !transactionList && loadingTransactionList}

    </div>
  );
}

function mapStateToProps({ transactionList, selectedFriend }) {
  return { transactionList, selectedFriend }
}

export default connect(mapStateToProps)(DetailsColumn);