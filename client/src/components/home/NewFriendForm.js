import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import axios from 'axios';

class NewFriendForm extends Component {

  constructor(props) {
    super(props);
    this.state = {errorMessage: null, posting: false}
    this.friendFields = [
      { name: 'name', label: 'Friends Name', type: 'text' },
    ]
    this.transactionFields = [
      { name: 'description', label: 'Transaction Description', type: 'text' },
      { name: 'amount', label: 'Amount($)', type: 'number' },
      { name: 'userPayee', label: 'Who paid?', type: 'checkbox', option1: 'Friend', option2: 'You'}
    ]
  }

  renderFormFriendFields() {
    return this.friendFields.map((field) => {
      const { name, label, type } = field;
      return (
        <div className="input-field" key={name}>
          <Field name={name} type={type} component="input" disabled={this.state.posting}/>
          <label>{label}</label>
        </div>
      );
    });
  }

  renderFormTransactionFields() {
    return this.transactionFields.map((field) => {
      const { name, label, type, option1, option2 } = field;
      if (type === 'checkbox') {
        
        return (
          <div className="switch" style={{paddingTop: '20px'}} key={name}>
            <span style={{paddingRight: '20px', color: '#9e9e9e'}}>{label}</span>
            <label>
              {option1}
              <Field name={name} type={type} component="input" disabled={this.state.posting}/>
              <span className="lever"></span>
              {option2}
            </label>
          </div>
        );
      }
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
      <button type="submit" className="btn waves-effect waves-light right">
        Submit
        <i className="material-icons right">send</i>
      </button>
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
  
  async postFriend(values) {
    this.setState({ posting: true, errorMessage: null })
   
    const res = await axios.post('/api/friends', values);
    const { success, message, newFriend } = res.data;
    
    if (success && newFriend) {
      this.props.addNewFriend(newFriend); //update store
      this.props.hideModal();
    } else {
      this.setState({ posting: false, errorMessage: message  });
    }

  }
  
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.postFriend.bind(this))}>
        <div className="section">
        {this.renderErrorMessage()}
        {this.renderFormFriendFields()}
        </div>
        <div className="section">
          <p style={{fontWeight: 'bold'}}>First Transaction</p>
        {this.renderFormTransactionFields()}
        </div>
        {this.renderSubmitButton()}
        <div className="clearfix"></div>
      </form>
    );
  }
}

const mapped = connect(null, actions)(NewFriendForm);

export default reduxForm({ 
  form: 'newFriend',
})(withRouter(mapped));