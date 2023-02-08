import { Schema, model } from 'mongoose';
import {User} from "../types/user";
import uniqueValidator from 'mongoose-unique-validator';

const  userSchema=new Schema<User>({
    name: { type: String},
    email: { type: String, unique:true,required:true},
    password: { type: String, required: true, minlength: 8 },
    googleId:{type:String,unique:true},
    image:{type:String},
    credits:{type:Number,default:0}
});
userSchema.plugin(uniqueValidator);
const userModel=model('User',userSchema);

export default  userModel;