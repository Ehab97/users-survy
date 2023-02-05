import {Router} from "express";
import {createSurvey, getSurveys,recordSurveyFeedback,getSurveysThanks} from "../controller/surveys-controller";
import {checkCredits, checkLogin} from "../middleware/userAuth";
import {checkAuth} from "../middleware/check-auth";

export const router = Router();

//get all surveys checkLogin or checkAuth
router.get('/api/surveys',checkAuth, getSurveys);
//create new survey
router.post('/api/surveys',checkAuth,checkCredits, createSurvey);
//survey thanks
router.get('/api/surveys/:surveyId/:choice', getSurveysThanks);
//record feedback from survey
router.post('/api/surveys/webhooks', recordSurveyFeedback);


export default router;
