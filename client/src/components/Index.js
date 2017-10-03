import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

class Index extends Component {

  componentDidMount() {
    if (this.props.user) {
      this.props.history.push("/home")
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.user) {
      this.props.history.push('/home')
    }
  }
  
  render() {
    return (
      <div className="row" style={{marginTop: '40px'}}>
        <div className="col s6 offset-s3" style={{padding: '20px'}}>

            <div className="card z-depth-3">
              <div className="card-content teal lighten-2 white-text">
                <h4 style={{margin: 0}}>Welcome</h4>
              </div>
              <div className="card-content">
                <p className="flow-text" style={{fontSize: '1.1em'}}>
                  Balancer is a basic cost splitting app that provides a simple way to keep track of how much money you owe or are owed by multiple people. To get started, {<Link to ="/register">register a new account</Link>} or {<Link to ="/login">login</Link>} with the details below to see prefilled data.
                </p>
                <blockquote>
                  username: tester@balancer.com
                  <br></br>
                  password: abc123
                </blockquote>
                <p className="flow-text" style={{fontSize: '1.1em'}}>
                  Building this project involved a lot of firsts for me. It is the first project I have built outside my studies, the first time I have developed on Node.js and the first time I have created a client-side app or used React. It is therefore a little rough around the edges. 
                </p> 
                <p className="flow-text" style={{fontSize: '1.1em', marginTop: '1em'}}>
                  I'm currently researching best practices in multiple areas with the goal of improving Balancer and my overall coding ability. If your company is on the lookout for a web developer intern please don't hesitate to get in contact.
                </p>
                <p className="flow-text" style={{fontSize: '1.1em', marginTop: '1em'}}>
                  Anthony
                </p>
              </div>
            </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(withRouter(Index));

