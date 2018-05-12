import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Cam.css';

class Cam extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'MOUNT_COMP',
      val: 'cam'
    })
  }

  componentWillReceiveProps(props) {
  }

  render() {
    return (
      <main className='Cam'>
        
      </main>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Cam);