//prod file
// const googleClientID='492024761393-kv51j76unt0ombqvhrgr645j4495p5nk.apps.googleusercontent.com';492024761393-kv51j76unt0ombqvhrgr645j4495p5nk.apps.googleusercontent.com
// const googleClientSecret='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';
const DB_NAME='emaily-prod';
const DB_USER="Ehab_Reda";
const DB_PASSWORD ="tlavDPV20sYIrY7s";
const CLUSTER_NAME="places";
// const mongoAtlasURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_NAME}.xthzqey.mongodb.net/${DB_NAME}`;
module.exports = {
    googleClientID:process.env.GOOGLE_CLIENT_ID,
    googleClientSecret:process.env.GOOGLE_CLIENT_SECRET,
    mongoAtlasURI:process.env.MONGO_ATLAS_URI,
    sendGridKey:process.env.SEND_GRID_KEY,
    clientDomain:process.env.CLIENT_DOMAIN,
    isDev:false
}