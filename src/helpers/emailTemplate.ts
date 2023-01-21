// @ts-ignore
import {clientDomain} from '../../config/keys';
import {Survey} from "../types/survey";

export const surveyTemplate = (survey: Survey) => {
    return `
    <html>
        <head>
        <style>
            .flex {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 auto;
                 idth: 100%;
            }
            .space-x-4 {
                margin-left: .75rem;
            }
        </style>
        </head>
        <body>
            <div style="text-align: center;">
                <h3>I'd like your input!</h3>
                <p>Please answer the following question:</p>
                <p>${survey.body}</p>
                
                     <div >
                         <a href="${!process.env.BASE_URL?'':process.env.BASE_URL}/api/surveys/${survey.id}/yes">Yes</a>
                    </div>
                    <div>
                        <a href="${!process.env.BASE_URL?'':process.env.BASE_URL}/api/surveys/${survey.id}/no">No</a>
                    </div>
              
            </div>
        </body>
    </html>
    `;
}