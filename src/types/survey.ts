import {ObjectId} from "mongoose";

export interface Recipient{
    email: string;
    responded: boolean;
}

export interface Survey{
    id?: string;
    title: string;
    subject: string;
    body: string;
    recipients: [Recipient];
    yes?: number;
    no?: number;
    _user?: ObjectId;
    dateSent?: Date;
    lastResponded?: Date;
}