import  sendGrid from 'sendgrid';
import sgMail from  '@sendgrid/mail'
// @ts-ignore
import {sendGridKey} from '../../config/keys';

import {Recipient, Survey} from "../types/survey";
const helper = sendGrid.mail;

// sgMail.setApiKey(sendGridKey);
// function Mailer(survey:Survey,content:string){
//     const {subject,recipients}=survey;
//     const msg:any = {
//         from: 'ehabreda04@gmail.com',
//         to: recipients.map(({email}) => email),
//         subject: subject,
//         content: [
//             {
//                 type: 'text/html',
//                 value: content
//             }
//         ],
//         trackingSettings: {
//             clickTracking: {
//                 enable: true
//             },
//             openTracking: {
//                 enable: true
//             },
//             subscriptionTracking: {
//                 enable: true
//             }
//         }
//     };
//     const send=async() => {
//         try {
//             const res=await sgMail.send(msg);
//             console.log('success',res)
//         } catch (error:any) {
//             console.error('error in send',error);
//
//             if (error.response) {
//                 console.error(error.response.body)
//             }
//         }
//     }
//     return {send}
// }
// export default Mailer;

export default class Mailer extends helper.Mail{

    // public sgApi: any;
    // public from_email: any;
    // public subject: any;
    // public body: any;
    // public recipients: any;
    // public addContent: any;
    // public addTrackingSettings: any;
    // public addPersonalization: any;
    // public toJSON: any;
      constructor({subject,recipients}:Survey,content:string){
          super();
          this.sgApi=sendGrid(sendGridKey);

          this.from_email=new helper.Email(`ehabreda04@gmail.com`);
          this.subject=subject;
          this.body=new helper.Content('text/html',content);
          this.recipients=this.formatAddresses(recipients);

          this.addContent(this.body);
          this.addClickTracking();
          this.addRecipients();
      }

     formatAddresses(recipients:Recipient[]){
        return recipients.map(({email})=>{
            return new helper.Email(email);
        })
    }

    addClickTracking(){
        const trackingSettings=new helper.TrackingSettings();
        const clickTracking=new helper.ClickTracking(true,true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients(){
        const personalize=new helper.Personalization();
        this.recipients.forEach((recipient:any)=>{
            personalize.addTo(recipient)
        });
        this.addPersonalization(personalize);
    }

    async send(){
          const request=this.sgApi.emptyRequest({
              method:'POST',
              path: "/v3/mail/send",
              body:this.toJSON()
          });
          console.log('request',request,this.from_email)
          let response;
        try {
         response=await  this.sgApi.API(request);
            return response;
        }catch (e) {
               console.log('error in send email',e)
            return e;
        }


    }

}