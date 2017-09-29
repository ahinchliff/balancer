import React from 'react';

export default ({ heading, component, hideModal }) => {
  
  return (
    <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: 'rgba(0, 0, 0, 0.4)', zIndex: '10'}}>
      <div className="row">
        <div className="col s6 offset-s3" style={{marginTop: '100px'}}>
          <div className="card z-depth-3">
            <div className="card-content teal lighten-2 white-text" style={{padding: '10px'}}>
              <h5 style={{display: 'inline-block', paddingLeft: '10px'}}>{heading}</h5>
              <a
                className="waves-effect waves-light btn right blue-grey lighten-4 black-text"
                onClick={hideModal}
              >
              <i className="material-icons">close</i>
              </a>
              <div className="clearfix"></div>
            </div>
            <div className="card-content grey lighten-4">
              {component}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

