import React, { Component } from 'react';
import './MemeDetails.css';
import axios from 'axios';
import moment from 'moment';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import { TimelineMax, Ease, Power0, Power4, Power2, Back } from 'gsap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import IziToast from 'izitoast';
const ENV = require('../../frontenv');
class MemeDetails extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      commentPage:1,
      memeDetails:'',
      liked:false,
      clickable:true,
      commentClickable:true,
      commentExpanded:[],
      replyClickable:true,
      replies: [],
      replyLimit:10,
      instance:false
    };
  }
  componentDidMount() {
    axios.get(ENV.REACT_APP_BACKEND + '/api/getTopComments/'+this.props.match.params.id).then((res)=>{
      let TC1,
          TC2;
      if (res.data && res.data[0]) {
        TC1 = res.data[0].id
      }
      if (res.data && res.data[1]) {
        TC2 = res.data[1].id
      }
      axios.get(ENV.REACT_APP_BACKEND+'/api/getMemeDetails/'+this.props.match.params.id + '?commentPage='+this.state.commentPage+'&tc1='+TC1+'&tc2='+TC2).then((response)=>{
        let commentExpanded = [];
        res.data.map((el, i)=>{
          commentExpanded.push({id:el.id, status:false})
        })
        response.data.comments.map((el, i)=>{
          commentExpanded.push({id:el.id, status:false})
        })
        this.setState({
          memeDetails:response.data,
          topComments:res.data,
          TC1,
          TC2,
          commentExpanded,
        })
      })
    })
    this.props.dispatch({
      type: 'MOUNT_COMP',
      val: 'details'
    })
    let tl = new TimelineMax();
        tl.to(window, .5, {scrollTo:0});
    setTimeout(() => {
      this.likedStatus();
    }, 800);
  }
  likedStatus() {
    if (this.props.user) {
      axios.get(ENV.REACT_APP_BACKEND+'/api/likes/'+this.props.match.params.id+'/'+this.props.user.id).then((response)=>{
        if (response.data) {
          this.setState({
            liked:true,
          })
        }
      })
      let commentLikeArr = [];
      if (this.props.user) {
        axios.get(ENV.REACT_APP_BACKEND+'/api/checkCommentLikes/'+this.props.match.params.id+'/'+this.props.user.id + '?offset='+this.state.commentPage).then((response)=>{
          if (response.data) {
            if (this.state.memeDetails.comments) {
              this.state.memeDetails.comments.map((el, i)=>{
                response.data.map((resEl, resI)=>{
                  if (el.id === resEl.comment_id) {
                    commentLikeArr.push(el.id);
                  }
                })
              })
            }
            if (this.state.topComments) {
              this.state.topComments.map((el, i)=>{
                response.data.map((resEl, resI)=>{
                  if (el.id === resEl.comment_id) {
                    commentLikeArr.push(el.id);
                  }
                })
              })
            }
            if (this.state.replies) {
              this.state.replies.map((el, i)=>{
                response.data.map((resEl, resI)=>{
                  if (el.id === resEl.comment_id) {
                    commentLikeArr.push(el.id);
                  }
                })
              })
            }
            this.setState({
              commentLikeArr
            })
          }
        })
      }
    }
    setTimeout(() => {
      if (!this.state.memeDetails) {
        IziToast.show({
          title:'Meme not found!',
          position:'bottomRight',
          message:`either that page doesn't exist or monkeys stole your internet!`,
          timeout:3000,
          color:'red',
          class:'izishow-login',
          theme:'light'
        })
      }
    }, 1500);
  }
  componentWillReceiveProps(props) {
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevState.method && this.props.match.params.id != prevState.method) {
      axios.get(ENV.REACT_APP_BACKEND + '/api/getTopComments/'+this.props.match.params.id).then((res)=>{
        let TC1,
            TC2;
        if (res.data && res.data[0]) {
          TC1 = res.data[0].id
        }
        if (res.data && res.data[1]) {
          TC2 = res.data[1].id
        }
        axios.get(ENV.REACT_APP_BACKEND+'/api/getMemeDetails/'+prevState.method + '?commentPage='+this.state.commentPage+'&tc1='+TC1+'&tc2='+TC2).then((response)=>{
          let commentExpanded = [];
          res.data.map((el, i)=>{
            commentExpanded.push({id:el.id, status:false})
          })
          response.data.comments.map((el, i)=>{
            commentExpanded.push({id:el.id, status:false})
          })
          this.setState({
            topComments:res.data,
            memeDetails:response.data,
            liked:false,
            commentExpanded,
          })
          setTimeout(() => {
            this.likedStatus();
          }, 800);
          let tl = new TimelineMax();
              tl.to(window, 0, {scrollTo:0});
        });
      })
    }
  }
  componentDidUpdate() {
    if (this.state.method !== this.props.match.params.id) {
      axios.get(ENV.REACT_APP_BACKEND + '/api/getTopComments/'+this.props.match.params.id).then((res)=>{
        let TC1,
            TC2;
        if (res.data && res.data[0]) {
          TC1 = res.data[0].id
        }
        if (res.data && res.data[1]) {
          TC2 = res.data[1].id
        }
        axios.get(ENV.REACT_APP_BACKEND+'/api/getMemeDetails/'+this.props.match.params.id + '?commentPage='+this.state.commentPage+'&tc1='+TC1+'&tc2='+TC2).then((response)=>{
          let commentExpanded = [];
          res.data.map((el, i)=>{
            commentExpanded.push({id:el.id, status:false})
          })
          response.data.comments.map((el, i)=>{
            commentExpanded.push({id:el.id, status:false})
          })
          this.setState({
            topComments:res.data,
            memeDetails:response.data,
            liked:false,
            method: this.props.match.params.id,
            commentExpanded,
          })
          setTimeout(() => {
            this.likedStatus();
          }, 800);
          let tl = new TimelineMax();
          tl.to(window, 0, {scrollTo:0});
        });
      });
    }
  }
  featureMeme(meme) {
    if (meme.featured == 1) {
      IziToast.show({
        theme: 'dark',
        title: 'Are you sure you want to remove this meme from featured?',
        position: 'center',
        class:'izishow-login',
        buttons: [
            ['<button>Yes, remove.</button>', (instance, toast)=>{
              instance.hide({}, toast, 'buttonName');
              axios.post(ENV.REACT_APP_BACKEND+'/api/unfeatureMeme?id='+meme.id + '&user=' + meme.user_id + '&limit=' + this.state.limit).then((response)=>{
                this.state.memeDetails.details.featured = 0
                IziToast.show({
                  title:'This meme has been removed from featured!',
                  timeout:2000,
                  color:'green',
                  class:'izishow-login',
                  theme:'light'
                })
              }).catch((err)=>{
                IziToast.show({
                  color:'red',
                  title:'Error',
                  message:'Failed to remove meme. Please check your internet connection!',
                  position:'bottomRight',
                  class:'izishow-login',
                })
              })
            }],
            ['<button>No, keep.</button>', (instance, toast)=>{
                instance.hide({}, toast, 'buttonName');
            }, true]
        ],
        onOpening: (instance, toast)=>{
          this.setState({
            instance: true
          })
        },
        onClosing: (instance, toast, closedBy)=>{
          this.setState({
            instance: false
          })
        }
      });
    } else {
      axios.post(ENV.REACT_APP_BACKEND+'/api/featureMeme?id='+meme.id + '&user=' + meme.user_id).then((response)=>{
        this.state.memeDetails.details.featured = 0
        IziToast.show({
          title:'Featured!',
          message:'Check the featured page to see this meme at the top!',
          timeout:2000,
          color:'green',
          class:'izishow-login',
          theme:'light'
        })
      })
    }
    this.forceUpdate();
  }
  hoverTag(num) {
    let tl = new TimelineMax();
    tl.to(`.meme-tag-${num}`, .1, {color:'hsla(0,0%,100%,.6)', borderColor:'hsla(0,0%,100%,.4)'});
  }
  leaveTag(num) {
    let tl = new TimelineMax();
    tl.to(`.meme-tag-${num}`, .1, {color:'hsla(0,0%,100%,.3)', borderColor:'hsla(0,0%,100%,.1)'});
  }
  hoverUsername(target) {
    let tl = new TimelineMax();
    tl.to(target, .1, {color: 'hsla(0,0%,100%,1)'});
  }
  leaveUsername(target) {
    let tl = new TimelineMax();
    tl.to(target, .1, {color: 'hsla(0,0%,100%,.6)'});
  }
  hoverSocialMedia(target) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-${target}-hover`, .1, {opacity:.7})
  }
  leaveSocialMedia(target) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-${target}-hover`, .1, {opacity:1})
  }
  hoverButton(target) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-details-${target}`, .1, {backgroundColor:'black', borderColor:'black'})
  }
  leaveButton(target) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-details-${target}`, .1, {backgroundColor:'#080d11', borderColor:'#242424'})
  }
  hoverStats(target) {
    if (target==='likes' && !this.state.liked) {
      let tl = new TimelineMax();
      tl.to(`.meme-details-details-${target}`, .1, {opacity:1});
    } else {
      let tl = new TimelineMax();
      tl.to(`.meme-details-details-${target}`, .1, {opacity:1});
    }
  }
  leaveStats(target) {
    if (target==='likes' && !this.state.liked) {
      let tl = new TimelineMax();
      tl.to(`.meme-details-details-${target}`, .1, {opacity:.5});
    } else if (target==='likes' && this.state.liked){
    } else {
      let tl = new TimelineMax();
      tl.to(`.meme-details-details-${target}`, .1, {opacity:.5});
    }
  }
  likeMeme() {
    let state = this.state
    if (this.props.user && !state.liked && state.clickable) {
      this.setState({
        liked:true,
        clickable:false,
        memeDetails:Object.assign({}, state.memeDetails, {details:Object.assign({}, state.memeDetails.details, {likes:state.memeDetails.details.likes+1})})
      })
      axios.post(ENV.REACT_APP_BACKEND+'/api/like/'+this.props.match.params.id, {user:this.props.user}).then((response)=>{
        this.setState({
          memeDetails: Object.assign({}, state.memeDetails, {details:response.data[0]}),
          clickable:true
        })
      }).catch((err)=>{
        console.log(err)
        this.setState({
          liked:false,
          clickable:true,
          memeDetails:Object.assign({}, state.memeDetails, {details:Object.assign({}, state.memeDetails.details, {likes:state.memeDetails.details.likes})})
        })
      })
    } else if (this.props.user && this.state.liked && this.state.clickable) {
      this.setState({
        liked:false,
        clickable:false,
        memeDetails:Object.assign({}, state.memeDetails, {details:Object.assign({}, state.memeDetails.details, {likes:state.memeDetails.details.likes-1})})
      })
      axios.post(ENV.REACT_APP_BACKEND+'/api/unlike/'+this.props.match.params.id, {user:this.props.user}).then((response)=>{
        this.setState({
          memeDetails: Object.assign({}, state.memeDetails, {details:response.data[0]}),
          clickable:true
        })
      }).catch((err)=>{
        console.log(err)
        this.setState({
          liked:false,
          clickable:true,
          memeDetails:Object.assign({}, state.memeDetails, {details:Object.assign({}, state.memeDetails.details, {likes:state.memeDetails.details.likes})})
        })
      })
    } else {
      IziToast.show({
        title:'Not Logged In!',
        message:'Please log in before liking memes.',
        timeout:2000,
        color:'red',
        class:'izishow-login',
        theme:'light'
      })
    }
  }
  hoverCommentButtons(target) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-comments-${target}-button`, .2, {borderColor:'rgba(255, 204, 0, .8)'});
  }
  leaveCommentButtons(target) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-comments-${target}-button`, .2, {borderColor:'rgba(255, 204, 0, .3)'});
  }
  submitComment(e) {
    let { user } = this.props,
        props = this.props,
        state = this.state,
        date = new Date;
    if (user.username) {
      if (this.commentRef.value) {
        axios.post(ENV.REACT_APP_BACKEND + '/api/postComment', {comment:this.commentRef.value, user, meme:state.memeDetails, date}).then((response)=>{
          if (response.data) {
            axios.get(ENV.REACT_APP_BACKEND + '/api/getTopComments/'+this.props.match.params.id).then((res)=>{
              let TC1,
                  TC2;
              if (res.data && res.data[0]) {
                TC1 = res.data[0].id
              }
              if (res.data && res.data[1]) {
                TC2 = res.data[1].id
              }
              axios.get(ENV.REACT_APP_BACKEND+'/api/getMemeDetails/'+this.props.match.params.id + '?commentPage=1'+'&tc1='+TC1+'&tc2='+TC2).then((response)=>{
                let commentExpanded = [];
                res.data.map((el, i)=>{
                  commentExpanded.push({id:el.id, status:false})
                })
                response.data.comments.map((el, i)=>{
                  commentExpanded.push({id:el.id, status:false})
                })
                this.setState({
                  memeDetails:response.data,
                  commentPage:1,
                  topComments:res.data,
                  commentExpanded,
                })
              });
              this.setState({
                memeDetails: Object.assign({}, this.state.memeDetails, {comments: [response.data, ...this.state.memeDetails.comments]})
              })
              this.commentRef.value = '';
              let tl = new TimelineMax();
              tl.to(window, 1, {scrollTo: window.pageYOffset + 350});
            })
          }
        }).catch((err)=>{
          if (err) {
            console.log(err);
            IziToast.show({
              title:'Posting Failed!',
              message:'Please check your internet connection, or wait a few moments and try again.',
              timeout:5000,
              color:'red',
              class:'izishow-login',
              theme:'light'
            })
          }
        })  
      }
    } else {
      IziToast.show({
        title:'Missing Username!',
        message:'Please visit your profile and create a username before posting comments.',
        timeout:5000,
        color:'red',
        class:'izishow-login',
        theme:'light'
      })
    }
  }
  updateComments(type) {
    let tl = new TimelineMax(),
        target = `.meme-details-leave-comment-section`;
    axios.get(ENV.REACT_APP_BACKEND + '/api/getTopComments/'+this.props.match.params.id).then((res)=>{
      let TC1,
          TC2;
      if (res.data && res.data[0]) {
        TC1 = res.data[0].id
      }
      if (res.data && res.data[1]) {
        TC2 = res.data[1].id
      }
      if (type === 'back' && this.state.commentPage > 1) {
        axios.get(ENV.REACT_APP_BACKEND+'/api/getMemeDetails/'+this.props.match.params.id + '?commentPage='+(this.state.commentPage - 1)+'&tc1='+TC1+'&tc2='+TC2).then((response)=>{
          let commentExpanded = [];
          response.data.comments.map((el, i)=>{
            commentExpanded.push({id:el.id, status:false})
          })
          res.data.map((el, i)=>{
            commentExpanded.push({id:el.id, status:false})
          })
          this.setState({
            memeDetails: response.data,
            commentExpanded,
            topComments:res.data,
            commentPage: this.state.commentPage - 1
          })
          tl.to(window, .7, {scrollTo:target});
        }).catch((err)=>{
          if (err) {
            this.setState({
              commentPage:this.state.commentPage + 1
            })
          }
        });
      } else {
        axios.get(ENV.REACT_APP_BACKEND+'/api/getMemeDetails/'+this.props.match.params.id + '?commentPage='+(this.state.commentPage + 1)+'&tc1='+TC1+'&tc2='+TC2).then((response)=>{
          let commentExpanded = [];
          response.data.comments.map((el, i)=>{
            commentExpanded.push({id:el.id, status:false})
          })
          res.data.map((el, i)=>{
            commentExpanded.push({id:el.id, status:false})
          })
          this.setState({
            memeDetails: response.data,
            commentExpanded,
            topComments:res.data,
            commentPage: this.state.commentPage + 1
          })
          tl.to(window, .7, {scrollTo:target});
        }).catch((err)=>{
          this.setState({
            commentPage: this.state.commentPage - 1
          })
        });
      }
    })
    
  }
  likeComment(id, type) {
    let state = this.state,
        props = this.props;
    if (props.user && state.commentLikeArr && !state.commentLikeArr.includes(id) && state.commentClickable) {
      this.setState({
        commentClickable:false,
        commentLikeArr: state.commentLikeArr.concat(id)
      })
      if (type==='top') {
        this.state.topComments.map((el, i)=>{
          if (el.id === id) {
            el.likes += 1;
          }
        })
      } else if (type==='regular') {
        this.state.memeDetails.comments.map((el, i)=>{
          if (el.id === id) {
            el.likes += 1;
          }
        })
      } else if (type==='topreply') {
        this.state.replies.map((el, i)=>{
          if (el.id === id) {
            el.likes +=1;
          }
        })
      }
      axios.post(ENV.REACT_APP_BACKEND+'/api/commentLike/'+id, {user:props.user, type, meme: props.match.params.id, TC1: state.TC1, TC2: state.TC2, offset:state.commentPage}).then((response, type)=>{
        this.setState({
          commentLikeArr:state.commentLikeArr.concat(id),
          commentClickable:true,
        })
      }).catch((err)=>{
        console.log(err)
        if (type==='top') {
          this.state.topComments.map((el, i)=>{
            if (el.id === id) {
              el.likes -= 1;
            }
          })
        } else if (type==='regular') {
          this.state.memeDetails.comments.map((el, i)=>{
            if (el.id === id) {
              el.likes -= 1;
            }
          })
        } else if (type==='topreply') {
          this.state.replies.map((el, i)=>{
            if (el.id === id) {
              el.likes -=1;
            }
          })
        }
        this.setState({
          commentClickable:true,
          commentLikeArr:state.commentLikeArr.filter((el, i)=>{
            return el!==id
          })
        })
        IziToast.show({
          title:'Liking Error!',
          message:'Please make sure you are connected to the internet and try again in a few moments.',
          timeout:5000,
          color:'red',
          class:'izishow-login',
          theme:'light'
        })
      })
    } else if (props.user && state.commentLikeArr.includes(id) && state.commentClickable) {
      this.setState({
        commentClickable:false,
        commentLikeArr: state.commentLikeArr.filter((el, i)=>{
          return el!==id
        })
      })
      if (type==='top') {
        this.state.topComments.map((el, i)=>{
          if (el.id === id) {
            el.likes -= 1;
          }
        })
      } else if (type==='regular') {
        this.state.memeDetails.comments.map((el, i)=>{
          if (el.id === id) {
            el.likes -= 1;
          }
        })
      } else if (type==='topreply') {
        this.state.replies.map((el, i)=>{
          if (el.id === id) {
            el.likes -=1;
          }
        })
      }
      axios.post(ENV.REACT_APP_BACKEND+'/api/commentUnlike/'+id, {user:props.user, type, meme: props.match.params.id, TC1: state.TC1, TC2: state.TC2, offset:state.commentPage}).then((response)=>{
        this.setState({
          commentLikeArr:state.commentLikeArr.filter((el, i)=>{
            return el!==id
          }),
          commentClickable:true,
        })
      }).catch((err)=>{
        console.log(err)
        if (type==='top') {
          this.state.topComments.map((el, i)=>{
            if (el.id === id) {
              el.likes += 1;
            }
          })
        } else if (type==='regular') {
          this.state.memeDetails.comments.map((el, i)=>{
            if (el.id === id) {
              el.likes -= 1;
            }
          })
        } else if (type==='topreply') {
          this.state.replies.map((el, i)=>{
            if (el.id === id) {
              el.likes -=1;
            }
          })
        }
        this.setState({
          commentClickable:true,
          commentLikeArr:state.commentLikeArr.concat(id)
        })
        IziToast.show({
          title:'Liking Error!',
          message:'Please make sure you are connected to the internet and try again in a few moments.',
          timeout:5000,
          color:'red',
          class:'izishow-login',
          theme:'light'
        })
      })
    } else {
      IziToast.show({
        title:'Not Logged In!',
        message:'Please log in before liking comments.',
        timeout:2000,
        color:'red',
        class:'izishow-login',
        theme:'light'
      })
    }
  }
  showReplies(id, element, type) {
    let target;
    if (type === 'regular') {
      target = `.meme-details-comments-element-bottom-top-${element-1}`;
    } else {
      target = `.meme-details-comments-element-bottom-${element-1}`;
    }
    if (element === 0 && type !== 'regular') {
      target = `.meme-details-leave-comment-section`
    } else if (element === 0 && type === 'regular') {
      target = `.meme-details-comments-element-bottom-1`
    }
    if (this.state.replyClickable) {
      this.setState({
        replies: [],
        replyLimit:10
      })
      this.state.commentExpanded.map((el, i)=>{
        if (el.id === id && !el.status) {
          this.setState({
            replyClickable:false,
          })
          axios.get(ENV.REACT_APP_BACKEND + '/api/getReplies/'+id+'?limit='+this.state.replyLimit).then((response)=>{
            this.setState({
              replyClickable:true,
              replies: response.data
            })
            let tl = new TimelineMax({});
            setTimeout(() => {
              tl.to(window, .7, {scrollTo:target});
            }, 50);
          })
          el.status = true;
        } else if (el.id === id && el.status) {
          el.status = false;
        } else {
          el.status = false;
        }
      })
      this.forceUpdate();
      this.likedStatus();
    }
  }
  reply(id, type) {
    let props = this.props,
    state = this.state,
    memeid = props.match.params.id,
    user = props.user,
    comment = this.topInputRef.value,
    date = new Date(),
    replyid = id,
    limit = this.state.replyLimit;
    if (!props.user) {
      IziToast.show({
        title:'Not Logged In!',
        message:'Please log in before commenting.',
        timeout:2000,
        color:'red',
        class:'izishow-login',
        theme:'light'
      })
    } else {
      if (this.topInputRef.value.length > 0) {
        if (type === 'top') {
          state.topComments.map((el, i)=>{
            if (el.id === id) {
              el.replies += 1;
            }
          })
        } else {
          state.memeDetails.comments.map((el, i)=>{
            if (el.id === id) {
              el.replies += 1;
            }
          })
        }
        this.topInputRef.value = '';
        axios.post(ENV.REACT_APP_BACKEND + '/api/postReply/', {user, date, comment, replyid, memeid, limit}).then((response)=>{
          this.setState({
            replies: response.data.replies
          })
        }).catch((err)=>{
          if (err) {
            if (type === 'top') {
              state.topComments.map((el, i)=>{
                if (el.id === id) {
                  el.replies -= 1;
                }
              })
            } else {
              state.memeDetails.comments.map((el, i)=>{
                if (el.id === id) {
                  el.replies -= 1;
                }
              })
            }
            IziToast.show({
              title:'Posting Failed!',
              message:'Please check your internet connection, or wait a few moments and try again.',
              timeout:5000,
              color:'red',
              class:'izishow-login',
              theme:'light'
            })
          }
        })
      }
    } 
  }
  hoverLoadMore() {
    let tl = new TimelineMax();
    tl.to(`.meme-details-comments-load-more-replies`, .1, {opacity: 1});
  }
  leaveLoadMore() {
    let tl = new TimelineMax();
    tl.to(`.meme-details-comments-load-more-replies`, .1, {opacity: .7});
  }
  loadMoreReplies(id) {
    axios.get(ENV.REACT_APP_BACKEND + '/api/getReplies/'+id+'?limit='+this.state.replyLimit+10).then((response)=>{
      this.setState({
        replyClickable:true,
        replies: response.data,
        replyLimit: this.state.replyLimit + 10
      })
    })
  }
  hoverDelete(i, type) {
    let tl = new TimelineMax();
    if (!i && !type) {
      tl.to(`.meme-details-comments-element-delete-meme`, .2, {opacity:1});
    }
      tl.to(`.meme-details-comments-element-delete-${type}-${i}`, .2, {opacity:1});
  }
  leaveDelete(i, type) {
    let tl = new TimelineMax();
    if (!i && !type) {
      tl.to(`.meme-details-comments-element-delete-meme`, .2, {opacity:.3});
    }
      tl.to(`.meme-details-comments-element-delete-${type}-${i}`, .2, {opacity:.3});
  }
  deleteComment(element, type) {
    if (!this.state.instance) {
      let id = element.id;
      let replyid;
        if (element.reply_id) {
          replyid = element.reply_id
        }
      console.log(element)
      console.log(this.state.memeDetails)
      IziToast.show({
        theme: 'dark',
        title: 'Are you sure you want to delete this comment?',
        position: 'center',
        class:'izishow-login',
        buttons: [
            ['<button>Yes, delete.</button>', (instance, toast)=>{
              instance.hide({}, toast, 'buttonName');
              if (type==='topreply') {
                this.state.topComments.map((el, i)=>{
                  if (el.id === replyid) {
                    el.replies -=1;
                  }
                })
                this.forceUpdate();
              } else if (type==='reply') {
                this.state.memeDetails.comments.map((el, i)=>{
                  if (el.id === replyid) {
                    el.replies -=1;
                  }
                })
                this.forceUpdate();
              } else {
                this.setState({
                  memeDetails: Object.assign({}, this.state.memeDetails, {details: Object.assign({}, this.state.memeDetails.details, {comments: this.state.memeDetails.details.comments - 1})}),
                })
              }
              axios.delete(ENV.REACT_APP_BACKEND+'/api/deleteComment/'+this.props.match.params.id+'/'+replyid+'?id='+id + '&type=' + type).then((response)=>{
                if (type === 'top') {
                  this.setState({
                    topComments: this.state.topComments.filter((el, i)=>{
                      return el.id !== id
                    })
                  })
                } else if (type === 'regular') {
                  this.setState({
                    memeDetails:Object.assign({}, this.state.memeDetails, {comments: this.state.memeDetails.comments.filter((el, i)=>{
                      return el.id !== id
                    })})
                  })
                } else {
                  this.setState({
                    replies: this.state.replies.filter((el, i)=>{
                      return el.id !== id
                    })
                  })
                }
                IziToast.show({
                  theme:'dark',
                  title:'deleted.',
                  position:'center',
                  class:'izishow-login',
                  timeout:2000,
                })
              }).catch((err)=>{
                IziToast.show({
                  color:'red',
                  title:'Error',
                  message:'Failed to delete comment. Please check your internet connection!',
                  position:'bottomRight',
                  class:'izishow-login',
                })
                if (type==='topreply') {
                  this.state.topComments.map((el, i)=>{
                    if (el.id === replyid) {
                      el.replies +=1;
                    }
                  })
                  this.forceUpdate();
                } else if (type==='reply') {
                  this.state.memeDetails.comments.map((el, i)=>{
                    if (el.id === id) {
                      el.comments +=1;
                    }
                  })
                  this.forceUpdate();
                } else {
                  this.setState({
                    memeDetails: Object.assign({}, this.state.memeDetails, {details: Object.assign({}, this.state.memeDetails.details, {comments: this.state.memeDetails.details.comments + 1})})
                  })
                }
              })
            }],
            ['<button>No, keep.</button>', (instance, toast)=>{
                instance.hide({}, toast, 'buttonName');
            }, true]
        ],
        onOpening: (instance, toast)=>{
          this.setState({
            instance: true
          })
        },
        onClosing: (instance, toast, closedBy)=>{
          this.setState({
            instance: false
          })
        }
      });
    }
  }
  hoverLike(element, type, condition) {
    let tl = new TimelineMax();
    if (!condition) {
      tl.to(`.meme-details-comments-element-likes-${type}-${element}`, .2, {opacity:1});
    }
  }
  leaveLike(element, type, condition) {
    let tl = new TimelineMax();
    if (!condition) {
      tl.to(`.meme-details-comments-element-likes-${type}-${element}`, .2, {opacity:.3});
    }
  }
  hoverComment(element, type) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-comments-element-replies-${type}-${element}`, .2, {opacity:1});
  }
  leaveComment(element, type) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-comments-element-replies-${type}-${element}`, .2, {opacity:.3});
  }
  deleteMeme() {
    let {props, state} = this;
    IziToast.show({
      theme: 'dark',
      title: 'Are you sure you want to delete this meme?',
      position: 'center',
      class:'izishow-login',
      buttons: [
          ['<button>Yes, delete.</button>', (instance, toast)=>{
            instance.hide({}, toast, 'buttonName');
            axios.delete(ENV.REACT_APP_BACKEND + '/api/deleteMeme/'+props.match.params.id+'/'+state.memeDetails.details.meme_id).then((response)=>{
              IziToast.show({
                theme:'dark',
                title:'deleted.',
                position:'center',
                class:'izishow-login',
                timeout:2000,
              })
              this.props.history.goBack();
            }).catch((err)=>{
              IziToast.show({
                color:'red',
                title:'Error',
                message:'Failed to delete meme. Please check your internet connection!',
                position:'bottomRight',
                class:'izishow-login',
              })
            })
          }],
          ['<button>No, keep.</button>', (instance, toast)=>{
              instance.hide({}, toast, 'buttonName');
          }, true]
      ],
      onOpening: (instance, toast)=>{
        this.setState({
          instance: true
        })
      },
      onClosing: (instance, toast, closedBy)=>{
        this.setState({
          instance: false
        })
      }
    });
  }
  render() {
    let match = this.props.match,
        props = this.props,
        state = this.state,
        context = this.context,
        image,
        caption,
        details,
        comments,
        leaveComment;
        moment.locale('en', {
          relativeTime: {
            future: 'in %s',
            past: '%s ago',
            s:  'seconds',
            ss: '%ss',
            m:  'a minute',
            mm: '%dm',
            h:  'an hour',
            hh: '%dh',
            d:  'a day',
            dd: '%dd',
            M:  'a month',
            MM: '%dM',
            y:  'a year',
            yy: '%dY'
          }
        });
        if (state.memeDetails && state.memeDetails.comments) {
          if (!props.user) {
            leaveComment = (
              <section className={`meme-details-comments-login-section`}>
                <h1 className={`meme-details-comments-login-heading`}>
                  Log in to leave comments!
                </h1>
                <a href={ENV.REACT_APP_BACKEND+'/auth'} onMouseEnter={()=>{this.hoverCommentButtons('login')}} onMouseLeave={()=>{this.leaveCommentButtons('login')}} className={`meme-details-leave-comment-section meme-details-comments-login-button`}>
                  Log In / Register
                </a>
              </section>
            )
          } else {
            leaveComment = (
              <section className={``}>
                <textarea ref={el => this.commentRef = el} className={'meme-details-comments-textarea'} maxLength={300} placeholder={'Write something funny!'}/>
                <div className={`meme-details-leave-comment-section meme-details-comments-submit`}>
                  <div onClick={(e)=>{this.submitComment(e)}} onMouseEnter={()=>{this.hoverCommentButtons('submit')}} onMouseLeave={()=>{this.leaveCommentButtons('submit')}} className={`meme-details-comments-submit-button`}>Comment</div>
                  <div onClick={(e)=>{this.commentRef.value = ''}} onMouseEnter={()=>{this.hoverCommentButtons('clear')}} onMouseLeave={()=>{this.leaveCommentButtons('clear')}} className={`meme-details-comments-clear-button`}>Clear</div>
                </div>
              </section>
            )
          }
          let returned;
          comments = (
            <section className={`meme-details-comments-section`}>
              <div className={`meme-details-comments-container`}>
                <h1 className={`meme-details-comments-heading`}>
                 {state.memeDetails.details.comments} comments
                </h1>
              </div>
              {leaveComment}
              {this.state.topComments.map((el, i)=>{
                return (
                  <section style={{backgroundColor: props.user && props.user.id === el.user_id? 'rgba(8, 13, 17, .3)' : 'transparent'}} key={i} className={`meme-details-comments-element-section`}>
                    <div className={`meme-details-comments-element-top`}>
                      <Link to={`/app/profile/${el.user_id}`} style={{backgroundImage:`url(${el.profile_picture? `${el.profile_picture}` : 'https://ifunny.co/images/icons/profile.svg'})`}} className={`meme-details-comments-element-user-image meme-details-comments-element-user-image-${el.id}`}/>
                      <div className={`meme-details-comments-element-right-side`}>
                        <p className={`meme-details-comments-element-paragraph`}>
                          {el.comment}
                        </p>
                        <div className={`meme-details-comments-element-user-container`}>
                          <div className={`meme-details-comments-element-top-comment`}/>
                          <Link style={{color: 'hsla(0,0%,100%,.6)'}} onMouseLeave={(e)=>{this.leaveUsername(e.target)}} onMouseEnter={(e)=>{this.hoverUsername(e.target)}} to={`/app/profile/${el.user_id}`} className={`meme-details-comments-element-username-paragraph meme-details-comments-element-username-paragraph-${el.id}`}>
                            {el.username}
                          </Link>
                          <p className={`meme-details-comments-element-date-paragraph`}>
                            {moment(el.date).fromNow()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={`meme-details-comments-element-bottom meme-details-comments-element-bottom-${i}`}>
                      <div className={`meme-details-comments-element-space`}/>
                      <div onMouseEnter={()=>{this.hoverLike(i, 'top', state.commentLikeArr && state.commentLikeArr.includes(el.id)? true:false)}} onMouseLeave={()=>{this.leaveLike(i, 'top', state.commentLikeArr && state.commentLikeArr.includes(el.id)? true:false)}} onClick={()=>{this.likeComment(el.id, 'top')}} style={state.commentLikeArr && state.commentLikeArr.includes(el.id)?{opacity:1}:{opacity:.3}} className={`meme-details-comments-element-likes meme-details-comments-element-likes-top-${i}`}>
                        {state.commentLikeArr && state.commentLikeArr.includes(el.id)? (<div className='meme-details-likes-image'/>):(<div className={`meme-details-comments-element-likes-image`}/>)}
                        <p style={{color: state.commentLikeArr && state.commentLikeArr.includes(el.id)?'#fc0':'white'}} className={`meme-details-comments-element-likes-paragraph meme-details-comments-element-likes-paragraph-${el.id}`}>
                          {el.likes}
                        </p>
                      </div>
                      <div onMouseEnter={()=>{this.hoverComment(i, 'top')}} onMouseLeave={()=>{this.leaveComment(i, 'top')}} className={`meme-details-comments-element-replies meme-details-comments-element-replies-top-${i}`}>
                        <div onClick={()=>{this.showReplies(el.id, i)}} className={`meme-details-comments-element-replies-image`}/>
                        <p className={`meme-details-comments-element-replies-paragraph meme-details-comments-element-replies-paragraph-${el.id}`}>
                          {el.replies}
                        </p>
                      </div>
                      {props.user.id === el.user_id || props.user.user_type==='admin' || state.memeDetails.details.user_id===props.user.id?(<div onMouseEnter={()=>{this.hoverDelete(i, 'top')}} onMouseLeave={()=>{this.leaveDelete(i, 'top')}} onClick={()=>{this.deleteComment(el, 'top')}} className={`meme-details-comments-element-delete meme-details-comments-element-delete-top-${i}`}/>):null}
                    </div>
                    {state.commentExpanded.map((cmtEl, i)=>{
                      if (cmtEl.id === el.id && cmtEl.status) {
                        return (
                          <section key={i} className={`meme-details-comments-element-replies-section`}>
                            {props.user?(<div className={`meme-details-comments-element-replies-input-container`}>
                              <input ref={el=>this.topInputRef = el} maxLength={300} placeholder={'Write something funny!'} className={`meme-details-comments-element-replies-input`}/>
                              <div onClick={()=>{this.reply(el.id, 'top')}} className={`meme-details-comments-element-replies-button`}>
                                Reply
                              </div>
                            </div>):null}
                            {state.replies.map((el, i)=>{
                              return (
                                <section style={{backgroundColor: props.user && props.user.id === el.user_id? 'rgba(8, 13, 17, .3)' : 'transparent'}} key={i} className={`meme-details-comments-element-section`}>
                                  <div className={`meme-details-comments-element-top`}>
                                    <Link to={`/app/profile/${el.user_id}`} style={{backgroundImage:`url(${el.profile_picture? `${el.profile_picture}` : 'https://ifunny.co/images/icons/profile.svg'})`}} className={`meme-details-comments-element-user-image meme-details-comments-element-user-image-${el.id}`}/>
                                    <div className={`meme-details-comments-element-right-side`}>
                                      <p className={`meme-details-comments-element-paragraph`}>
                                        {el.comment}
                                      </p>
                                      <div className={`meme-details-comments-element-user-container`}>
                                        <Link style={{color: 'hsla(0,0%,100%,.6)'}} onMouseLeave={(e)=>{this.leaveUsername(e.target)}} onMouseEnter={(e)=>{this.hoverUsername(e.target)}} to={`/app/profile/${el.user_id}`} className={`meme-details-comments-element-username-paragraph meme-details-comments-element-username-paragraph-${el.id}`}>
                                          {el.username}
                                        </Link>
                                        <p className={`meme-details-comments-element-date-paragraph`}>
                                          {moment(el.date).fromNow()}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={`meme-details-comments-element-bottom`}>
                                    <div className={`meme-details-comments-element-space`}/>
                                    <div onMouseEnter={()=>{this.hoverLike(i, 'topreply', state.commentLikeArr && state.commentLikeArr.includes(el.id)? true:false)}} onMouseLeave={()=>{this.leaveLike(i, 'topreply', state.commentLikeArr && state.commentLikeArr.includes(el.id)? true:false)}} onClick={()=>{this.likeComment(el.id, 'topreply')}} style={state.commentLikeArr && state.commentLikeArr.includes(el.id)?{opacity:1}:{opacity:.3}} className={`meme-details-comments-element-likes meme-details-comments-element-likes-topreply-${i}`}>
                                      {state.commentLikeArr && state.commentLikeArr.includes(el.id)? (<div className='meme-details-likes-image'/>):(<div className={`meme-details-comments-element-likes-image`}/>)}
                                      <p style={{color: state.commentLikeArr && state.commentLikeArr.includes(el.id)?'#fc0':'white'}} className={`meme-details-comments-element-likes-paragraph meme-details-comments-element-likes-paragraph-${el.id}`}>
                                        {el.likes}
                                      </p>
                                    </div>
                                    {props.user.id === el.user_id || props.user.user_type==='admin' || state.memeDetails.details.user_id===props.user.id?(<div onMouseEnter={()=>{this.hoverDelete(i, 'topreply')}} onMouseLeave={()=>{this.leaveDelete(i, 'topreply')}} onClick={()=>{this.deleteComment(el, 'topreply')}} className={`meme-details-comments-element-delete meme-details-comments-element-delete-topreply-${i}`}/>):null}
                                  </div>
                                </section>
                              )
                            })}
                            {state.replies.length%10 === 0 && state.replies.length>0? (
                              <div onClick={()=>this.loadMoreReplies(el.id)} onMouseEnter={()=>{this.hoverLoadMore()}} onMouseLeave={()=>{this.leaveLoadMore()}} className={`meme-details-comments-load-more-replies`}>
                                Load more replies
                              </div>
                            ):null}
                          </section>
                        )
                      }
                    })}
                  </section>
                )
              })}
              {this.state.memeDetails.comments.map((el, i)=>{
                return (
                  <section style={{backgroundColor: props.user && props.user.id === el.user_id? 'rgba(8, 13, 17, .3)' : 'transparent'}} key={i} className={`meme-details-comments-element-section`}>
                    <div className={`meme-details-comments-element-top`}>
                      <Link to={`/app/profile/${el.user_id}`} style={{backgroundImage:`url(${el.profile_picture? `${el.profile_picture}` : 'https://ifunny.co/images/icons/profile.svg'})`}} className={`meme-details-comments-element-user-image meme-details-comments-element-user-image-${el.id}`}/>
                      <div className={`meme-details-comments-element-right-side`}>
                        <p className={`meme-details-comments-element-paragraph`}>
                          {el.comment}
                        </p>
                        <div className={`meme-details-comments-element-user-container`}>
                          <Link style={{color: 'hsla(0,0%,100%,.6)'}} onMouseLeave={(e)=>{this.leaveUsername(e.target)}} onMouseEnter={(e)=>{this.hoverUsername(e.target)}} to={`/app/profile/${el.user_id}`} className={`meme-details-comments-element-username-paragraph meme-details-comments-element-username-paragraph-${el.id}`}>
                            {el.username}
                          </Link>
                          <p className={`meme-details-comments-element-date-paragraph`}>
                            {moment(el.date).fromNow()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={`meme-details-comments-element-bottom meme-details-comments-element-bottom-top-${i}`}>
                      <div className={`meme-details-comments-element-space`}/>
                      <div onMouseEnter={()=>{this.hoverLike(i, 'regular', state.commentLikeArr && state.commentLikeArr.includes(el.id)? true:false)}} onMouseLeave={()=>{this.leaveLike(i, 'regular', state.commentLikeArr && state.commentLikeArr.includes(el.id)? true:false)}} onClick={()=>{this.likeComment(el.id, 'regular')}} style={state.commentLikeArr && state.commentLikeArr.includes(el.id)?{opacity:1}:{opacity:.3}} className={`meme-details-comments-element-likes meme-details-comments-element-likes-regular-${i}`}>
                        {state.commentLikeArr && state.commentLikeArr.includes(el.id)? (<div className='meme-details-likes-image'/>):(<div className={`meme-details-comments-element-likes-image`}/>)}
                        <p style={{color: state.commentLikeArr && state.commentLikeArr.includes(el.id)?'#fc0':'white'}} className={`meme-details-comments-element-likes-paragraph meme-details-comments-element-likes-paragraph-${el.id}`}>
                          {el.likes}
                        </p>
                      </div>
                      <div onMouseEnter={()=>{this.hoverComment(i, 'regular')}} onMouseLeave={()=>{this.leaveComment(i, 'regular')}} className={`meme-details-comments-element-replies meme-details-comments-element-replies-regular-${i}`}>
                        <div onClick={()=>{this.showReplies(el.id, i, 'regular')}} className={`meme-details-comments-element-replies-image`}/>
                        <p className={`meme-details-comments-element-replies-paragraph meme-details-comments-element-replies-paragraph-${el.id}`}>
                          {el.replies}
                        </p>
                      </div>
                      {props.user.id === el.user_id || props.user.user_type==='admin' || state.memeDetails.details.user_id===props.user.id?(<div onMouseEnter={()=>{this.hoverDelete(i, 'regular')}} onMouseLeave={()=>{this.leaveDelete(i, 'regular')}} onClick={()=>{this.deleteComment(el, 'regular')}} className={`meme-details-comments-element-delete meme-details-comments-element-delete-regular-${i}`}/>):null}
                    </div>
                    {state.commentExpanded.map((cmtEl, i)=>{
                      if (cmtEl.id === el.id && cmtEl.status) {
                        return (
                          <section key={i} className={`meme-details-comments-element-replies-section`}>
                            {props.user?(<div className={`meme-details-comments-element-replies-input-container`}>
                              <input ref={el=>this.topInputRef = el} maxLength={300} placeholder={'Write something funny!'} className={`meme-details-comments-element-replies-input`}/>
                              <div onClick={()=>{this.reply(el.id, 'regular')}} className={`meme-details-comments-element-replies-button`}>
                                Reply
                              </div>
                            </div>):null}
                            {state.replies.map((el, i)=>{
                              return (
                                <section style={{backgroundColor: props.user && props.user.id === el.user_id? 'rgba(8, 13, 17, .3)' : 'transparent'}} key={i} className={`meme-details-comments-element-section`}>
                                  <div className={`meme-details-comments-element-top`}>
                                    <Link to={`/app/profile/${el.user_id}`} style={{backgroundImage:`url(${el.profile_picture? `${el.profile_picture}` : 'https://ifunny.co/images/icons/profile.svg'})`}} className={`meme-details-comments-element-user-image meme-details-comments-element-user-image-${el.id}`}/>
                                    <div className={`meme-details-comments-element-right-side`}>
                                      <p className={`meme-details-comments-element-paragraph`}>
                                        {el.comment}
                                      </p>
                                      <div className={`meme-details-comments-element-user-container`}>
                                        <Link style={{color: 'hsla(0,0%,100%,.6)'}} onMouseLeave={(e)=>{this.leaveUsername(e.target)}} onMouseEnter={(e)=>{this.hoverUsername(e.target)}} to={`/app/profile/${el.user_id}`} className={`meme-details-comments-element-username-paragraph meme-details-comments-element-username-paragraph-${el.id}`}>
                                          {el.username}
                                        </Link>
                                        <p className={`meme-details-comments-element-date-paragraph`}>
                                          {moment(el.date).fromNow()}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={`meme-details-comments-element-bottom`}>
                                    <div className={`meme-details-comments-element-space`}/>
                                    <div onMouseEnter={()=>{this.hoverLike(i, 'reply', state.commentLikeArr && state.commentLikeArr.includes(el.id)? true:false)}} onMouseLeave={()=>{this.leaveLike(i, 'reply', state.commentLikeArr && state.commentLikeArr.includes(el.id)? true:false)}} onClick={()=>{this.likeComment(el.id, 'topreply')}} style={state.commentLikeArr && state.commentLikeArr.includes(el.id)?{opacity:1}:{opacity:.3}} className={`meme-details-comments-element-likes meme-details-comments-element-likes-reply-${i}`}>
                                      {state.commentLikeArr && state.commentLikeArr.includes(el.id)? (<div className='meme-details-likes-image'/>):(<div className={`meme-details-comments-element-likes-image`}/>)}
                                      <p style={{color: state.commentLikeArr && state.commentLikeArr.includes(el.id)?'#fc0':'white'}} className={`meme-details-comments-element-likes-paragraph meme-details-comments-element-likes-paragraph-${el.id}`}>
                                        {el.likes}
                                      </p>
                                    </div>
                                    {props.user.id === el.user_id || props.user.user_type==='admin' || state.memeDetails.details.user_id===props.user.id?(<div onMouseEnter={()=>{this.hoverDelete(i, 'reply')}} onMouseLeave={()=>{this.leaveDelete(i, 'reply')}} onClick={()=>{this.deleteComment(el, 'reply')}} className={`meme-details-comments-element-delete meme-details-comments-element-delete-reply-${i}`}/>):null}
                                  </div>
                                </section>
                              )
                            })}
                            {state.replies.length%10 === 0 && state.replies.length>0? (
                              <div onClick={()=>this.loadMoreReplies(el.id)} onMouseEnter={()=>{this.hoverLoadMore()}} onMouseLeave={()=>{this.leaveLoadMore()}} className={`meme-details-comments-load-more-replies`}>
                                Load more replies
                              </div>
                            ):null}
                          </section>
                        )
                      }
                    })}
                  </section>
                )
              })}
              <div className={`meme-details-comments-pages`}>
                <button onClick={()=>{state.commentPage===1? null : this.updateComments('back')}} style={state.commentPage===1?{cursor:'not-allowed'}:{cursor:'pointer'}} className={`meme-details-comments-pages-back`}/>
                <div className={`meme-details-comments-pages-count`}>
                  {state.commentPage}
                </div>
                <button onClick={()=>{((state.commentPage * 10) + 2) >= state.memeDetails.details.comments? null : this.updateComments('forward')}} style={((state.commentPage * 10) + 2) >= state.memeDetails.details.comments?{cursor:'not-allowed'}:{cursor:'pointer'}} className={`meme-details-comments-pages-forward`}/>
              </div>
            </section>
          );
        }
        if (state.memeDetails && state.memeDetails.details) {
          if (state.memeDetails.details.picture) {
            image = (
              <img src={state.memeDetails.details.picture} style={{width:'100%', height:'auto', borderTopRightRadius:'10px', borderTopLeftRadius:'10px'}} className='meme-details-image-section-image'/>
            )
          }
          if (state.memeDetails.details.caption) {
            caption = (
              <div className='meme-details-caption'>
                {state.memeDetails.details.caption}
              </div>
            )
          }
          if (state.memeDetails.details && state.memeDetails.details.username) {
            details = (
              <section className='meme-details-details-section'>
                <div className='meme-details-details-left-side'>
                  <div className='meme-details-details-top-container'>
                  {state.memeDetails.tags.length>0? (
                    <div className='meme-details-details-tags'>
                      {state.memeDetails.tags.map((el, i)=>{
                        return (
                          <Link to={`/app/tags/${el.tag_text}`} key={i} onMouseLeave={()=>{this.leaveTag(i)}} onMouseEnter={()=>{this.hoverTag(i)}} className={`meme-details-details-tag-el meme-tag-${i}`}> 
                            #{el.tag_text}
                          </Link>
                        )
                      })}
                    </div>
                  ): null}
                    <div className='meme-details-details-right-side'>
                      <div onClick={()=>{this.likeMeme()}} style={state.liked?{opacity:1}:{opacity:.5}} className='meme-details-details-likes' onMouseLeave={()=>{this.leaveStats('likes')}} onMouseEnter={()=>{this.hoverStats('likes')}}>
                        {state.liked? (<div className='meme-details-likes-image'/>):(<img src='https://ifunny.co/images/icons/smile-small.svg' style={{height:'22px', width:'22px', minHeight:'22px', minWidth:'22px'}}/>)}
                        <p style={state.liked?{color:'#fc0'}:{color:'white'}} className='meme-details-details-likes-count'>{state.memeDetails.details.likes}</p>
                      </div>
                      <div className='meme-details-details-comments' onMouseLeave={()=>{this.leaveStats('comments')}} onMouseEnter={()=>{this.hoverStats('comments')}}>
                        <img className='meme-details-details-comments-image' src='https://ifunny.co/images/icons/comments.svg' style={{height:'22px', width:'22px'}}/>
                        <p className='meme-details-details-comment-count'>{state.memeDetails.details.comments}</p>
                      </div>
                    </div>
                  </div>
                  <div className='meme-details-details-username'>
                    by <Link style={{color: 'hsla(0,0%,100%,.6)'}} to={`/app/profile/${this.state.memeDetails.details.user_id}`} onMouseLeave={(e)=>{this.leaveUsername(e.target)}} onMouseEnter={(e)=>{this.hoverUsername(e.target)}} className='meme-details-details-username-text'>{state.memeDetails.details.username}</Link>
                  </div>
                  <div className='meme-details-details-bottom-container'>  
                    <div className='meme-details-details-social-media'>
                      <div style={{opacity:1}} onMouseEnter={(e)=>{this.hoverSocialMedia('fb')}} onMouseLeave={(e)=>{this.leaveSocialMedia('fb')}} className='meme-details-fb-hover'>
                        <FacebookShareButton 
                          style={{height:'36px', width:'36px', borderRadius:'50%', outline:'none', cursor:'pointer'}}
                          url={ENV.REACT_APP_FRONTEND+'/app/memes/'+this.props.match.params.id} 
                          quote={state.memeDetails.details.caption} 
                          windowWidth={800}
                          windowHeight={530}
                          hashtag={'#iFunny'}>      
                          <FacebookIcon size={36} round/>
                        </FacebookShareButton>
                      </div>
                      <div style={{opacity:1}} onMouseEnter={(e)=>{this.hoverSocialMedia('tt')}} onMouseLeave={(e)=>{this.leaveSocialMedia('tt')}} className='meme-details-tt-hover'>
                        <TwitterShareButton 
                          style={{height:'36px', width:'36px', borderRadius:'50%', outline:'none', cursor:'pointer'}}
                          title={state.memeDetails.details.caption}
                          hashtags={state.memeDetails.tags.map((el)=>{return el.tag_text})}
                          windowWidth={800}
                          windowHeight={530}
                          url={ENV.REACT_APP_FRONTEND+'/app/memes/'+this.props.match.params.id}
                          >   
                          <TwitterIcon size={36} round/>
                        </TwitterShareButton>
                      </div>
                      {this.props.user.user_type==='admin'?
                      (<div className={`meme-details-details-more`} onMouseLeave={(e)=>{this.leaveButton('more')}} onMouseEnter={(e)=>{this.hoverButton('more')}}>
                        <div onClick={()=>{this.featureMeme(state.memeDetails.details)}} className='meme-details-details-featured-image'/>
                      </div>):null}
                      {state.memeDetails.details.user_id===props.user.id || this.props.user.user_type==='admin'? 
                      (<div className={``}>
                        {<div onMouseEnter={()=>{this.hoverDelete()}} onMouseLeave={()=>{this.leaveDelete()}} onClick={()=>{this.deleteMeme()}} className={`meme-details-comments-element-delete-meme`}/>}
                      </div>):null}
                    </div>
                    <div className='meme-details-details-arrows'>
                      <div onClick={()=>{this.setState({method:state.memeDetails.prev_id}),this.props.history.push(`/app/memes/${state.memeDetails.prev_id}`)}} className='meme-details-details-back-arrow' onMouseLeave={(e)=>{this.leaveButton('back-arrow')}} onMouseEnter={(e)=>{this.hoverButton('back-arrow')}}>
                        <img className='meme-details-details-back-arrow-image' src='https://ifunny.co/images/icons/arrow-back.svg' style={{height:'14px', width:'8px'}}/>
                      </div>
                      <div onClick={()=>{this.setState({method:state.memeDetails.next_id}),this.props.history.push(`/app/memes/${state.memeDetails.next_id}`)}} className='meme-details-details-forward-arrow' onMouseLeave={(e)=>{this.leaveButton('forward-arrow')}} onMouseEnter={(e)=>{this.hoverButton('forward-arrow')}}>
                        <img className='meme-details-details-forward-arrow-image' src='https://ifunny.co/images/icons/arrow-forward.svg' style={{height:'14px', width:'8px'}}/>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          }
        }
        
    return (
      <main className='MemeDetails'>
        <section className='meme-details-image-section'>
          {image}
        </section>
        <section className='meme-details-caption-section'>
          {caption}
        </section>
        <section className='meme-details-meme-details-section'>
          {details}
        </section>
        <section className='meme-details-meme-comments-section'>
          {comments}
        </section>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.sessionUser
  }
}

export default connect(mapStateToProps)(MemeDetails);