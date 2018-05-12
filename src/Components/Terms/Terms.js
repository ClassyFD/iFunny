import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TimelineMax } from 'gsap';
import './Terms.css';

class Terms extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'MOUNT_COMP',
      val: 'terms'
    })
    let ltl = new TimelineMax();
    ltl.to(window, .5, {scrollTo:0});
  }

  componentWillReceiveProps(props) {
  }

  render() {
    return (
      <main className='Terms'>
        Terms
      </main>
    )
  }
}
function MapStateToProps(state) {
  return {

  }
}
export default connect()(Terms);