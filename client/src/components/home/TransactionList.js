import React, { Component } from 'react';
import { connect } from 'react-redux';
import Preloader from '../misc/Preloader';
import Modal from '../misc/Modal';
import NewTransactionForm from './NewTransactionForm';

class TransactionList extends Component {

  state = {
    displayNewTransactionModal: false,
  }

  toggleNewTransactionModal() {
    this.setState({ displayNewTransactionModal: this.state.displayNewTransactionModal ? false : true });
  }
  
  generateTable() {
    return (
      <table className="centered bordered" style={{tableLayout: 'fixed'}}>
        <thead className="blue lighten-2 white-text">
          <tr style={{height: '55px'}}>
            <th style={{width: '20%', fontWeight: 'normal', borderRadius: 0}}>DATE</th>
            <th style={{width: '60%', fontWeight: 'normal', borderRadius: 0}}>TRANSACTION</th>
            <th style={{width: '20%', fontWeight: 'normal', borderRadius: 0}}>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
        {this.props.transactionList && this.props.transactionList.length > 0 && this.generateTableBody()}
        </tbody>
      </table>
    );
  }

  generateTableBody() {
    return this.props.transactionList.map(transaction => {
      const amountStyle = transaction.userPayee ? {width: '20%', color: '#26a69a'} : {width: '20%', color: '#ee6e73'}
      return (
          <tr key={transaction._id} style={{height: '66px'}}>
            <td style={{width: '20%'}}>{new Date(transaction.date).toLocaleDateString()}</td>
            <td style={{width: '60%'}}>{transaction.description}</td>
            <td style={amountStyle}>${parseFloat(transaction.amount).toFixed(2)}</td>
          </tr>
      );
    })
  }

  generateLoadingOrEmpty() {
    const {selectedFriend, transactionList} = this.props;

    if (!selectedFriend) {
      return (
        <div className="center-align" style={{padding: '100px 40px',}}>
          Select a friend to view transactions...
        </div>
      );
    }

    if (selectedFriend && !transactionList) {
      return (
        <div className="center-align" style={{paddingTop: '100px'}}>
          <Preloader />
        </div>
      );
    }

    if (transactionList.length < 1) {
      return (
        <div className="center-align" style={{padding: '100px 40px',}}>
          You and this friend dont have any transactions :(
        </div>
      );
    }
  }

  render(){
    return (
      <div className="col s5 white" style={{height: 'calc(100vh - 64px', padding: 0, position: 'relative'}}>
        {this.generateTable()}
        {this.generateLoadingOrEmpty()}
        {this.props.selectedFriend && <a 
          className="btn-floating btn-large waves-effect waves-light red"
          style={{position: 'absolute', bottom: '30px', right: '30px'}}
          onClick={()=>{this.toggleNewTransactionModal()}}
        >
          <i className="material-icons">add</i>
        </a>}
        {
          this.state.displayNewTransactionModal && 
          <Modal 
            heading ={"New Transaction"} 
            hideModal={this.toggleNewTransactionModal.bind(this)}
            component={<NewTransactionForm hideModal={this.toggleNewTransactionModal.bind(this)} />}
          />
        }
      </div>
    );
  }
}

function mapStateToProps({ selectedFriend, transactionList }) {
  return ({ selectedFriend, transactionList });
}

export default connect(mapStateToProps)(TransactionList);


