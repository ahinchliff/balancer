import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import axios from 'axios';

class NewTransactionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {errorMessage: null, posting: false}
    this.transactionFields = [
      { name: 'description', label: 'Transaction Description', type: 'text' },
      { name: 'amount', label: 'Amount($)', type: 'number' },
      { name: 'userPayee', label: 'Who paid?', type: 'checkbox', option1: 'Friend', option2: 'You'}
    ]
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
  
  async postTransaction(values) {
    this.setState({ posting: true, errorMessage: null })
    values.friendId = this.props.selectedFriend.friendId;
   
    const res = await axios.post('/api/transactions/', values);
    const { success, message, updatedTransactions, updatedBalance } = res.data;
    
    if (success && updatedTransactions) {
      this.props.hideModal();
      this.props.addNewTransaction(this.props.selectedFriend.friendId, updatedBalance, updatedTransactions);
      //update store
    } else {
      this.setState({ posting: false, errorMessage: message  });
    }
  }
  
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.postTransaction.bind(this))}>
        {this.renderErrorMessage()}
        {this.renderFormTransactionFields()}
        {this.renderSubmitButton()}
        <div className="clearfix"></div>
      </form>
    );
  }
}

function mapStateToProps({ selectedFriend }) {
  return { selectedFriend }
}

const mapped = connect(mapStateToProps, actions)(NewTransactionForm);

export default reduxForm({ 
  form: 'newTransaction',
})(withRouter(mapped));