import { Schema } from 'mongoose';
import {Recipient} from "../types/survey";

export const  RecipientSchema=new Schema<Recipient>({
    email: { type: String},
    responded: { type: Boolean, default: false}
});



