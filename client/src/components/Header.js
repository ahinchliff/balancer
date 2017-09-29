import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = props => {

  const renderContent = () => {
    switch (props.user) {
      case null:
        return;
      case false:
        return [
            <li key={1}><Link to="/register">Register</Link></li>,
            <li key={2}><Link to="/login">Login</Link></li>
          ];
      default:
        return[
          <li key={1}>
            <Link to="/home">
              <i className="material-icons left">account_circle</i>
              {props.user.email}
            </Link></li>,
          <li key={2}><a href="/auth/logout">Logout</a></li>
        ];
    }
  }

  return (
      <nav>
        <div className="nav-wrapper" style={{ padding: '0 5%' }}>
          <Link to="/" className="left brand-logo">Balancer</Link>
          <ul className="right">
            {renderContent()}
          </ul>
        </div>
      </nav>
  );
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Header);