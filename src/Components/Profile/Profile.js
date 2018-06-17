import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ENV from '../../frontenv';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let {props, state} = this;
    this.props.dispatch({
      type:'MOUNT_COMP',
      val:'profile'
    })
    // axios.get(ENV.REACT_APP_BACKEND+'/api/getUserProfile/'+this.props.match.params.id).then((response)=>{
    //   console.log(response);
    // })
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