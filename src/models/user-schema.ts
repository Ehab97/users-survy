import { Schema, model } from 'mongoose';

const  userSchema=new Schema<User>({
    name: { type: String},
    email: { type: String, unique:true},
    googleId:{type:String,required: true ,unique:true},
    image:{type:String}
});

const userModel=model<User>('User',userSchema);

export default  userModel;