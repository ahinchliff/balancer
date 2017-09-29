import React from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

export default ({ action }) => {

  const form = action === 'Register' ? <SignupForm /> : <LoginForm />;

  return (
    <div className="row " style={{marginTop: '60px'}}>
      <div className="col l4 offset-l4">
        <div className="card z-depth-3">
          <div className="card-content teal lighten-2 white-text">
            <h4>{action}</h4>
          </div>
          <div className="card-content grey lighten-4">
            {form}
          </div>
        </div>
      </div>
    </div>
  );
}