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
        tl = new TimelineMax(),
        etl = new TimelineMax();
        console.log(this.state.mountedComp)
        console.log(props)
    if (this.state.mountedComp !== props.comp) {
      tl.to(`.header-link`, .5, {color:'white'});
      mtl.to(`.header-nav-link`, .5, {color:'white'});
    }
    if (props.comp !== 'edit') {
    etl.to(`.header-right-section-add-memes-li`, .5, {opacity:1})
      .to(`.header-right-section-upload-heading`, .5, {color:'white'}, '-=.2');
    }
    tl.to(`.header-left-section-${props.comp}-text`, .5, {color:'#ffcc00'}, this.state.mountedComp!==props.comp?'-=.5':'-=0');
    mtl.to(`.header-mobile-nav-${props.comp}`, .5, {color:'#ffcc00'}, this.state.mountedComp!==props.comp?'-=.5':'-=0');  
    if (props.comp === 'edit') {
      console.log('edit')
      setTimeout(() => {
        etl.to(`.header-right-section-upload-heading`, .5, {color:'#fc0'});
      }, 50);
    }
    if (props.comp.split('-')[1]===props.user.id) {
      let tl = new TimelineMax();
      tl.to(`.header-left-section-profile-text`, .5, {color:'#ffcc00'}, this.state.mountedComp!==props.comp?'-=.5':'-=0');
    }
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
  hoverLink(target) {
    if (target==='edit') {
      let tl = new TimelineMax();
      tl.to(`.header-right-section-add-memes-li`, .2, {opacity:.6})
        .to(target!==this.props.comp?`.header-right-section-upload-heading`:`null`, .2, {color:'#fc0'}, '-=.2');
    } else if (target!==this.props.comp || target==='icon' || target==='search') {
      let tl = new TimelineMax();
      tl.to(`.hover-link-${target}`, .2, target==='icon'||target==='search'?{opacity:.6}:{color:'#fc0'});
    }
  }
  leaveLink(target) {
    if (target==='edit') {
      let tl = new TimelineMax();
      tl.to(`.header-right-section-add-memes-li`, .2, {opacity:1})
        .to(target!==this.props.comp?`.header-right-section-upload-heading`:`null`, .2, {color:'white'}, '-=.2');
    } else if (target!==this.props.comp || target==='icon' || target==='search') {
      let tl = new TimelineMax();
      tl.to(`.hover-link-${target}`, .2, target==='icon'||target==='search'?{opacity:1}:{color:'white'});
    }
  }
  render() {
    let props = this.props,
        login;
    if (props && props.user) {
      login = (
        <div className='header-right-section-login-container'>
          <a onMouseEnter={()=>{this.hoverLink('logout')}} onMouseLeave={()=>{this.leaveLink('logout')}} className='header-link header-left-section-logout-text header-right-section-logout hover-link-logout' href={ENV.REACT_APP_BACKEND + '/auth/logout'}>
            log Out
          </a>
          <Link onMouseEnter={()=>{this.hoverLink('profile')}} onMouseLeave={()=>{this.leaveLink('profile')}} className='header-link header-left-section-profile-text header-right-section-login hover-link-profile' to={`/app/profile/${props.user.id}`}>
            profile
          </Link>
          <Link onMouseEnter={()=>{this.hoverLink('edit')}} onMouseLeave={()=>{this.leaveLink('edit')}} to='/edit' className={`hover-link-edit`}>
            <h1 className={`header-right-section-upload-heading .header-left-section-edit-text`}>
              upload
            </h1>
            <div className='header-right-section-add-memes-li'/>
          </Link>
        </div>
      );
    } else {
      login = (
        <a onMouseEnter={()=>{this.hoverLink('login')}} onMouseLeave={()=>{this.leaveLink('login')}} href={ENV.REACT_APP_BACKEND + '/auth'} className='header-right-section-login hover-link-login'>
          log in / register
        </a>
      );
    }
    return (
      <main className='Header'>
        <section className='header-left-section'>
          <Link onMouseEnter={()=>{this.hoverLink('featured')}} onMouseLeave={()=>{this.leaveLink('featured')}} to='/' className='header-link header-left-section-featured-text hover-link-featured'>
            featured
          </Link>
          <Link onMouseEnter={()=>{this.hoverLink('collective')}} onMouseLeave={()=>{this.leaveLink('collective')}} to='/app/collective' className='header-link header-left-section-collective-text hover-link-collective'>
            collective
          </Link>
          <Link onMouseEnter={()=>{this.hoverLink('about')}} onMouseLeave={()=>{this.leaveLink('about')}} to='/app/about' className='header-link header-left-section-about-text hover-link-about'>
            about
          </Link>
          <a onMouseEnter={()=>{this.hoverLink('store')}} onMouseLeave={()=>{this.leaveLink('store')}} href='http://ifunnyoriginal.spreadshirt.com/' target='_blank' className='header-left-section-store-text hover-link-store'>
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
            {this.props.user?(<Link to={'/profile'} className='header-nav-link header-mobile-nav-profile'>
              profile
            </Link>):null}
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
          <Link onMouseEnter={()=>{this.hoverLink('icon')}} onMouseLeave={()=>{this.leaveLink('icon')}} to='/' className='header-middle-section-image hover-link-icon'/>
        </section>
        <section className='header-right-section'>
          <Link onMouseEnter={()=>{this.hoverLink('search')}} onMouseLeave={()=>{this.leaveLink('search')}} to='/app/search' className='header-right-section-image hover-link-search'/>
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