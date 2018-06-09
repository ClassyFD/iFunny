import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch({
      type:'MOUNT_COMP',
      val:'profile'
    })
  }

  componentWillReceiveProps(props) {
  }

  render() {
    return (
      <main className='Profile'>
        
      </main>
    )
  }
}
function mapStateToProps(state) {
  return {
    user:state.sessionUser
  }
}
export default withRouter(connect(mapStateToProps)(Profile));