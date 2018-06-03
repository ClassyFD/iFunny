import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TimelineMax } from 'gsap';
import { Link } from 'react-router-dom';
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
        <section className={'terms-title-section'}>
          <h1 className={'terms-main-heading'}>
            iFunny Terms of Use
          </h1>
          <div className={'terms-line'}/>
        </section>
        <section className={`terms-last-updated-section`}>
          <h1 className={`terms-heading`}>
            Last Updated: 05-27-2016
          </h1>
          <p className={`terms-paragraph`}>
            Welcome and thank you for visiting and using iFunny. The iFunny services, which include, but are not limited to, 
            any of the entertainment content, products, services, websites, or mobile applications produced or distributed by 
            iFunny (“Services”), are provided by iFunny Inc (“iFunny”), a company organized under the laws of the British Virgin 
            Islands. By accessing or using any of the Services provided by iFunny or its affiliates, however accessed, you 
            manifest your intent and agree to be bound by this terms of use Agreement (“Agreement”). This Agreement affects 
            your legal rights and obligations. If you do not agree to be bound by this Agreement, you are expressly prohibited 
            from accessing or using the Services. After a modification, replacement, or amendment of the terms of this Agreement, 
            your continued use of the Services constitutes your agreement to said modification, replacement, or amendment.
          </p>
        </section>
        <section className={`terms-eligibility-section`}>
          <h1 className={`terms-heading`}>
            1. Eligibility
          </h1>
          <p className={`terms-paragraph`}>
            By using the Services, you warrant and agree that you are either above the age of majority in your nation, state, 
            province, territory, or city or the age of eighteen (18), whichever is greater. You warrant that you are of sound 
            mind, have the capacity to contract, and agree to the terms and conditions contained within this Agreement. If you 
            are using the Services on behalf of a business entity or third party, you warrant that you have actual authority to 
            act as an agent of that business entity and third party and have the right and ability to agree to the terms of this 
            Agreement on behalf of that third party or business entity.
          </p>
        </section>
        <section className={`terms-definitions-section`}>
          <h1 className={`terms-heading`}>
            2. Definitions
          </h1>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>2.1</span> The "Content" refers to the content on the iFunny Services, including, but not limited to, the text, software, 
            scripts, graphics, photos, mobile applications, sounds, music, pictures, interactive features and the like. The 
            "Content" does not include User Engagement, which is defined below.
          </p>
          <p className={`terms-paragraph`}>
          <span className='terms-number-span'>2.2</span> "User" means a visitor of the iFunny Services, an iFunny Services account holder or a user of the iFunny Services.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>2.3</span> "User Submissions" refer to content (e.g., images, photographs, graphics, audio and video files, text, files, 
            information, sounds, musical works, works of authorship, applications, links, and other communications, content or 
            materials, along with any text associated with the content) submitted, posted or displayed by Users.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>2.4</span> "User Comments" refer to comments submitted, posted or displayed by Users.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>2.5</span> "User Engagement" collectively refers to User Submissions and User Comments.
          </p>
        </section>
        <section className={`terms-ifunny-services-section`}>
          <h1 className={`terms-heading`}>
            3. The iFunny Services
          </h1>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>3.1</span> iFunny may provide Users with the ability to upload or transmit content to or through the Services, including, 
            but not limited to, User Submissions and User Comments. When you submit User Engagement to the Services, you grant 
            iFunny a non-exclusive, irrevocable, worldwide, and perpetual license to use your User Engagement for the customary 
            and intended purposes of the Services. These purposes may include providing you or third parties with the Services, 
            backing up or archiving the Services, and selling or transferring the Services to a third party. In submitting User 
            Engagement to the Services, you agree to waive all moral rights in or to your User Engagement across the world, 
            whether you have or have not asserted moral rights. You also agree to waive all rights of publicity or privacy in or 
            to your User Engagement.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>3.2</span> iFunny is not responsible for any User Engagement, third-party content, syndicated content, services, 
            advertisements, and/or links that may be contained on the Services. The Services may contain links to third party 
            websites that are not owned or controlled by iFunny. iFunny has no control over, and assumes no responsibility for, 
            the content, services, privacy policies, terms of use, or practices of any third party websites. Additionally, iFunny 
            will not and cannot censor or edit the content of any third party site. By using the Services, you expressly hold 
            iFunny harmless from any and all liability arising from your use of any third party website. YOUR CORRESPONDENCE AND 
            BUSINESS DEALINGS WITH THIRD PARTIES FOUND THROUGH THE SERVICES ARE SOLELY BETWEEN YOU AND THE THIRD PARTY.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>3.3</span> You agree that you are responsible for all data or roaming charges you incur through use of the Services.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>3.4</span> iFunny prohibits crawling, scraping, caching or otherwise accessing any Content or User Engagement on the iFunny 
            Service via automated means, except as may be the result of standard search engine protocols or technologies used by 
            a search engine with iFunny's express consent.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>3.5</span> You are solely responsible for your interactions with other Users of the iFunny Services, whether online or 
            offline. You agree that iFunny is not responsible or liable for the conduct of any User. iFunny reserves the right, 
            but has no obligation, to monitor or become involved in disputes between you and other Users.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>3.6</span> There will be occasions when the iFunny Services may be interrupted, including, without limitation, for scheduled 
            maintenance or upgrades, for emergency repairs, or due to failure of telecommunications links and/or equipment.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>3.7</span> iFunny reserves the right to remove any Content and/or User Engagement from the iFunny Services for any reason, 
            without prior notice. Content and/or User Engagement removed from the iFunny Services may continue to be stored by 
            iFunny, including, without limitation, in order to comply with certain legal obligations, but may not be retrievable 
            without a valid court order. iFunny is not a backup service and you agree that you will not rely on the iFunny 
            Services for the purposes of content backup or storage. iFunny will not be liable to you for any modification, 
            suspension, or discontinuation of the iFunny Services, or the loss of any Content or User Engagement. You also 
            acknowledge that the Internet may be subject to breaches of security and that the submission of User Engagement or 
            other information may not be secure.
          </p>
        </section>
        <section className={`terms-access-to-the-ifunny-services-section`}>
          <h1 className={`terms-heading`}>
            4. Access to the iFunny Services
          </h1>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>4.1</span> iFunny provides you with a limited, non-exclusive, non-sublicensable, non-assignable, and revocable license to 
            use the Services for their customary and intended purposes. Use of the Services for a use outside of their customary 
            and intended purposes or in violation of the terms of this Agreement will result in the immediate termination of 
            this license. This license is revocable at any time, and any rights not expressly granted herein are reserved to 
            iFunny.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>4.2</span> In order to access some features of the iFunny Services, you will have to create an account. You may never use 
            another User's account without permission, or solicit, collect, or use the login credentials of other Users. When 
            creating your account, you must provide accurate and complete information. You are responsible for keeping your 
            password secure and you are solely responsible for the activity that occurs on your account. Although iFunny will 
            not be liable for your losses caused by any unauthorized use of your account, you may be liable for the losses of 
            iFunny or others due to such unauthorized use. If you become aware of any breach of security or unauthorized use of 
            your password or of your account, you must notify iFunny immediately at <a className={'terms-span'} href={'mailto:support@ifunny.co'}>support@ifunny.co.</a>
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>4.3</span> You agree you will not sell, transfer, license or assign your account, username, or any account rights. iFunny 
            prohibits the creation of, and you agree that you will not create, an account for anyone other than yourself.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>4.4</span> You also agree that all information you provide or provided to iFunny upon registration and at all other times 
            will be true, accurate, current and complete, and you agree to update your information as necessary to maintain its 
            truth and accuracy.
          </p>
        </section>
        <section className={`terms-use-of-the-ifunny-services-section`}>
          <h1 className={`terms-heading`}>
            5. Use of the iFunny Services--Permissions and Restrictions on Your Use
          </h1>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1</span> You agree to use the iFunny Services only for purposes that are permitted by this Agreement. iFunny hereby 
            grants you permission to access and use the iFunny Services as set forth in this Agreement, provided that:
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1.1</span> You agree that you have the legal right and capacity to enter into this Agreement in your jurisdiction.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1.2</span> You must not use the iFunny Services for any illegal or unauthorized purpose. You agree to comply with all 
            laws, rules and regulations (e.g., federal, state, local and provincial) applicable to your use of the iFunny 
            Services and your User Engagement, including, but not limited to, copyright laws and export laws.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1.3</span> You must not post abusive, obscene, threatening, harassing, defamatory, libelous, offensive, violent, nude, 
            partially nude, discriminatory, unlawful, infringing, hateful, pornographic or sexually suggestive User Engagement 
            via the iFunny Services, or User Engagement that encourages conduct that would be considered a criminal offense, 
            give rise to civil liability, violate any law, or is otherwise inappropriate. You must not post spam. You must not 
            defame, stalk, bully, abuse, harass, threaten, impersonate or intimidate people or entities. You must not 
            intentionally make false or misleading statements.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1.4</span> You must not post private, confidential or sensitive information, or information that is otherwise in breach 
            of the law via the iFunny Services, including, without limitation, your or any other person's credit card 
            information, social security or alternate national identity numbers, non- public phone numbers or non-public email 
            addresses. You must not submit material that is copyrighted, protected by trade secret or otherwise subject to third 
            party proprietary rights, including privacy and publicity rights, unless you are the owner of such rights or have 
            permission from their rightful owner to post the material and to grant us all of the license rights granted herein.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1.5</span> You must keep all of your User Engagement relevant and "on topic" to the particular item of User Engagement 
            open for comments or submissions.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1.6</span> You must not distribute in any medium any part of the iFunny Services without prior written authorization 
            from iFunny. You agree not to circumvent, disable or otherwise interfere with security related features of the iFunny 
            Services or features that prevent or restrict use or copying of any Content and User Engagement or enforce limitations 
            on use of the iFunny Services and the Content and User Engagement therein.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1.7</span> You must not engage in any activity that interferes with or disrupts the iFunny Services (or the servers and 
            networks which are connected to the iFunny Services), including by transmitting any worms, viruses, spyware, malware 
            or any other code of a destructive or disruptive nature. You may not inject content or code or otherwise alter or 
            interfere with the way any part of the iFunny Services is rendered or displayed in a User's browser or device.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1.8</span> You must not change, alter or modify any part of the iFunny Services for any reason.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1.9</span> You agree not to use or launch any type of automated system, including but not limited to, "robots," "spiders," 
            or "offline readers," etc., that accesses the iFunny Services in a manner that sends more request messages to iFunny's 
            servers in a given period of time than a human can reasonably produce in the same period by using a conventional 
            on-line web browser. You agree not to access (or attempt to access) any of the iFunny Services, including Content and 
            User Engagement, by any means other than through the interfaces that are provided by iFunny.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1.10</span> You agree not to use the iFunny Services for any commercial purpose or use, either direct or indirect, 
            without the prior written authorization of iFunny. You may access User Engagement solely for your information and 
            non-commercial, personal use or as otherwise intended through the normal functionality of the iFunny Services. 
            iFunny permits you to link to materials on the iFunny Services for personal, non-commercial purposes only. In 
            addition, iFunny provides an "Embeddable Player" feature, which you may incorporate into your own personal, 
            non-commercial websites for use in accessing the materials on the iFunny Services, provided that you include a 
            prominent link back to iFunny's website on any pages containing the Embeddable Player.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1.11</span> You must not solicit, for commercial purposes, spam, or send harassing communications to any Users. 
            Additionally, you must not collect or harvest any personal information from the iFunny Services. You must not 
            offer to sell or buy any product or service, and you must not post advertisements or solicitations of business.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1.12</span> You must not attempt to restrict another User from using or enjoying the iFunny Services and you must not 
            encourage or facilitate violations of this Agreement or any other iFunny terms.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1.13</span> The Content and iFunny intellectual property, including, but not limited to, the iFunny trademarks, trade 
            names, and logos, on the iFunny Services, except all User Engagement, are owned by or licensed to iFunny, subject 
            to copyright and other intellectual property rights under United States and foreign laws and international 
            conventions. Content on the iFunny Services may not be used, copied, reproduced, distributed, transmitted, broadcast, 
            displayed, sold, licensed, or otherwise exploited for any other purposes whatsoever without the prior written 
            consent of the respective owners. iFunny reserves all rights that are not expressly granted in and to the iFunny 
            Services and the Content. You agree not to use, copy, or distribute, either directly or indirectly, any of the 
            Content other than that which is expressly permitted herein, including any use, copying, or distribution of User 
            Engagement of third parties obtained through the iFunny Services for any commercial purposes. If you download or 
            print a copy of the Content and/or User Engagement for personal use, you must retain all copyright and other 
            proprietary notices contained therein. You agree that iFunny holds no responsibility for content posted within the 
            service, including, but not limited to, User Engagement. iFunny is not obligated to monitor or edit any content 
            posted on iFunny, including, but not limited to, User Engagement. If your content violates this Agreement, you may 
            bear legal responsibility for that content.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1.14</span> iFunny reserves the right to discontinue any aspect of the iFunny Services, either specifically to you or 
            generally, at any time.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>5.1.15</span> iFunny may terminate a User's access to the iFunny Services at any time, for any reason. If iFunny suspects 
            that you have violated any provision of this Agreement, iFunny may also seek any other available legal remedy. 
            Your rights under this Agreement will terminate automatically if you breach any part of this Agreement. Further, 
            iFunny reserves the right to refuse access to the iFunny Services to anyone for any reason at any time.
          </p>
        </section>
        <section className={`terms-user-engagement-section`}>
          <h1 className={`terms-heading`}>
            6. User Engagement
          </h1>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>6.1</span> You shall be solely responsible for your own User Engagement and the consequences of posting or publishing 
            User Engagement.
          </p>
          <p className={`terms-paragraph`}>
           <span className='terms-number-span'>6.1.1</span> In addition to the general restrictions above, the following restrictions and conditions apply specifically 
            to your User Comments:
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>6.1.1.1</span> You may be given the opportunity to review and post User Comments on the iFunny Services. Your User Comments 
            must adhere to this Agreement, any additional applicable terms of the mobile application store or marketplace where 
            you have downloaded such iFunny Services, and, to the extent applicable, foreign, national, state or local laws. 
            If a comment is made using your identity, it will be deemed to have been posted by you. iFunny will not accept 
            responsibility for User Comments and other information posted in the comments. If iFunny receives notice that any 
            User Comments are not in compliance with this Agreement or the intended use of the User Comments, iFunny may remove 
            such User Comments. Additionally, engaging in such conduct may result in you and/or your account being banned from 
            the iFunny Services.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>6.1.1.2</span> User Comments are made available to you for your information and personal use solely as intended through 
            the normal functionality of the iFunny Services. User Comments are made available AS IS and may not be used, copied, 
            reproduced, displayed, sold, licensed, downloaded, distributed, transmitted, broadcast, or otherwise exploited in 
            any manner not intended by the normal functionality of the iFunny Services or otherwise as expressly authorized 
            under this Agreement.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>6.1.2</span> In addition to the general restrictions above, the following restrictions and conditions apply specifically 
            to your User Submissions--you affirm, represent, and/or warrant that:
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>6.1.2.1</span> You own or have the necessary licenses, rights, consents, and permissions to use and authorize us to use 
            all patent, trademark, trade secret, copyright or other proprietary rights in and to any and all User Submissions 
            to enable inclusion and use of the User Submissions in the manner contemplated by the iFunny Services and this 
            Agreement.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>6.1.2.2</span> You have the written consent, release, and/or permission of each and every identifiable individual person 
            in the User Submission to use the name or likeness of each and every such identifiable individual person to enable 
            inclusion and use of the User Submissions in the manner contemplated by the iFunny Services and this Agreement.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>6.1.2.3</span> The iFunny Services may now or in the future permit User Submissions and the hosting, sharing, and/or 
            publishing of such User Submissions. You understand that whether or not such User Submissions are published, 
            iFunny does not guarantee any confidentiality with respect to any submissions
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>6.1.3</span> You additionally affirm, represent and warrant that the posting and use of your User Engagement on or 
            through the iFunny Services does not violate, misappropriate or infringe on the rights of any third party, 
            including, without limitation, privacy rights, publicity rights, copyrights, trademark and/or other intellectual 
            property rights.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>6.1.4</span> You agree to pay for all royalties, fees, and any other monies owed by reason of your User Engagement that 
            you post on or through the iFunny Services.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>6.2</span> iFunny does not endorse any User Engagement or any opinion, recommendation, or advice expressed therein, and 
            iFunny expressly disclaims any and all liability in connection with User Engagement. iFunny does not permit 
            copyright infringing activities and infringement of intellectual property rights on its iFunny Services, and iFunny 
            will remove all Content and User Engagement if properly notified that such Content or User Engagement infringes 
            on another's intellectual property rights. iFunny may, but has no obligation to, remove, edit, block, and/or monitor 
            User Engagement or accounts containing User Engagement that iFunny determines in its sole discretion violates this 
            Agreement. iFunny will also terminate a User's access to the iFunny Services, if they are determined to be a repeat 
            infringer. A repeat infringer is a User who has been notified of infringing activity more than twice and/or has had 
            User Engagement removed from the iFunny Services more than twice.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>6.3</span> iFunny reserves the right to determine in its sole discretion whether Content or User Engagement is appropriate 
            and complies with this Agreement for violations other than copyright infringement and violations of intellectual 
            property law, including, but not limited to, pornography, obscene or defamatory material, or excessive length. 
            iFunny may, at any time, without prior notice and in its sole discretion remove such User Engagement and/or 
            terminate a User's access for submitting such material in violation of this Agreement.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>6.4</span> You understand that when using the iFunny Services, you will be exposed to User Engagement from a variety of 
            sources. iFunny is not responsible for the accuracy, usefulness, safety, or intellectual property rights of or 
            relating to such User Engagement. You understand and agree that iFunny cannot and will not be responsible for 
            the User Engagement posted on the iFunny Services and you use the iFunny Services at your own risk. You further 
            understand and acknowledge that you may be exposed to User Engagement that are inaccurate, offensive, indecent, 
            or objectionable, and you agree to waive, and hereby do waive, any legal or equitable rights or remedies you have 
            or may have against iFunny with respect thereto to the fullest extent permitted by law.
          </p>
        </section>
        <section className={`terms-copyright-policy-section`}>
          <h1 className={`terms-heading`}>
            7. Copyright Policy
          </h1>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>7.1</span> Reporting Instances of Copyright Infringement
          </p>
          <p className={`terms-paragraph`}>
            If you are a copyright owner or an agent thereof and believe that any User Engagement or other content infringes 
            upon your copyrights, you may submit a notification pursuant by providing iFunny's Copyright Agent with the 
            following information in writing:
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>7.1.1</span> A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive 
            right that is allegedly infringed;
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>7.1.2</span> Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works 
            at a single online site are covered by a single notification, a representative list of such works at that site;
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>7.1.3</span> Identification of the material that is claimed to be infringing or to be the subject of infringing activity 
            and that is to be removed or access to which is to be disabled and information reasonably sufficient to permit 
            the service provider to locate the material;
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>7.1.4</span> Information reasonably sufficient to permit the service provider to contact you, such as an address, 
            telephone number, and, if available, an electronic mail;
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>7.1.5</span> A statement that you have a good faith belief that use of the material in the manner complained of is not 
            authorized by the copyright owner, its agent, or the law;
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>7.1.6</span> A statement that the information in the notification is accurate, and under penalty of perjury, that you are 
            authorized to act on behalf of the owner of an exclusive right that is allegedly infringed. iFunny's Copyright 
            Agent to receive notifications of claimed infringement is: Revision Legal, PLLC, 109 E. Front St., Suite 309, 
            Traverse City, MI 49684, United States of America. You acknowledge that if you fail to comply with all of the 
            requirements of this Section, your notice may not be valid.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>7.2</span> Submitting a Counter-Notice
          </p>
          <p className={`terms-paragraph`}>
            If you believe that your User Engagement that was removed (or to which access was disabled) is not infringing, or 
            that you have the authorization from the copyright owner, the copyright owner's agent, or pursuant to the law, to 
            post and use the material in your User Engagement, you may send a counter-notice containing the following 
            information to iFunny's Copyright Agent:
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>7.2.1</span> Your physical or electronic signature;
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>7.2.2</span> Identification of the material that has been removed or to which access has been disabled and the location 
            at which the material appeared before it was removed or disabled;
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>7.2.3</span> The following statement: "I swear, under penalty of perjury, that I have a good faith belief that the 
            material was removed or disabled as a result of mistake or a misidentification of the material to be removed 
            or disabled";
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>7.2.4</span> Your name, address, telephone number, and e-mail address, a statement that you consent to the jurisdiction 
            the Federal District Court for the juridical district in which the User is located or, if the User is outside of 
            the United States, for any judicial district in which iFunny may be found, and a statement that you will accept 
            service of process from the person who provided the original DMCA notification of the alleged infringement or 
            an agent of such person.
          </p>
          <p className={'terms-paragraph'}>
            If a counter-notice is received by iFunny's Copyright Agent, iFunny may send a copy of the counter- notice to 
            the original complaining party informing that person that it may replace the removed User Engagement or cease 
            disabling it in 10 business days. Unless the copyright owner files an action seeking a court order against the 
            User who provided the User Engagement, the removed User Engagement may be replaced, or access to it restored, 
            in 10 to 14 business days or more after receipt of the counter-notice, at iFunny's sole discretion.
          </p>
        </section>
        <section className={`terms-disclaimer-of-warranties-section`}>
          <h1 className={`terms-heading`}>
            8. Disclaimer of Warranties
          </h1>
          <p className={`terms-paragraph`}>
            YOU EXPRESSLY UNDERSTAND AND AGREE THAT, TO THE EXTENT ALLOWED UNDER APPLICABLE LAW:
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>8.1</span> YOUR USE OF THE iFUNNY SERVICES IS AT YOUR OWN RISK. THE iFUNNY SERVICES, INCLUDING, WITHOUT LIMITATION, THE 
            WEBSITES, CONTENT, USER ENGAGEMENT, ANY PRODUCTS OR SERVICES AVAILABLE ON THE iFUNNY SERVICES AND ALL THE MATERIALS, 
            INFORMATION, SOFTWARE, FACILITIES, SERVICES AND OTHER CONTENT THEREIN IS PROVIDED ON AN "AS IS", "AS AVAILABLE" 
            AND "WITH ALL FAULTS" BASIS. TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW, iFUNNY DISCLAIMS ALL 
            WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS 
            FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. iFUNNY AND ITS SUBSIDIARIES, AFFILIATES, "SISTER ENTITIES", OFFICERS, 
            EMPLOYEES, AGENTS, PARTNERS AND LICENSORS (COLLECTIVELY, the "iFUNNY PARTIES") MAKE NO WARRANTIES OR REPRESENTATIONS 
            THAT: (i) THE iFUNNY SERVICES WILL MEET YOUR REQUIREMENTS; (ii) YOUR USE OF THE iFUNNY SERVICES WILL BE 
            UNINTERRUPTED, TIMELY, SECURE OR ERROR-FREE; (iii) THE iFUNNY SERVICES OR THE SERVER THAT MAKES THE iFUNNY SERVICES 
            AVAILABLE IS FREE FROM ANY HARMFUL COMPONENTS, INCLUDING, WITHOUT LIMITATION, VIRUSES; (iv) THE RESULTS THAT MAY BE 
            OBTAINED FROM YOUR USE OF THE iFUNNY SERVICES WILL BE ACCURATE OR RELIABLE; (v) THE QUALITY OF ANY SERVICES, 
            INFORMATION OR OTHER MATERIAL OBTAINED BY YOU THROUGH THE iFUNNY SERVICES WILL MEET YOUR EXPECTATIONS; AND (vi) ANY 
            ERRORS IN THE SOFTWARE WILL BE CORRECTED.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>8.2</span> iFUNNY DOES NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY CONTENT, USER ENGAGEMENT, OR 
            PRODUCTS OR SERVICES ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE iFUNNY SERVICES OR FEATURED IN ANY BANNER 
            OR OTHER ADVERTISING, AND SPECIFICALLY DISCLAIMS ANY RESPONSIBILITY OR LIABILITY TO ANY PERSON OR ENTITY FOR ANY 
            LOSS, DAMAGE (WHETHER ACTUAL, CONSEQUENTIAL, PUNITIVE OR OTHERWISE), INJURY, CLAIM, LIABILITY OR OTHER CAUSE OF ANY 
            KIND OR CHARACTER BASED UPON OR RESULTING FROM THE FOREGOING. iFUNNY WILL NOT BE A PARTY TO OR IN ANY WAY BE 
            RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>8.3</span> iFUNNY DOES NOT WARRANT THAT YOUR USE OF THE iFUNNY SERVICES IS LAWFUL IN ANY PARTICULAR JURISDICTION, AND 
            iFUNNY SPECIFICALLY DISCLAIMS SUCH WARRANTIES. BY ACCESSING OR USING THE iFUNNY SERVICES, YOU REPRESENT AND WARRANT 
            THAT YOUR ACTIVITIES ARE LAWFUL IN EVERY JURISDICTION WHERE YOU ACCESS OR USE THE iFUNNY SERVICES.
          </p>
        </section>
        <section className={`terms-limitation-of-liability-section`}>
          <h1 className={`terms-heading`}>
            9. Limitation of Liability
          </h1>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>9.1</span> TO THE EXTENT NOT PROHIBITED BY LAW, IN NO EVENT SHALL THE iFUNNY PARTIES BE LIABLE TO YOU FOR ANY LOSS OR 
            DAMAGES OF ANY KIND (INCLUDING, WITHOUT LIMITATION, FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, PUNITIVE, OR 
            CONSEQUENTIAL DAMAGES WHATSOEVER) THAT ARE DIRECTLY OR INDIRECTLY RELATED TO ANY: (i) THE iFUNNY SERVICES; (ii) 
            THE CONTENT; (C) USER ENGAGEMENT; (D) YOUR USE OF, INABILITY TO USE, OR THE PERFORMANCE OF THE iFUNNY SERVICES; 
            (E) ANY ACTION TAKEN IN CONNECTION WITH AN INVESTIGATION BY THE iFUNNY PARTIES OR LAW ENFORCEMENT AUTHORITIES 
            REGARDING YOUR OR ANY OTHER PARTY'S USE OF THE iFUNNY SERVICES; (F) ANY ACTION TAKEN IN CONNECTION WITH COPYRIGHT 
            OR OTHER INTELLECTUAL PROPERTY OWNERS; (G) ANY ERRORS OR OMISSIONS IN THE OPERATION OF THE iFUNNY SERVICES; OR (H) 
            ANY DAMAGE TO ANY USER'S COMPUTER, MOBILE DEVICE, OR OTHER EQUIPMENT OR TECHNOLOGY INCLUDING, WITHOUT LIMITATION, 
            DAMAGE FROM ANY SECURITY BREACH OR FROM ANY VIRUS, BUGS, TAMPERING, FRAUD, ERROR, OMISSION, INTERRUPTION, DEFECT, 
            DELAY IN OPERATION OR TRANSMISSION, COMPUTER LINE OR NETWORK FAILURE OR ANY OTHER TECHNICAL OR OTHER MALFUNCTION, 
            INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOST PROFITS, LOSS OF GOODWILL, LOSS OF DATA, WORK STOPPAGE, ACCURACY 
            OF RESULTS, OR COMPUTER FAILURE OR MALFUNCTION, EVEN IF FORESEEABLE OR EVEN IF THE iFUNNY PARTIES HAVE BEEN 
            ADVISED OF OR SHOULD HAVE KNOWN OF THE POSSIBILITY OF SUCH DAMAGES, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, 
            STRICT LIABILITY OR TORT (INCLUDING, WITHOUT LIMITATION, WHETHER CAUSED IN WHOLE OR IN PART BY NEGLIGENCE, ACTS 
            OF GOD, TELECOMMUNICATIONS FAILURE, OR THEFT OR DESTRUCTION OF THE SERVICE). IN NO EVENT WILL THE iFUNNY PARTIES 
            BE LIABLE TO YOU OR ANYONE ELSE FOR LOSS, DAMAGE OR INJURY, INCLUDING, WITHOUT LIMITATION, DEATH OR PERSONAL INJURY. 
            THE FOREGOING LIMITATION OF LIABILITY SHALL APPLY TO THE FULLEST EXTENT PERMITTED BY LAW IN THE APPLICABLE 
            JURISDICTION. THE MAXIMUM TOTAL LIABILITY OF THE iFUNNY PARTIES TO YOU FOR ANY CLAIM UNDER THIS AGREEMENT, 
            WHETHER IN CONTRACT, TORT, OR OTHERWISE, IS $100.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>9.2</span> EACH PROVISION OF THIS AGREEMENT THAT PROVIDES FOR A LIMITATION OF LIABILITY, DISCLAIMER OF WARRANTIES, OR 
            EXCLUSION OF DAMAGES IS TO ALLOCATE THE RISKS UNDER THIS AGREEMENT BETWEEN THE PARTIES. THIS ALLOCATION IS AN 
            ESSENTIAL ELEMENT OF THE BASIS OF THE BARGAIN BETWEEN THE PARTIES. EACH OF THESE PROVISIONS IS SEVERABLE AND 
            INDEPENDENT OF ALL OTHER PROVISIONS OF THIS AGREEMENT. THE LIMITATIONS IN THIS SECTION WILL APPLY EVEN IF ANY 
            LIMITED REMEDY FAILS OF ITS ESSENTIAL PURPOSE.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>9.3</span> YOU AGREE THAT IN THE EVENT YOU INCUR ANY DAMAGES, LOSSES OR INJURIES THAT ARISE OUT OF iFUNNY'S ACTS OR 
            OMISSIONS, THE DAMAGES, IF ANY, CAUSED TO YOU ARE NOT IRREPARABLE OR SUFFICIENT TO ENTITLE YOU TO AN INJUNCTION 
            PREVENTING ANY EXPLOITATION OF ANY WEB SITE, SERVICE, PROPERTY, PRODUCT OR OTHER CONTENT OWNED OR CONTROLLED BY THE 
            iFUNNY PARTIES, AND YOU WILL HAVE NO RIGHTS TO ENJOIN OR RESTRAIN THE DEVELOPMENT, PRODUCTION, DISTRIBUTION, 
            ADVERTISING, EXHIBITION OR EXPLOITATION OF ANY WEB SITE, PROPERTY, PRODUCT, SERVICE, OR OTHER CONTENT OWNED OR 
            CONTROLLED BY THE iFUNNY PARTIES.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>9.4</span> YOU SPECIFICALLY ACKNOWLEDGE THAT iFUNNY SHALL NOT BE LIABLE FOR CONTENT OR THE DEFAMATORY, OFFENSIVE, OR 
            ILLEGAL CONDUCT OF ANY THIRD PARTY AND THAT THE RISK OF HARM OR DAMAGE FROM THE FOREGOING RESTS ENTIRELY WITH YOU.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>9.5</span> BY ACCESSING THE SERVICE, YOU UNDERSTAND THAT YOU MAY BE WAIVING RIGHTS WITH RESPECT TO CLAIMS THAT ARE AT 
            THIS TIME UNKNOWN OR UNSUSPECTED, AND IN ACCORDANCE WITH SUCH WAIVER, YOU ACKNOWLEDGE THAT YOU HAVE READ AND 
            UNDERSTAND, AND HEREBY EXPRESSLY WAIVE, THE BENEFITS OF SECTION 1542 OF THE CIVIL CODE OF CALIFORNIA, AND ANY 
            SIMILAR LAW OF ANY STATE OR TERRITORY, WHICH PROVIDES AS FOLLOWS: "A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS 
            WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH IF 
            KNOWN BY HIM MUST HAVE MATERIALLY AFFECTED HIS SETTLEMENT WITH THE DEBTOR."
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>9.6</span> iFUNNY IS NOT RESPONSIBLE FOR THE ACTIONS, CONTENT, INFORMATION, OR DATA OF THIRD PARTIES, AND YOU RELEASE US, 
            OUR DIRECTORS, OFFICERS, EMPLOYEES, AND AGENTS FROM ANY CLAIMS AND DAMAGES, KNOWN AND UNKNOWN, ARISING OUT OF OR 
            IN ANY WAY CONNECTED WITH ANY CLAIM YOU HAVE AGAINST ANY SUCH THIRD PARTIES.
          </p>
        </section>
        <section className={`terms-indemnity-section`}>
          <h1 className={`terms-heading`}>
            10. Indemnity
          </h1>
          <p className={`terms-paragraph`}>
            You agree to defend, indemnify and hold harmless the iFunny Parties from and against any and all claims, damages, 
            obligations, losses, liabilities, costs or debt, and expenses (including, but not limited to, attorney's fees) 
            arising out of or in any way connected with: (i) your User Engagement or your use of and access to the iFunny 
            Services; (ii) your breach or alleged breach of this Agreement; (iii) your violation or alleged violation of any 
            third party right, including without limitation any intellectual property right, publicity, confidentiality, 
            property or privacy right; (iv) your violation or alleged violation of any laws, rules, regulations, codes, 
            statutes, ordinances or orders; (v) any claim that your User Engagement caused damage to a third party; or (vi) 
            any misrepresentation made by you. You will cooperate as fully required by iFunny in the defense of any claim. 
            iFunny reserves the right to assume the exclusive defense and control of any matter subject to indemnification 
            by you, and you will not in any event settle any claim without the prior written consent of iFunny. This defense 
            and indemnification obligation will survive this Agreement and your use of iFunny Services.
          </p>
        </section>
        <section className={`terms-assignment-section`}>
          <h1 className={`terms-heading`}>
            11. Assignment
          </h1>
          <p className={`terms-paragraph`}>
            This Agreement, and any rights and licenses granted hereunder, may not be transferred or assigned by you, but may be 
            assigned by iFunny without restriction.
          </p>
        </section>
        <section className={`terms-governing-law-section`}>
          <h1 className={`terms-heading`}>
            12. Governing Law and Arbitration
          </h1>
          <p className={`terms-paragraph`}>
            You agree that: (i) the iFunny Services shall be deemed solely based in Grand Rapids, Michigan; and (ii) the iFunny 
            Services shall be deemed a passive service that does not give rise to personal jurisdiction over iFunny, either 
            specific or general, in jurisdictions other than Grand Rapids, Michigan. This Agreement shall be governed by the 
            laws of the State of Michigan, without respect to its conflict of laws principles, and will not be governed by 
            the United Nations Convention on Contracts for the International Sale of Goods. Any controversy or claim arising 
            out of or relating to this Agreement, or the breach thereof, shall be determined by arbitration administered by 
            the International Centre for Dispute Resolution in accordance with its International Arbitration Rules. This 
            arbitration will be held in Grand Rapids, Michigan and you hereby consent to the exclusive personal and subject 
            matter jurisdiction of such arbitrator. The award of such arbitration may be entered as a judgment in any court 
            of competent jurisdiction and consistent with the New York Convention. In the event that binding arbitration is 
            not enforceable, you consent to the exclusive jurisdiction of the state and federal courts of Grand Rapids, 
            Michigan for the resolution any disputes.
          </p>
        </section>
        <section className={`terms-general-section`}>
          <h1 className={`terms-heading`}>
            13. General
          </h1>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>13.1</span> This Agreement, together with the Privacy Notice at <Link className='terms-span' to={'/app/privacy'}>http://ifunny.co/app/privacy/</Link>, which is incorporated by 
            reference, and any other legal notices published by iFunny on the iFunny Services, shall constitute the entire 
            agreement between you and iFunny concerning the iFunny Services.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>13.2</span> If any provision of this Agreement is deemed invalid by a court of competent jurisdiction, the invalidity 
            of such provision shall not affect the validity of the remaining provisions of this Agreement, which shall remain 
            in full force and effect.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>13.3</span> No waiver of any term of this Agreement shall be deemed a further or continuing waiver of such term or any 
            other term, and iFunny's failure to assert any right or provision under this Agreement shall not constitute a 
            waiver of such right or provision.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>13.4</span> iFunny reserves the right to amend this Agreement at any time and without notice, and it is your responsibility 
            to review this Agreement for any changes. Your use of the iFunny Services following any amendment of this 
            Agreement will signify your assent to and acceptance of its revised terms.
          </p>
          <p className={`terms-paragraph`}>
            <span className='terms-number-span'>13.5</span> YOU AND iFUNNY AGREE THAT ANY CAUSE OF ACTION ARISING OUT OF OR RELATED TO THE IFUNNY SERVICES MUST COMMENCE 
            WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES. OTHERWISE, SUCH CAUSE OF ACTION IS PERMANENTLY BARRED.
          </p>
        </section>
      </main>
    )
  }
}
function MapStateToProps(state) {
  return {

  }
}
export default connect()(Terms);