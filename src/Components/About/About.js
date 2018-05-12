import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import './About.css';
import { TimelineMax } from 'gsap';
const ENV = require('../../frontenv');
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'MOUNT_COMP',
      val: 'about'
    })
    let ltl = new TimelineMax();
    ltl.to(window, .5, {scrollTo:0});
  }

  componentWillReceiveProps(props) {
  }
  createCarousel() {
    let arr = [],
        usernames = [
          `Theboss8`,
          `Dino`,
          `BiebersSquishy`,
          `Music fanatic`,
          `Donna`,
          `Ashykicker`,
          `Jonny5796`,
          `Ghef`,
          `Theman`,
          `Bryah_moreno`,
          `Ashton`,
          `Bbbboy`,
          `Sardo P`,
          `Old geyser`,
          `Dark`,
          `Kuice`,
          `Dntgtcjd`,
          `Dakota`,
          `Northernmes`,
          `PikaPika`,
          `Olig`,
          `Levitsky`,
          `Awesome rater`,
          `Spfaduln`,
          `Melina`,
          `T.bone`
        ],
        quotes = [
          `I would leave an actual review but I'd rather get back on iFunny.`,
          `Many apps have come and gone on my phone. But iFunny has always stayed. I can't imagine life without it.`,
          `I check iFunny every night before I fall asleep and it makes me sleep with a smile on my face (:`,
          `If you don't have iFunny then you don't have a life! Get a life and download iFunny.`,
          `I begin my day and end my day with iFunny.`,
          `Yes it's that good I sold my soul for it.`,
          `This app keeps me more occupied than sex with a porcupine`,
          `If you take everything good about the Internet and mash it all together you get iFunny.`,
          `iFunny has changed my life.`,
          `it's like bacon wrapped in bacon with a side of bacon, it's flippen hilarious.`,
          `It all started 2 years ago when I discovered this app! Now, my parents can't even look at me because my skin is so blindingly white from staying on iFunny in my room with my shades drawn. The townspeople refer to me as the smiling man, but I don't care!`,
          `Best way ever to ignore your teacher/boss. I mean, you deserve a break, don't you? Enjoy this one on iFunny.`,
          `Warning. Use of iFunny can cause severe side effects. Laughter. Crying. Attachment to iPhone. And long time in the bathroom. Great app.`,
          `I have been on the toilet for 14 hours now and I can't look away from my phone. I'm starving and can't open the lock. My hands are stuck and my thumbs are about to fall off. Send help fast.`,
          `I have never been so happy about breaking my leg...`,
          `This is my most used app! It is like mind candy. Whenever you have a minute, have a few laughs! A continual feed of funny.`,
          `It made me funny... I have learn confidence... I have learn the meaning of life during my journey of iFunny, i wouldn’t imagine life without iFunny. iFunny is life, iFunny is love.`,
          `I am 16 years old, and have struggled with severe depression for as long as I can remember. On September 27th of last year, I attempted suicide and was pronounced dead for over 10 minutes. After waking up from a week long coma, I was shuttled to mental rehab where I spent the next six months. I was released on superbowl day. When I got home, I got my phone and decided to download a new app or two, as I didn't have any games or anything of the sort on it. Your App, iFunny, was the first one on the list of recommended that day. So I downloaded it. And from there on out, every time I feel a little depression coming on, or even if I'm just bored, your app has always been able to put a smile on my face. So thank you, iFunny team, for making the coolest young adult app on the market :)`,
          `I was hanging off the edge of a cliff after an avalanche and as I was trying to find a decent grip, my phone notified me that there were new features. I used my right hand to start looking though them and because of this I couldn't hold on with just my left hand. I fell 30 feet to the ground and I couldn't even get through all the features. Luckily I only broke every bone in my body except my right hand (which I'm using to write this review with). Good app but beware. I'd say the safest place to use this is on the toilet but that's just me.`,
          `Tell my family that I died while laughing.`,
          `Probably the only app I can say that I have used for 6 straight hours.`,
          `iFunny has been a part of my life for years now. Best app decision of my life.`,
          `First app I download when I get a new iPhone or iPod.`,
          `I showed the app to my dad. He tells me about the new features before I even notice them.I think it might be the root of our economic issues.`,
          `I go on my phone about 17 hours in a day and about 16 1/2 of those hours are spent on iFunny.`,
          `Why does this app not have any awards yet. Like, iFunny is more famous than Batman. Seriously this app is like Leonardo Dicaprio. So much talent packed into one single thing! Yet no awards.`
        ],
        images = [
          `feelgood`,
          `ironic`,
          `joy`,
          `lol`,
          `moustache`,
          `neutral`,
          `wink`,
          `yum`
        ]
    for (var i = 0; i<26; i++) {
      arr.push(
        <main key={i} className='about-carousel-element'>
          <div className='about-carousel-styled-element'>
            <section className='about-carousel-styled-element-top-section'>
              <div className='about-carousel-styled-element-top-section-quote'>{quotes[i]}</div>
            </section>
            <section className='about-carousel-styled-element-bottom-section'>
              <div style={{height:'32px', width:'32px', backgroundSize:'cover', backgroundPosition:'center center', backgroundImage: `url('https://ifunny.co/images/icons/smiley-${images[Math.floor(Math.random() * (7-0 + 1))]}.svg')`}} className='about-carousel-styled-element-bottom-section-image'/>
              <div className='about-carousel-styled-element-bottom-section-username'>
                {usernames[i]}
              </div>
            </section>
          </div>
        </main>
      )
    }
    return arr;
  }
  hoverSocialMedia(target, num) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-${target}-hover`, .1, {opacity:1})
  }
  leaveSocialMedia(target, num) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-${target}-hover`, .1, {opacity:.7})
  }
  hoverSources(target) {
    let tl = new TimelineMax();
    tl.to(`.about-bottom-section-sources-${target}`, .1, {opacity:1})
  }
  leaveSources(target) {
    let tl = new TimelineMax();
    tl.to(`.about-bottom-section-sources-${target}`, .1, {opacity:.6})
  }
  render() {
    let carouselElements = this.createCarousel();
    return (
      <main className='About'>
        <section className='about-top-section'>
          <div className='about-top-section-image'/>
          <div className='about-top-section-title'>
          There are millions of mobile apps. And then there is iFunny :)
          </div>
        </section>
        <section className='about-middle-section'>
          <div className='about-middle-unlike-paragraph'>
            Unlike others, it doesn't ask for much. iFunny just gives you a smile when you most need it.
          </div>
          <div className='about-middle-popular-paragraph'>
            Even after being named 
            <a href={'http://bit.ly/1tyzfBH'}  className='about-middle-popular-span'>TOP 10 most popular apps in the US</a>
            , iFunny stays humble and is ready for new heights. After all, we still have to make the whole world smile.
          </div>
          <div className='about-middle-partnership-paragraph'>
            For partnership proposal contact 
            <a href={'mailto:partnership@fun.co'} className='about-middle-partnership-span'>partnership@fun.co</a>
            .
          </div>
        </section>
        <section className='about-carousel-section'>
          <Carousel showThumbs={false} infiniteLoop={true} showIndicators={false} className='about-carousel-carousel'>
            {carouselElements}
          </Carousel>
        </section>
        <section className='about-bottom-section'>
          <div className='about-bottom-section-seen'>
            as not seen yet in ;)
          </div>
          <div className='about-bottom-section-line'/>
          <section className='about-bottom-section-sources-container'>
            <div className='about-bottom-section-sources-top'>
              <a href={'https://www.wsj.com/'} target={'_blank'} onMouseLeave={()=>{this.leaveSources('wall')}} onMouseEnter={()=>{this.hoverSources('wall')}} className='about-bottom-section-sources-wall'/>
              <a href={'https://techcrunch.com/'} target={'_blank'} onMouseLeave={()=>{this.leaveSources('tech')}} onMouseEnter={()=>{this.hoverSources('tech')}} className='about-bottom-section-sources-tech'/>
            </div>
            <div className='about-bottom-section-sources-bottom'>
              <a href={'http://www.wired.com/'} target={'_blank'} onMouseLeave={()=>{this.leaveSources('wired')}} onMouseEnter={()=>{this.hoverSources('wired')}} className='about-bottom-section-sources-wired'/>
              <a href={'http://www.forbes.com/'} target={'_blank'} onMouseLeave={()=>{this.leaveSources('forbes')}} onMouseEnter={()=>{this.hoverSources('forbes')}} className='about-bottom-section-sources-forbes'/>
            </div>
          </section>
          <div className='meme-details-details-social-media'>
            <div style={{opacity:.7, zIndex:2}} onMouseEnter={(e)=>{this.hoverSocialMedia('fb')}} onMouseLeave={(e)=>{this.leaveSocialMedia('fb')}} className='meme-details-fb-hover about-social-media-selector'>
              <FacebookShareButton 
                style={{height:'36px', width:'36px', borderRadius:'50%', outline:'none', cursor:'pointer'}}
                url={ENV.REACT_APP_FRONTEND} 
                quote={'Check out iFunny!'} 
                windowWidth={800}
                windowHeight={530}
                hashtag={'#iFunny'}>      
                <FacebookIcon size={36} round/>
              </FacebookShareButton>
            </div>
            <div style={{opacity:.7}} onMouseEnter={(e)=>{this.hoverSocialMedia('tt')}} onMouseLeave={(e)=>{this.leaveSocialMedia('tt')}} className='meme-details-tt-hover about-social-media-selector'>
              <TwitterShareButton 
                style={{height:'36px', width:'36px', borderRadius:'50%', outline:'none', cursor:'pointer'}}
                title={'Check out iFunny!'}
                hashtags={['iFunny']}
                windowWidth={800}
                windowHeight={530}
                url={ENV.REACT_APP_FRONTEND}
                >   
                <TwitterIcon size={36} round/>
              </TwitterShareButton>
            </div>
          </div>
        </section>
      </main>
    )
  }
}
function mapStateToProps(state) {
  return {

  }
}
export default connect(mapStateToProps)(About);