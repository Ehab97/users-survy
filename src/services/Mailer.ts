import sendGrid from "sendgrid";
import sgMail from "@sendgrid/mail";
// @ts-ignore
import { sendGridKey } from "../../config/keys";
import { Recipient, Survey } from "../types/survey";
const helper = sendGrid.mail;

export default class Mailer extends helper.Mail {
    constructor({ subject, recipients }: Survey, content: string) {
        super();
        // @ts-ignore
        this.sgApi = sendGrid(sendGridKey);
        // @ts-ignore
        this.from_email = new helper.Email(`ehabreda04@gmail.com`);
        // @ts-ignore
        this.subject = subject;
        // @ts-ignore
        this.body = new helper.Content("text/html", content);
        // @ts-ignore
        this.recipients = this.formatAddresses(recipients);
        // @ts-ignore
        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients: Recipient[]) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        // @ts-ignore
        this.recipients.forEach((recipient: any) => {
            console.log("recipient", recipient);
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        // @ts-ignore
        const request = this.sgApi.emptyRequest({
            method: "POST",
            path: "/v3/mail/send",
            body: this.toJSON(),
        });
        // @ts-ignore
        console.log("request", request, this.from_email);
        let response;
        try {
            // @ts-ignore
            response = await this.sgApi.API(request);
            return response;
        } catch (e) {
            console.log("error in send email", e);
            return e;
        }
    }
}
