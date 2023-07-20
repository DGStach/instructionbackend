import express from'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import {drive_v3, google} from 'googleapis';
import multer from 'multer';
import fs from "fs";
import formidable from'formidable';
import credentials from './credentials.json'assert { type: "json" };
const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);


const SCOPE = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file']

/*
kind: 'drive#file',
    mimeType: 'application/pdf',

    mimeType: 'application/vnd.google-apps.folder',
    id: '1-wZqWPF1ARUOhsBYbKCbxeUuqS4pbeP7',
    name: 'docProdukcja'

*/



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res)=>res.send('API Running'))

app.get('/getAuthURL', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPE,
        prompt:'consent'
    });
    console.log(authUrl);
    return res.send(authUrl);
});

app.post('/getToken', (req, res) => {
    if (req.body.code == null) return res.status(400).send('MALINOWY KRÓL ');
    oAuth2Client.getToken(req.body.code, (err, token) => {
        if (err) {
            console.error('Error retrieving access token', err);
            return res.status(400).send('Error retrieving access token');
        }
        res.send(token);
    });
});

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
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    drive.files.list({
    }, (err, response) => {
        if (err) {
            console.log('The API returned an error: ' + err);
            return res.status(400).send(err);
        }
        const files = response.data.files;
        if (files.length) {
            console.log('Files:');
            files.map((file) => {
                console.log(`${file.name} (${file.id})`);
            });
        } else {
            console.log('No files found.');
        }
        res.send(files);
    });
});
let folderId = "1-wZqWPF1ARUOhsBYbKCbxeUuqS4pbeP7"
app.get('/:"1-wZqWPF1ARUOhsBYbKCbxeUuqS4pbeP7"/children', (req,res)=>
    res.send('API Running'))

app.post('/:"1-wZqWPF1ARUOhsBYbKCbxeUuqS4pbeP7"/children', (req, res) => {
    if (req.body.token == null) return res.status(400).send('Token not found');
    oAuth2Client.setCredentials(req.body.token);
    const drive = google.drive({ version: 'v3', auth: oAuth2Client });
    const myfun = google.script({ version: 'v3', auth: oAuth2Client })
    drive.files.list({
    }, (err, response) => {
        if (err) {
            console.log('The API returned an error: ' + err);
            return res.status(400).send(err);
        }
        const files = response.data.files;
        if (files.length) {
            console.log("----------------->>>>>",files)
            console.log('Files:');
            files.map((file) => {
/*
                console.log(`${file.name} (${file.id})`);
*/
            });
        } else {
            console.log('No files found.');
        }
        res.send(files);
    });
});

async function runSample () {
    // Create a new JWT client using the key file downloaded from the Google Developer Console
    const client = await google.auth.getClient({
        keyFile: path.join(__dirname, 'projectmayhemserviceaccountkey.json'),
        scopes: ['https://www.googleapis.com/auth/script.send_mail',
            'https://www.googleapis.com/auth/spreadsheets']
    });

    // Obtain a new drive client, making sure you pass along the auth client
    const script = google.script({
        version: 'v1',
        //auth: client,
        //scriptId:'161Fz0bbfidXzkpbJ5szhfUd6MEJecolBMwr1GD03LFCesQ4GztrfMynB'
    });
    //console.log(script);
    // Make an authorized request to list Drive files.
    const res = await script.scripts.run(
        {
            scriptId:'161Fz0bbfidXzkpbJ5szhfUd6MEJecolBMwr1GD03LFCesQ4GztrfMynB',
            auth: client,
            function: 'ConsolidateSheet'
        }
    );
    console.log(res.data);

    return res.data;
}
if (module === require.main) {
    runSample().catch(console.error);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started ${PORT}`));
