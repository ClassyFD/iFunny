import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';
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
    axios.get(ENV.REACT_APP_BACKEND+'/api/getUserProfile/'+this.props.match.params.id).then((response)=>{
      let res = response.data[0].json_build_object;
      res.memes.sort((a, b)=>{
        return b.id - a.id;
      })
      this.setState({
        memes: res.memes,
        user: res.user
      })
    })
  }

  componentWillReceiveProps(props) {
  }

  render() {
    let {state, props} = this,
        details,
        memes;
    
        if (this.state.user) {
          details = (
            <section className={`profile-detail-section`}>
              <div style={{backgroundImage: state.user.cover_photo? `url('${state.user.cover_photo}')`:`url('https://img.ifcdn.com/user_covers/bcb604832ae943605c2e8e38ecdbdc6694c2662b_0.jpg?1389824103')`}} className={`profile-cover-picture`}/>
              <div className={`profile-bottom-container`}>
                <div style={{backgroundImage: state.user.profile_picture? `url('${state.user.profile_picture}')`:`url('https://ifunny.co/images/icons/profile.svg')`}} className={`profile-picture`}/>
                <h1 className={`profile-username-heading`}>
                  {state.user.username}
                </h1>
                <div className={`profile-subs-container`}>
                  <h2 className={`profile-subscribers-heading`}>
                    {state.user.subscribers}
                  </h2>
                  <h3 className={`profile-subscribers-text-heading`}>
                    subscribers
                  </h3>
                  <h3 className={`profile-dot-heading`}>
                    •
                  </h3>
                  <h2 className={`profile-subscriptions-heading`}>
                    {state.user.subscriptions}
                  </h2>
                  <h3 className={`profile-subscriptions-text-heading`}>
                    subscriptions
                  </h3>
                </div>
                <h3 className={`profile-headline-heading`}>
                  {state.user.headline}
                </h3>
                {state.user.featured > 0?(<div className={`profile-featured-container`}>
                  <h2 className={`profile-star-heading`}/>
                  <h2 className={`profile-featured-heading`}>
                    {state.user.featured}
                  </h2>
                  <h2 className={`profile-featured-text-heading`}>
                    featured
                  </h2>
                </div>):null}
              </div>
            </section>
          )
        }
    return (
      <main className='Profile'>
        {details}
        {memes}
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