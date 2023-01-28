import {NextFunction,Response,Request} from "express";
import {Recipient, Survey} from "../types/survey";
import SurveyModel from "../models/survay-schema";
import {User} from "../types/user";
import userModel from "../models/user-schema";
import Mailer from "../services/Mailer";
import {surveyTemplate} from "../helpers/emailTemplate";
import _ from "lodash";
import {Path} from "path-parser";
import {URL} from "url";

interface SurveyRequestBody extends  Omit<Survey, 'recipients'> {
    recipients: string;
}

interface SurveyWebhookRequestBody {
    email: string;
    url: string;
    event: string;
    timestamp?: number;
    ip?: string;
}

interface WebhookData {
    body:SurveyWebhookRequestBody[];
}

export const getSurveys = async (req:Request, res:Response, next:NextFunction) => {
    let user = req.user as User;
    try {
        // const surveys = await SurveyModel.find({_user: user.id}).select({recipients: false});
        const surveys = await SurveyModel.find({_user: user.id});
        res.status(200).json({surveys});
    } catch (error) {
        next(error);
    }
};

export const  createSurvey=async (req:Request,res:Response,next:NextFunction)=>{
    const RequestBody=req.body as SurveyRequestBody;
    console.log('surveyBody',RequestBody)
    let {title,subject,body,recipients}=RequestBody;
    let user = req.user as User;
    //save survey to db
    let recipientsList:any;
    recipientsList=recipients.split(',').map((email:string)=>({email:email.trim()}))

    const survey=new SurveyModel({
        title,
        subject,
        body,
        recipients: recipientsList,
        _user:user.id,
    });
    //send email to all recipients
    //use mailer class
    const mailer=new Mailer(survey,surveyTemplate(survey));
    try {
        await mailer.send();
    }catch (e) {
        console.log('error in send mail',e)
        return res.send({error:e});
    }
    try {
        await survey.save();
        const userData =  await userModel.findOneAndUpdate({_id:user.id},{$inc:{'credits':-1}})
        res.status(201).send({message:'Survey created successfully',survey,user:userData});
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
    //     const userData =  await userModel.findOneAndUpdate({_id:user.id},{$inc:{'credits':-1}})
    //     res.status(201).send({message:'Survey created successfully',survey,user:userData});
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

export const recordSurveyFeedback=async (req:Request,res:Response,next:NextFunction)=>{
    console.log('recordSurveyFeedback',req.body)
    let {body}=req as WebhookData;
    const p=new Path("/api/surveys/:surveyId/:choice");
    const events= _.chain(body)
        .map(({email,url,event})=>{
            if(event==='click'){
                const pathname=new URL(url).pathname;
                const match=p.test(pathname);
                if(match){
                    return {email,surveyId:match.surveyId,choice:match.choice}
                }
            }
        })
        .compact()
        .uniqBy(
    v => [v.email, v.surveyId].join()
        )
        .map( async ({surveyId,email,choice})=>{
           const survey=await SurveyModel.updateOne({
                _id:surveyId,
                recipients:{
                    $elemMatch:{email:email,responded:false}
                }
            },{
                $inc:{[choice]:1},
                $set:{'recipients.$.responded':true},
                lastResponded:new Date()
            }).exec();

           if (survey) {
               console.log('survey updated',survey)
           }

        })
        .value();

    res.send({message:'Thanks for your feedback',events});
};