import React, { Component } from 'react';
import { connect } from 'react-redux';
import DetailsTable from './DetailsTable';
import Preloader from '../misc/Preloader';
import Modal from '../misc/Modal';
import EditFriendForm from './EditFriendForm';


class DetailsColumn extends Component {

  state = {
    displayEditFriendModal: false,
  }

  emptyLedger() {
    return (
      <div className="center-align" style={{padding: '100px 40px',}}>
        Select a friend to view their ledger...
      </div>
    );
  };

  loadingTransactionList() {
    return (
      <div className="center-align" style={{paddingTop: '100px'}}>
        <Preloader />
      </div>
    );
  };

  columnHeader() {
    return (
      <div className="orange white-text valign-wrapper" style={{height: '55px'}}>
        <p className="center-align" style={{width: '100%'}}>LEDGER</p>
      </div>
    );
  };

  editFriendButton() {
    return (
      <a 
        onClick={()=>{this.toggleEditFriendModal()}}
        className="waves-effect waves-light btn-large col s12 orange"
        style={{borderRadius: 0}}
      >
        {this.props.selectedFriend && this.props.selectedFriend.friendName.toUpperCase()}
        <i className="material-icons right">edit</i>
      </a>
    );
  };

  toggleEditFriendModal() {
    this.setState({ displayEditFriendModal: this.state.displayEditFriendModal ? false : true });
  }

  render() {
    return (
      <div className="col s4 white" style={{height: 'calc(100vh - 64px', padding: 0}}>
        {this.props.selectedFriend ? this.editFriendButton() : this.columnHeader()}
        {this.props.selectedFriend && this.props.transactionList && <DetailsTable transactionList={this.props.transactionList} selectedFriend={this.props.selectedFriend}/>}
        {!this.props.selectedFriend && this.emptyLedger()}
        {this.props.selectedFriend && !this.props.transactionList && this.loadingTransactionList()}
        {
          this.state.displayEditFriendModal && 
          <Modal 
            heading ={`Edit ${this.props.selectedFriend.friendName}`} 
            hideModal={this.toggleEditFriendModal.bind(this)}
            component={<EditFriendForm hideModal={this.toggleEditFriendModal.bind(this)}/>}
          />
        }
      </div>
      
    );
  }
}

function mapStateToProps({ transactionList, selectedFriend }) {
  return { transactionList, selectedFriend }
}

export default connect(mapStateToProps)(DetailsColumn);