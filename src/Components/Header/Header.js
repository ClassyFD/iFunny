import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import axios from 'axios'
import './Header.css';
import { TimelineMax } from 'gsap';

const ENV = require('../../frontenv');

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navExpanded:false,
      mountedComp:''
    };
  }

  componentDidMount() {
    const api = axios.create({
      withCredentials:true
    });
    api.get(ENV.REACT_APP_BACKEND+'/auth/me').then((response)=>{
        this.props.dispatch({
          type:'SET_USER',
          val:response.data
        })
    }).catch((error)=>{
      console.log(error);
    });
  }

  componentWillReceiveProps(props) {
    let mtl = new TimelineMax(),
        tl = new TimelineMax();
    if (this.state.mountedComp !== props.comp) {
      tl.to(`.header-link`, .5, {color:'white'});
      mtl.to(`.header-nav-link`, .5, {color:'white'});
    }
    tl.to(`.header-left-section-${props.comp}-text`, .5, {color:'#ffcc00'}, this.state.mountedComp!==props.comp?'-=.5':'-=0');
    mtl.to(`.header-mobile-nav-${props.comp}`, .5, {color:'#ffcc00'}, this.state.mountedComp!==props.comp?'-=.5':'-=0');
    this.setState({
      mountedComp:props.comp
    })
    tl.staggerTo('.header-nav-link', .5, {left:'0vw'}, '.03')
    this.setState({
      navExpanded:false
    })
  }
  expandNav() {
    let tl = new TimelineMax();
    tl.staggerTo('.header-nav-link', .5, {left:this.state.navExpanded?'0vw':'50.5vw'}, '.03')
    this.setState({
      navExpanded:this.state.navExpanded?false:true
    })
  }

  render() {
    let props = this.props,
        login;
    if (props && props.user) {
      login = (
        <div className='header-right-section-login-container'>
          <Link className='header-link header-left-section-profile-text header-right-section-login' to='/profile'>
            Profile
          </Link>
          <Link to='/edit' className='header-right-section-add-memes-li'/>
        </div>
      );
    } else {
      login = (
        <a href={ENV.REACT_APP_BACKEND + '/auth'} className='header-right-section-login'>
          Login
        </a>
      );
    }
    return (
      <main className='Header'>
        <section className='header-left-section'>
          <div className='header-left-section-featured-container'>
            <Link to='/' className='header-link header-left-section-featured-text'>
              featured
            </Link>
            <div className='header-left-section-featured-image'/>
          </div>
          <Link to='/app/collective' className='header-link header-left-section-collective-text'>
            collective
          </Link>
          <Link to='/app/about' className='header-link header-left-section-about-text'>
            about
          </Link>
          <a href='http://ifunnyoriginal.spreadshirt.com/' target='_blank' className='header-left-section-store-text'>
            store
          </a>
        </section>
        <section className='header-mobile-left-section'>
          <div className='header-mobile-icon' onClick={()=>{this.expandNav()}}/>
          <div className='header-mobile-nav'>
            <Link to={'/app'} className='header-nav-link header-mobile-nav-featured'>
              featured
            </Link>
            <Link to={'/app/collective'} className='header-nav-link header-mobile-nav-collective'>
              collective
            </Link>
            <Link to={'/app/about'} className='header-nav-link header-mobile-nav-about'>
              about
            </Link>
            <a href={'http://ifunnyoriginal.spreadshirt.com/'} target='_blank' className='header-nav-link header-mobile-nav-store'>
              store
            </a>
            <a href={'https://twitter.com/iFunnyChef'} target='_blank' className='header-nav-link header-mobile-nav-chef'>
              iFunnyChef
            </a>
            <Link to={'/app/privacy'} className='header-nav-link header-mobile-nav-privacy'>
              privacy
            </Link>
            <Link to={'/app/terms'} className='header-nav-link header-mobile-nav-terms'>
              terms
            </Link>
            {this.props.user?(<a href={ENV.REACT_APP_BACKEND+'/auth/logout'} className='header-nav-link header-mobile-nav-logout'>logout</a>):null}
          </div>
        </section>
        <section className='header-middle-section'>
          <Link to='/' className='header-middle-section-image'/>
        </section>
        <section className='header-right-section'>
          <Link to='/app/search' className='header-right-section-image'/>
          {login}
        </section>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.sessionUser,
    comp: state.mountedComp
  }
}

export default connect(mapStateToProps)(Header);