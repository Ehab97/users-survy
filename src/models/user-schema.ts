import { Schema, model } from 'mongoose';
import {User} from "../types/user";

const  userSchema=new Schema<User>({
    name: { type: String},
    email: { type: String, unique:true},
    googleId:{type:String,required: true ,unique:true},
    image:{type:String},
    credits:{type:Number,default:0}
});

const userModel=model<User>('User',userSchema);

export default  userModel;