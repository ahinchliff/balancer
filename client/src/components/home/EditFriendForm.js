import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import axios from 'axios';

class EditFriendForm extends Component {

  constructor(props) {
    super(props);
    this.state = {errorMessage: null, posting: false}
    this.transactionFields = [
      { name: 'name', label: 'New Name', type: 'text' },
    ]
  }

  renderForm() {
    return this.transactionFields.map((field) => {
      const { name, label, type } = field;
      return (
        <div className="input-field" key={name}>
          <Field name={name} type={type} component="input" disabled={this.state.posting}/>
          <label>{label}</label>
        </div>
      );
    });
  }

  renderSubmitButton() {
    // If waiting for a response from api show loading bar, else display submit button.
    if (this.state.posting) {
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      );
    }
    return (
      <div>
        <button type="submit" className="btn waves-effect waves-light right">
          Submit
          <i className="material-icons right">send</i>
        </button>
        <button
          type="button"
          className="btn waves-effect waves-light right red" style={{marginRight: '10px'}}
          onClick={this.postDeleteFriend.bind(this)}
        
        >
          Delete {this.props.selectedFriend.friendName}
          <i className="material-icons right">delete</i>
         </button>
    </div>
    );
  }

  renderErrorMessage() {
    if (this.state.errorMessage) {
      return (
        <div className="valign-wrapper" style={{height: '50px', color: '#ee6e73', fontWeight: 'bold'}}>
          <p className="center-align" style={{width: '100%'}}>{this.state.errorMessage}</p>
        </div>
      )
    }
  }
  
  async postEditFriend(values) {
    this.setState({ posting: true, errorMessage: null })
    values.friendId = this.props.selectedFriend.friendId;
    
    const res = await axios.post('/api/friends/edit', values);
    const { success, message, updatedFriend } = res.data;

    if (success && updatedFriend) {
      this.props.hideModal();
      this.props.editFriend(updatedFriend);
    } else {
      this.setState({ posting: false, errorMessage: message });
    }
  }

  async postDeleteFriend() {
    this.setState({ posting: true, errorMessage: null });
    const friendId = this.props.selectedFriend.friendId;
    const res = await axios.post('/api/friends/delete', { friendId });
    const { success, message } = res.data;
    if (success) {
      this.props.hideModal();
      this.props.deleteFriend(friendId);
    } else {
      this.setState({ posting: false, errorMessage: message });
    }
  }
  
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.postEditFriend.bind(this))}>
        {this.renderErrorMessage()}
        {this.renderForm()}
        {this.renderSubmitButton()}
        <div className="clearfix"></div>
      </form>
    );
  }
}

function mapStateToProps({ selectedFriend }) {
  return { selectedFriend }
}

const mapped = connect(mapStateToProps, actions)(EditFriendForm);

export default reduxForm({ 
  form: 'editFriend',
})(withRouter(mapped));