import {Router} from "express";
import {createSurvey, getSurveys,recordSurveyFeedback,getSurveysThanks} from "../controller/surveys-controller";
import {checkCredits, checkLogin} from "../middleware/userAuth";

export const router = Router();

//get all surveys
router.get('/api/surveys',checkLogin, getSurveys);
//create new survey
router.post('/api/surveys',checkLogin,checkCredits, createSurvey);
//survey thanks
router.get('/api/surveys/:surveyId/:choice', getSurveysThanks);
//record feedback from survey
router.post('/api/surveys/webhooks', recordSurveyFeedback);


export default router;
