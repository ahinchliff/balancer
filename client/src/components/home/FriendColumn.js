import React, { Component } from 'react';
import FriendList from './FriendList';
import Modal from '../misc/Modal';
import NewFriendForm from './NewFriendForm';

export default class FriendColumn extends Component {
  state = {
    displayNewFriendModal: false,
  }

  toggleNewFriendModal() {
    this.setState({ displayNewFriendModal: this.state.displayNewFriendModal ? false : true });
  }

  render() {
    return (
      <div className="col s3 blue-grey lighten-5" style={{height: 'calc(100vh - 64px', padding: 0}}>
        <a 
          onClick={()=>{this.toggleNewFriendModal()}}
          className="waves-effect waves-light btn-large col s12"
          style={{borderRadius: 0}}
        >
          Add New Friend
          <i className="material-icons right">add</i>
        </a>
        <FriendList />
        {
          this.state.displayNewFriendModal && 
          <Modal 
            heading ={"New Friend"} 
            hideModal={this.toggleNewFriendModal.bind(this)}
            component={<NewFriendForm hideModal={this.toggleNewFriendModal.bind(this)}/>}
          />
        }
      </div>
    );
  }
}