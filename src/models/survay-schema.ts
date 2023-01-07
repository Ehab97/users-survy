import { Schema, model } from 'mongoose';
import {Survey} from "../types/survey";
import {RecipientSchema} from "./recipiant-schema";

const  surveySchema=new Schema<Survey>({
    title: { type: String},
    subject: { type: String},
    body: { type: String},
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0},
    no: { type: Number, default: 0},
    _user: { type: Schema.Types.ObjectId, ref: 'User'},
    dateSent: { type: Date, default: Date.now},
    lastResponded: { type: Date}
});

const SurveyModel=model<Survey>('Survey',surveySchema);

export default  SurveyModel;