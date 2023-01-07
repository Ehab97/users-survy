import {NextFunction,Response,Request} from "express";
import {Survey} from "../types/survey";
import SurveyModel from "../models/survay-schema";
import {User} from "../types/user";
import userModel from "../models/user-schema";
import Mailer from "../services/Mailer";
import {surveyTemplate} from "../helpers/emailTemplate";



export const getSurveys = async (req:Request, res:Response, next:NextFunction) => {

};

export const  createSurvey=async (req:Request,res:Response,next:NextFunction)=>{
    const RequestBody=req.body as Survey;
    console.log('surveyBody',RequestBody)
    let {title,subject,body,recipients}=RequestBody;
    let user = req.user as User;
    //save survey to db

    const survey=new SurveyModel({
        title,
        subject,
        body,
        // @ts-ignore
        recipients: recipients.split(',').map((email:string)=>({email:email.trim()})),
        _user:user.id,
    });
    //send email to all recipients
    //use mailer class
    const mailer=new Mailer(survey,surveyTemplate(survey));
    try {
        await mailer.send();
        await survey.save();
        await userModel.findOneAndUpdate({_id:user.id},{$inc:{'credits':-1}})
        res.status(201).send({message:'Survey created successfully',survey});
    }catch (e) {
        res.send(422).send(e);
    }

    //use @sendgrid/mail functional approach
    // const mailer= Mailer(survey,surveyTemplate(survey));
    // try {
    //     console.log('mailer',mailer,survey)
    //      await mailer.send()
    // }catch (e) {
    //     console.log(e)
    //     return res.send({error:e});
    // }
    // // save
    // try {
    //      await survey.save();
    //      await userModel.findOneAndUpdate({_id:user.id},{$inc:{'credits':-1}})
    //       res.status(201).send({message:'Survey created successfully',survey});
    // }catch (e) {
    //     res.status(500).send({error:'Something went wrong'});
    // }


};

export const getSurveysThanks= (req:Request,res:Response,next:NextFunction)=>{
    const html=`<div style="text-align: center">
    <h3>Thanks for your feedback</h3>
    <p>Please provide us with more feedback</p>
</div>`
    res.send(html);
}

export const recordSurveyFeedback=async (req:Request,res:Response,next:NextFunction)=>{};