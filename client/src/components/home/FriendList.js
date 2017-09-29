import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Preloader from '../misc/Preloader';

class FriendList extends Component {

  componentDidMount() {
    this.props.fetchFriendList();
  }

  generateFriendList() {
    const positiveBalanceStyle = {border: '1px solid #26a69a', padding: '5px', borderRadius: 
    '5px', color: '#26a69a', display: 'inline-block', width: '100px', textAlign: 'center'};
    const negativeBalanceStyle = {border: '1px solid #ee6e73', padding: '5px', borderRadius: 
    '5px', color: '#ee6e73', display: 'inline-block', width: '100px', textAlign: 'center'};
    const neutralBalanceStyle = {border: '1px solid #2196F3', padding: '5px', borderRadius: 
    '5px', color: '#2196F3', display: 'inline-block', width: '100px', textAlign: 'center'};

    const friendId = this.props.selectedFriend ? this.props.selectedFriend.friendId : null
    
    return this.props.friendList.map((friend) => {
      let balanceStyling;
      if (friend.balance > 0) { balanceStyling = positiveBalanceStyle}
      if (friend.balance == 0) { balanceStyling = neutralBalanceStyle} 
      if (friend.balance < 0) { balanceStyling = negativeBalanceStyle} 
      return (
        <tr
          key={friend._id}
            style={{fontSize: '1.1em', cursor: 'pointer'}}
          className={friend._id === friendId ? "teal lighten-3 white-text" : null}
          onClick={() => this.props.updateSelectedFriend(friend._id, friend.name)}
        >
          <td style={{paddingLeft: '20px', borderRadius: 0, letterSpacing: '1px'}}>{friend.name}</td>
          <td style={{paddingRight: '20px', borderRadius: 0, textAlign: 'right'}}>
            <span style={balanceStyling}>
              ${parseFloat(Math.abs(friend.balance)).toFixed(2)}
            </span>
          </td>
      </tr>
      )
    });
  }
  
  render() {
    if (!this.props.friendList) { 
      return (
        <div className="center-align" style={{paddingTop: '100px'}}>
          <Preloader />
        </div>
      );
    }

    if (this.props.friendList.length === 0) {
      return (
        <div className="center-align" style={{padding: '154px 40px',}}>
          You haven't added any friends yet. Add one above...
        </div>
      );
    }

    return (
      <div>
        <table className="highlight">
          <tbody>
          {this.generateFriendList()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ friendList, selectedFriend }) {
  return { friendList, selectedFriend };
}

export default connect(mapStateToProps, actions)(FriendList);

