"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const recipiant_schema_1 = require("./recipiant-schema");
const surveySchema = new mongoose_1.Schema({
    title: { type: String },
    subject: { type: String },
    body: { type: String },
    recipients: [recipiant_schema_1.RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    dateSent: { type: Date, default: Date.now },
    lastResponded: { type: Date }
});
const SurveyModel = (0, mongoose_1.model)('Survey', surveySchema);
exports.default = SurveyModel;
