import express from'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import {google} from 'googleapis';
import credentials from './credentials.json'assert { type: "json" };
const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
let accessToken;
let tree = {}
const APIkey = "AIzaSyDJLPV-CFbk1Xjd_M5Qyr4olBaDD-VvGNQ"

const SCOPE = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file']

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req,res)=>res.send('API Running'))

export const authURL = (req,res) =>{
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPE,
        prompt:'consent'
    });

    res.send(authUrl);
}


export const getToken = (req,res) => {
    if (req.body.code == null) return res.status(400).send('ERROR - lack of token in request body');
    oAuth2Client.getToken("4/0AZEOvhVthLOIwu_QclfR0wByIE7NU8rZPbPY7BI3JXuOsAvEFAMhcBSmHALsY3aGsOl_xA", (err, token) => {
        if (err) {
            console.error('Error retrieving access token', err);
            return res.status(400).send('Error retrieving access token');
        }
/*
        accessToken = {token}
*/
        res.send(token);
    });
}

app.post('/getUserInfo', (req, res) => {
    if (req.body.token == null) return res.status(400).send('Token not found');
    oAuth2Client.setCredentials(req.body.token);
    const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });

    oauth2.userinfo.get((err, response) => {
        if (err) res.status(400).send(err);
        console.log(response.data);
        res.send(response.data);
    })
});

 app.post('/readDrive', (req, res) => {
     if (req.body.token == null) return res.status(400).send('Token not found');
     oAuth2Client.setCredentials(req.body.token);

     const drive = google.drive({version: 'v3', auth: oAuth2Client});
     drive.files.list({
         q:"trashed = false",
         fields: "files(id,name,parents,mimeType)"
     }, (err, response) => {
         if (err) {
             console.log('The API returned an error: ' + err);
             return res.status(400).send(err);
         }
         const files = response.data.files;

        function buildTree(id, folder){

            files.filter(el=>el.parents && el.parents[0] === id).forEach((el)=>{
                if ( el.mimeType === "application/pdf"){
                    folder[el.id] =
                        {'name': el.name,
                            'type': "pdf"
                }}
                if ( el.mimeType === "application/vnd.google-apps.folder"){
                    folder[el.id] =
                        {'name': el.name,
                            'type': "folder",
                        'children': {}};
                    buildTree(el.id,folder[el.id].children)
                }
            })
        }
         buildTree("1-wZqWPF1ARUOhsBYbKCbxeUuqS4pbeP7", tree)
         console.log(JSON.stringify(tree, undefined, 4));
         res.send(tree);
     })
 })


