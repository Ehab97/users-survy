 const googleClientID='654720547640-9610rprchm9v4rr39cs7ge39bmnikpte.apps.googleusercontent.com';
 const googleClientSecret='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';
 const DB_NAME='emaily';
 const DB_USER="Ehab_Reda";
 const DB_PASSWORD ="tlavDPV20sYIrY7s";
 const CLUSTER_NAME="places";
 const mongoAtlasURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_NAME}.xthzqey.mongodb.net/${DB_NAME}`;
 const cookieKey = 'this_is_a_cookie_key_emaily_app_2022';
 // as a text
 // mongodb+srv://Ehab_Reda:tlavDPV20sYIrY7s@places.xthzqey.mongodb.net/emaily
 module.exports = {
     googleClientID,
     googleClientSecret,
     mongoAtlasURI
 }