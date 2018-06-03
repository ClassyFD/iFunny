import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TimelineMax } from 'gsap';
import {MultiSelect} from 'react-selectize';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import UploadIcon from '../../Images/Icons/upload-icon.svg';
import { withRouter } from 'react-router';
import moment from 'moment';
import './MemeEditing.css';

const ENV = require('../../frontenv');
class MemeEditing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image:'',
      imageHeight:'',
      imageWidth:'500px',
      replaced:false,
      preview:true,
      caption:'',
      tagValues:'',
      error:'',
      username:'',
      userError:'',
      userState:''
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'MOUNT_COMP',
      val: 'editing'
    })
    if (this.props && !this.props.user) {
      this.props.history.goBack();
    }
  }
  componentDidMount() {

  }

  componentWillReceiveProps(props) {
    
  }

  handleUsername(val) {
    this.setState({
      username:val
    })
    if (val.length < 4) {
      this.setState({
        userError:'Username is too short!'
      })
    } else if (val.length > 25) {
      this.setState({
        userError:'Username is too long!'
      })
    } else if (!(/^\w+$/i.test(val))) {
      this.setState({
        userError:'Username can only contain numbers and letters!'
      })
    } else {
      this.setState({
        userError:''
      })
    }
  }
  submitUsername(username) {
    if (!this.props.user.username && username.length > 3 && username.length < 26 && /^\w+$/i.test(username)) {
      axios.post(ENV.REACT_APP_BACKEND+'/api/submitUsername', {username, user:this.props.user}).then((response)=>{
        if (response.data==='Username Taken') {
          this.setState({
            userError:'Username Taken'
          })
        } else {
          this.setState({
            userError:'',
            userState:'submitted',
            error:''
          })
          this.props.dispatch({
            type: 'UPDATE_USER',
            val: response.data,
          })
        }
      })
    }
  }
  handleFile(fileArray, callback) {
    let tl = new TimelineMax();
    const reader = new FileReader(),
          file = fileArray[0];
    reader.onload = (upload) => {
      let fileType= upload.currentTarget.result.replace(/data:([^;]*);.*$/,"$1");
      let pic={
        imageBody:upload.currentTarget.result,
        imageName: Math.random().toString(26).substring(1,20)+'+'+file.name,
        imageExtension: fileType
      }
      axios.post(ENV.REACT_APP_BACKEND + '/api/upload', {pic: pic}).then((response) => {
        this.setState({
          image:response.data
        })
      }).catch((err)=>{
        console.log(err);
      })
    };
    reader.readAsDataURL(file);
    tl.to('.meme-editing-image-crop', 0, {opacity:0})
      .to('.meme-editing-image-crop', .5, {opacity:1}, '+=1.5');
  }

  cropImage(){
    if (!this.state.preview && this.state.image) {
      this.setState({
        replaced:false,
      })
      let body = this.refs.cropper.getCroppedCanvas().toDataURL();
      let fileType= body.replace(/data:([^;]*);.*$/,"$1");
      let pic={
        imageBody:body,
        imageExtension: fileType,
        imageName: Math.random().toString(26).substring(1,10) + '-' + 'cropped' + '-' + Math.random().toString(26).substring(1,10),
      }
      axios.post(ENV.REACT_APP_BACKEND + '/api/upload', {pic: pic}).then((response) => {
        this.readyForCrop();
        this.setState({
          image:response.data,
          preview:true
        })
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
  imageReady() {
    let data = this.refs.cropper.getImageData();
    this.setState({
      imageHeight:data.height + 'px',
      imageWidth:data.width + 'px',
    })
    if (!this.state.replaced) {
      this.refs.cropper.replace(this.state.image.Location);
      this.setState({
        replaced:true
      })
    }
  }
  readyForCrop() {
    let tl = new TimelineMax();
    tl.to('.meme-editing-image-crop', 0, {opacity:0})
      .to('.meme-editing-image-crop', .5, {opacity:1}, '+=1');
  }
  switchMode() {
    if (this.state.preview) {
      this.setState({
        preview:false, 
        replaced:false, 
        imageHeight:''
      });
      if (this.state.image) {
        this.readyForCrop();
      }
    } else {
      this.setState({
        preview:true, 
        replaced:false, 
        imageHeight:''
      });
    }
  }
  handleChange(val) {
    if (!this.state.caption) {
      let tl = new TimelineMax();
      tl.to('.meme-editing-caption', .5, {opacity:1, height:'auto'})
    }
    this.setState({
      caption:val
    })
    if (!val) {
      let tl = new TimelineMax();
      tl.to('.meme-editing-caption', .5, {opacity:0, height:'0'})
    }
  }
  postMeme() {
    let state = this.state,
        meme = {},
        date = new Date();
        date = moment(date).utc().format('MM-DD-YYYY');
    if (state.caption) {
      meme = Object.assign({}, meme, {caption:state.caption})
    }
    if (state.tagValues) {
      meme = Object.assign({}, meme, {tags:state.tagValues})
    }
    if (this.props.user && this.props.user.username) {
      this.setState({
        userState: ''
      })
      if (state.image) {
      this.setState({
        error: ''
      })
        meme = Object.assign({}, meme, {image:state.image});
        axios.post(ENV.REACT_APP_BACKEND+'/api/postMeme', {meme, user:this.props.user, date}).then((response)=>{
          this.props.history.push('/app/memes/'+response.data[0].id)
        }).catch((err)=>{
          this.setState({
            error: 'Image upload error! Please try again in a couple of minutes.'
          });
        });
      } else {
        this.setState({
          error: 'You must upload an Image first!'
        })
      }
    } else {
      this.setState({
        error: 'You currently do not have a username!'
      })
    }
  }
  hoverButton(target) {
    let tl = new TimelineMax();
    tl.to(`.hover-button-${target}`, .2, {borderColor:'rgba(255,204,0,.7)'})
  }
  leaveButton(target) {
    let tl = new TimelineMax();
    tl.to(`.hover-button-${target}`, .2, {borderColor:'rgba(255,204,0,.3)'})
  }
  render() {
    let state=this.state,
        props=this.props,
        image,
        caption;
    if (state.preview && state.image) {
      image = (
        <img src={state.image.Location} style={{width:'90%', height: 'auto', margin: '0 auto' }}/>
      )
    } else if (state.image) {
      image = (
        <Cropper
        ref='cropper'
        src={state.image.Location}
        style={{minHeight:'100px',height:state.imageHeight, width:state.imageWidth, margin:'0 auto'}}
        ready={this.imageReady.bind(this)}
        guides={false}/>
      )
    } else {
      image = (
        <Dropzone title='Add Image' style={{width:'290px', height: '300px', margin:'0 auto', background:`url(${UploadIcon})`, backgroundSize:'cover', backgroundRepeat: 'no-repeat', backgroundPosition:'center center'}} multiple={false} accept="image/*" onDrop={(e)=>this.handleFile(e)}/>
      );
    }
    if (this.state) {
      caption = (
        <div style={{opacity:0}} className='meme-editing-caption'>
          {this.state.caption}
        </div>
      )
    }
    return (
      <main className='MemeEditing'>
        <div className='meme-editing-main-container'>
          <section className='meme-editing-left-section'>
            <div className='meme-editing-image-crop' style={{height:'auto', width:'100%'}}>
              {image}
              {caption}
            </div>
            <div className='meme-editing-left-section-container'>
              <div onMouseEnter={()=>{this.hoverButton('mode')}} onMouseLeave={()=>{this.leaveButton('mode')}} onClick={()=>{this.switchMode()}} className='meme-editing-left-section-container-post hover-button-mode'>
                {!this.state.preview?'Preview Mode':'Crop Mode'}
              </div>
              <div onMouseEnter={()=>{this.hoverButton('remove')}} onMouseLeave={()=>{this.leaveButton('remove')}} onClick={()=>{this.setState({image:'', replaced:false, imageHeight:''})}} className='meme-editing-left-section-container-replace hover-button-remove'>
                Remove Image
              </div>
              <div onMouseEnter={()=>{this.hoverButton('crop')}} onMouseLeave={()=>{this.leaveButton('crop')}} onClick={()=>{this.cropImage()}} style={{display:state.preview?'none':'inline'}} className='meme-editing-left-section-container-crop hover-button-crop'>
                Crop Image
              </div>
            </div>
          </section>
          <section className='meme-editing-right-section'>
            <div className='meme-editing-right-section-caption-title'>
              Add Caption
            </div>
            <input onChange={(e)=>{this.handleChange(e.target.value)}} maxLength={300} className='meme-editing-right-section-input' placeholder='Add a Caption!' defaultValue=''/>
            <div className='meme-editing-right-section-tag-title'>
              Add #Tags
            </div>
            <div className='meme-editing-select-container'>
              <MultiSelect className='multiselect' maxLength={28} style={{minWidth: '300px', maxWidth:'300px', color:'white'}} theme='material' maxValues = {5} 
                createFromSearch = {(options, values, search)=>{
                  let labels = values.map((e)=>{ 
                    return e.label;
                  })
                  if (search.trim().length == 0 || labels.indexOf(search.trim()) != -1) {
                    return null;
                  } 
                  if (search.replace(/\s/g,'').length > 1 && search.replace(/\s/g,'').length < 29) {
                    return {
                      label: search.trim().replace(/\s/g,''), value: search.trim().replace(/\s/g,'')
                    };
                    
                  } 
                  return null;
                }} renderValue={(val)=>{
                  return (
                    <div  className='test' style={{padding:'5px', margin:'3px', textAlign:'center', cursor:'pointer', paddingLeft:'15px', paddingRight:'15px', borderRadius:'20px', border:'2px solid rgba(255,204,0,.3)', color:'#fc0', fontFamily:'iFunnyBold'}} className=''>
                      {'#'+val.label}
                    </div>
                  )
                }} renderNoResultsFound={(item, search)=>{
                  if (search.replace(/\s/g,'').trim().length <= 1) {
                    return (
                      <div className='multi-long'>
                        #Tag is too short!
                      </div>
                    )
                  } else if (search.replace(/\s/g,'').trim().length >= 29) {
                    return (
                      <div className='multi-short'>
                        #Tag is too long!
                      </div>
                    )
                  }
                }} renderOption={(item)=>{
                  return (
                    <div className='multi-render-option'>
                      {`Add '${item.value}' to #Tags`}
                    </div>
                  )
                }} onValuesChange={(values)=>{
                  this.setState({
                    tagValues: values
                  })
              }}/>
              <div onMouseEnter={()=>{this.hoverButton('post')}} onMouseLeave={()=>{this.leaveButton('post')}} onClick={()=>{this.postMeme()}} className='meme-editing-right-section-post-meme hover-button-post'>
                Post Meme
              </div>
              <div className='meme-editing-right-section-error'>
                {state.error}
                {state.error==='You currently do not have a username!'? (
                  <input onChange={(e)=>{this.handleUsername(e.target.value)}} className='meme-editing-right-section-username-input' placeholder='What would you like to be called?' defaultValue=''/>
                ) : null}
                {state.error==='You currently do not have a username!' && !state.userError? (
                  <div className=''>
                    {25-state.username.length} characters remaining.
                  </div>
                ): state.error==='You currently do not have a username!' && state.userError? (
                  <div className='meme-editing-right-side-user-error'>
                    {state.userError}
                  </div>
                ) : null}
                {state.error==='You currently do not have a username!'? (
                  <div onMouseEnter={()=>{this.hoverButton('submit')}} onMouseLeave={()=>{this.leaveButton('submit')}} onClick={()=>{this.submitUsername(state.username)}} className='meme-editing-right-section-username-submit hover-button-submit'>
                    Submit Username
                  </div>
                ) : null}
                {state.userState==='submitted'? (
                  <div className='meme-editing-right-section-finished'>
                    Username Submitted! Welcome, {state.username}!
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      </main>
    )
  }
}
function mapStateToProps(state) {
  return {
    user: state.sessionUser
  }
}
export default withRouter(connect(mapStateToProps)(MemeEditing));