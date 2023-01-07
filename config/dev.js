//won't be commited to git

const googleClientID='654720547640-9610rprchm9v4rr39cs7ge39bmnikpte.apps.googleusercontent.com';
const googleClientSecret='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';
const DB_NAME='emaily';
const DB_USER="Ehab_Reda";
const DB_PASSWORD ="tlavDPV20sYIrY7s";
const CLUSTER_NAME="places";
const mongoAtlasURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_NAME}.xthzqey.mongodb.net/${DB_NAME}`;
const sendGridKey=`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`;
const clientDomain='http://localhost:3000';
// as a text
// mongodb+srv://Ehab_Reda:tlavDPV20sYIrY7s@places.xthzqey.mongodb.net/emaily
module.exports = {
    googleClientID,
    googleClientSecret,
    mongoAtlasURI,
    sendGridKey,
    isDev:true,
    clientDomain
}
