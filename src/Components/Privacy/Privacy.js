import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Privacy.css';
import { TimelineMax } from 'gsap';

class Privacy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'MOUNT_COMP',
      val: 'privacy'
    })
    let ltl = new TimelineMax();
    ltl.to(window, .5, {scrollTo:0});
  }

  componentWillReceiveProps(props) {
  }

  render() {
    return (
      <main className='Privacy'>
        <section className={'privacy-title-section'}>
          <h1 className={'privacy-main-heading'}>
            Privacy Policy
          </h1>
          <div className={'privacy-line'}/>
        </section>
        <section className={'privacy-last-updated-section'}>
          <h1 className={'privacy-heading'}>
            Last Updated: 05-27-2016
          </h1>
          <p className={'privacy-paragraph'}>
            The following privacy policy ("Privacy Policy") covers all of the Services provided by 
            iFunny as those Services are defined in iFunny’s Terms of Use Agreement.
          </p>
          <p className={'privacy-paragraph'}>
            This Privacy Policy describes the practices of iFunny Inc and its affiliates (“iFunny,” “we” or “us”),
             regarding the collection, use, disclosure, transfer and other processing of personal information about 
             you ("Personal Information") collected as part of your use of the iFunny Services. Before using the 
             iFunny Services or providing information to us, please carefully review this Privacy Policy. By using 
             or accessing the iFunny Services, you agree that we may collect and use your information in accordance 
             with this Privacy Policy, as revised from time to time. If you have any questions or suggestions 
             regarding our Privacy Policy, please contact us at the email address indicated below.
          </p>
        </section>
        <section className={'privacy-processing-of-personal-info-section'}>
          <h1 className={'privacy-heading'}>
            Processing of Personal Information
          </h1>
          <p className={'privacy-paragraph'}>
            You understand and agree that iFunny may store and process your Personal Information on computers 
            located outside of the European Union, including, but not limited to, in the United States and the 
            Russian Federation. By using the Services, you agree to the collection and processing of your 
            Personal Information outside of the European Union and you hereby expressly waive any rights that 
            you may have under the EU Data Protection Directive.
          </p>
        </section>
        <section className={'privacy-personal-info-collected-section'}>
          <h1 className={'privacy-heading'}>
            Personal Information Collected
          </h1>
          <p className={'privacy-paragraph'}>
            We may collect and use Personal Information when you use or access the iFunny Services or provide 
            Personal Information through other means. Personal Information may include e-mail address, name, 
            IP address, and other information sufficient to identify an individual end user. Additionally, our 
            cookies, web beacons and similar technologies may collect the following information about your usage 
            of the iFunny Services: log file information, IP addresses, navigational data, server information, 
            data transfer times, user preferences and, where relevant, the websites visited before visiting the 
            website. We may also collect Personal Information from third parties where you have agreed with them 
            that your information may be disclosed.
          </p>
        </section>
        <section className={'privacy-purposes-of-use-section'}>
          <h1 className={'privacy-heading'}>
            Purposes of Use
          </h1>
          <p className={'privacy-paragraph'}>
            We may use Personal Information for the following purposes: (a) to facilitate certain activities on 
            the iFunny Services, such as uploading images and posting comments; (b) to fulfill your requests, 
            communicate with you about iFunny Services and other matters; (c) to manage the iFunny Services; and 
            (d) to provide marketing communications and targeted advertising to you.
          </p>
        </section>
        <section className={'privacy-cookies-and-ip-logs-section'}>
          <h1 className={'privacy-heading'}>
            Cookies and IP Logs
          </h1>
          <p className={'privacy-paragraph'}>
            Like most standard website servers, we use cookies (or similar tracking technologies) and data from 
            log files for the following reasons:
          </p>
          <ul className={'privacy-paragraph'}>
            <li>to store information and data so that your experience will be quicker;</li>
            <li>to store information so that you will not have to re-enter it during your visit, the next time you visit the iFunny Services, or after updating to a new version of one of the mobile applications;</li>
            <li>to provide custom, personalized content, information, and overall experience;</li>
            <li>to measure advertising campaigns and to monitor their effectiveness;</li>
            <li>to monitor aggregate metrics and analytics, such as total number of visitors, pages viewed, etc.;</li>
            <li>to track your entries, submissions, and the like.</li>
          </ul>
          <p className={'privacy-paragraph'}>
            You have the ability to accept or decline cookies. By default, most web browsers automatically 
            accept cookies. You can, however, usually modify your browser settings to decline cookies if you 
            so desire. By declining cookies, you may not be able to sign in or use other features or services 
            of the iFunny Services that depend on cookies.
          </p>
        </section>
        <section className={'privacy-comments-section'}>
          <h1 className={'privacy-heading'}>
            Comments
          </h1>
          <p className={'privacy-paragraph'}>
            In order to enhance the user experience of the iFunny Services, users can choose to leave comments 
            on particular images and videos. iFunny Inc does not endorse these comments, as they are opinions 
            of users who are not associated with iFunny Inc, its subsidiary, affiliates, "sister entities," 
            officers, directors, employees and agents. Please remember that any information that is disclosed 
            in these areas becomes public information. Parties may view and collect any such information. 
            As such, you should exercise caution when deciding to disclose Personal Information.
          </p>
        </section>
        <section className={'privacy-mailing-list-section'}>
          <h1 className={'privacy-heading'}>
            Mailing List
          </h1>
          <p className={'privacy-paragraph'}>
            iFunny Inc may launch a mailing list for the iFunny Services. By signing up for an account at 
            one of the iFunny Services, you will be placed on the mailing list. From time to time, iFunny 
            Inc may email its members new features and other news regarding the iFunny Services. You will 
            be given the option of opting out of the mailing list via a link contained within emails on the 
            mailing list. In addition, if you do not wish to receive marketing communications, please contact 
            us at the email address provided below.
          </p>
        </section>
        <section className={'privacy-third-party-services-section'}>
          <h1 className={'privacy-heading'}>
            Third Party Services and Advertising Networks
          </h1>
          <p className={'privacy-paragraph'}>
            Third-party advertising companies and networks may serve cookies on the iFunny Services and serve 
            ads to you when you visit the iFunny Services. These companies and networks may use the log file 
            information and/or information collected by cookies, Web beacons and similar technologies to provide 
            advertisements about goods and services that they believe may be of interest to you. All such features 
            are managed by third parties; therefore, please review the privacy policies posted at those sites. 
            iFunny Inc has no control over these third parties’ use of cookies or web beacons, or how they manage 
            the non-personal information they gather through them. This Privacy Policy covers the use of cookies 
            by iFunny Inc only and does not cover the use of cookies by any advertisers or other third parties.
          </p>
          <p className={'privacy-paragraph'}>
            The ads appearing on the iFunny Services are delivered to users by third-party advertisers including 
            Google Inc. and Apple Inc. among others. These companies may use cookies and other tracking tools on 
            our websites and third-party websites to collect your metric data and information (not including your 
            name, address, email address or telephone number) about your visits to the iFunny Services in order to 
            provide advertisements on iFunny Services and other sites about goods and services that may be of 
            interest to you.
          </p>
        </section>
        <section className={'privacy-how-we-respond-section'}>
          <h1 className={'privacy-heading'}>
            How We Respond to Do Not Track Signals
          </h1>
          <p className={'privacy-paragraph'}>
            You can generally opt-out of receiving personalized ads from third party advertisers and ad networks 
            who are members of the Network Advertising Initiative (NAI) or who follow the Digital Advertising 
            Alliance’s Self-Regulatory Principles for Online Behavioral Advertising by visiting the opt-out 
            pages on the NAI website and DAA website. Our websites are not currently set up to respond to 
            browser do-not-track signals, but you can configure your browser settings to reject all cookies or 
            prompt you before a cookie is set.
          </p>
        </section>
        <section className={'privacy-disclosure-of-personal-info-section'}>
          <h1 className={'privacy-heading'}>
            Disclosure of Personal Information
          </h1>
          <p className={'privacy-paragraph'}>
            We may disclose Personal Information as follows:
          </p>
        </section>
        <section className={'privacy-business-transitions-section'}>
          <h1 className={'privacy-heading'}>
            Business Transitions
          </h1>
          <p className={'privacy-paragraph'}>
            In the event iFunny Inc goes through a business transition, including, but not limited to, 
            a merger, acquisition, partnership, business reorganization, debt finance or sale of company 
            assets, or in the event of an insolvency, bankruptcy or receivership, we may use Personal Information 
            as part of the context of any such business transition. In most instances, Personal Information will 
            be part of the assets transferred. Additionally, we may share Personal Information with our partners, 
            affiliates, contractors, and service providers, as necessary, to provide iFunny Services to you or to 
            otherwise improve our services.
          </p>
        </section>
        <section className={'privacy-legal-disclaimer-section'}>
          <h1 className={'privacy-heading'}>
            Legal Disclaimer
          </h1>
          <p className={'privacy-paragraph'}>
            Though we make commercially reasonable efforts to preserve user privacy, iFunny will not disclose 
            Personal Information to third parties except in response to a duly authorized subpoena, court order, 
            or search warrant issued by a court of competent jurisdiction over iFunny or in response to a valid 
            emergency request. iFunny will evaluate emergency disclosure requests consistent with the law 
            (including 18 U.S.C. § 2702(b)(8)) on a case by case basis. If, after reviewing an emergency 
            disclosure request, iFunny has a good faith believe that there are exigent emergency circumstances 
            that involve the danger of death or serious physical injury to a person, iFunny may disclose Personal 
            Information necessary to prevent that harm.
          </p>
          <p className={'privacy-paragraph'}>
            iFunny may notify its users of third party requests for their Personal Information, including, but 
            not limited to, by providing its users with a copy of the request, unless it is explicitly prohibited 
            from doing so by valid legal process, such as a court order. Where prior notice is prohibited, iFunny 
            may notify its users that a third party has requested their Personal Information after Personal 
            Information has been disclosed.
          </p>
        </section>
        <section className={'privacy-safety-and-protecting-our-interests-section'}>
          <h1 className={'privacy-heading'}>
            Safety and Protecting Our Interests
          </h1>
          <p className={'privacy-paragraph'}>
            We may disclose Personal Information we collect from you in order to prevent damage to our tangible 
            and/or intangible property, for safety reasons, in the course of collecting amounts owed to us, or 
            for other similar reasons as we see fit in our discretion.
          </p>
        </section>
        <section className={'privacy-children-under-13-section'}>
          <h1 className={'privacy-heading'}>
            Children Under the Age of 13
          </h1>
          <p className={'privacy-paragraph'}>
            The iFunny Services are not intended for children under the age of 13 and we do not knowingly 
            collect personal information from children under age 13. If you are younger than 13, please do not 
            use the iFunny Services and please do not provide personal information to us.
          </p>
        </section>
        <section className={'privacy-your-california-rights-section'}>
          <h1 className={'privacy-heading'}>
            Your California Privacy Rights
          </h1>
          <p className={'privacy-paragraph'}>
            California residents have the right to receive information that identifies any third party companies 
            or individuals that iFunny has shared your Personal Information with in the previous calendar year, 
            as well as a description of the categories of Personal Information disclosed to that third party. 
            You may obtain this information once a year and free of charge by contacting iFunny at 
            support@ifunny.co.
          </p>
        </section>
        <section className={'privacy-notification-of-changes-section'}>
          <h1 className={'privacy-heading'}>
            Notification of Changes
          </h1>
          <p className={'privacy-paragraph'}>
            Whenever iFunny Inc changes its Privacy Policy, we will post those changes to this Privacy Policy 
            and other places that we deem appropriate. Your use of the iFunny Services following these changes 
            indicates your consent to the practices described in the revised Privacy Policy.
          </p>
        </section>
        <section className={'privacy-contact-us-section'}>
          <h1 className={'privacy-heading'}>
            Contact Us
          </h1>
          <p className={'privacy-paragraph'}>
            If you have any questions about this Privacy Policy or the manner by which we collect or use 
            Personal Information about you, email us at 
            <a className={'privacy-span'} href={'mailto:support@ifunny.co'}> support@ifunny.co.</a>
          </p>
        </section>
      </main>
    )
  }
}
function mapStateToProps(state) {
  return {

  }
}
export default connect(mapStateToProps)(Privacy);