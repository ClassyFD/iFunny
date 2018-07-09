import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { TimelineMax, Power0 } from 'gsap';
import { Link } from 'react-router-dom';
import './Missing.css';

class Missing extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount() {

  }
  componentDidMount() {
    let tl = new TimelineMax({
      repeat:-1
    });
    tl.to(`.missing-404-image`, 2, {transform:'rotate(90deg)', ease:Power0.easeIn});
  }
  componentWillReceiveProps(props) {

  }
  render() {
    return (
      <main className={'Missing'}>
        <section className={`missing-main-section`}>
          <h1 className={`missing-404-heading`}>
            404
          </h1>
          <h2 className={`missing-bottom-heading`}>
            What you are looking for is not here.
          </h2>
          <Link to='/app' className={`missing-404-image`}/>
          <Link to='/app' className={`missing-colored-heading`}>
            Why are you still here?
          </Link>
        </section>
      </main>
    )
  }
}
function mapStateToProps(state) {
  return {
    user:state.sessionUser
  }
}
export default withRouter(connect(mapStateToProps)(Missing));