import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import axios from 'axios';

class SignupForm extends Component {

  constructor(props) {
    super(props);
    this.state = {errorMessage: null, posting: false}
    this.fields = [
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'password', label: 'Password', type: 'password' },
    ]
  }

  renderFormFields() {
    return this.fields.map((field) => {
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
  
  async postNewUser(values) {
    this.setState({ posting: true, errorMessage: null })
    const res = await axios.post('/auth/signup', values);
    const { success, message, user } = res.data;
    
    //if signup is success redirect to the booking page
    if (success) {
      this.props.updateUser(user);
      return this.props.history.push("/home")
    }

    //if signup is unsuccessful rerender with error message
    this.setState({ posting: false, errorMessage: message  });

  }
  
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.postNewUser.bind(this))}>
        {this.renderErrorMessage()}
        {this.renderFormFields()}
        {this.renderSubmitButton()}
        <div className="clearfix"></div>
      </form>
    );
  }
}

const mapped = connect(null, actions)(SignupForm);

export default reduxForm({ 
  form: 'signup',
})(withRouter(mapped));


