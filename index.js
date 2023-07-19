import express from'express';
const app = express();
import bodyParser from 'body-parser';
import cors from 'cors';
import { google } from'googleapis';
import multer from 'multer';
import fs from "fs";
import formidable from'formidable';
import credentials from './credentials.json'assert { type: "json" };

/*

"https://www.youtube.com/watch?v=cQAbGqoZmBM";
"https://github.com/pyrecyter/OAuth/blob/master/index.js"
*/

const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);


const SCOPE = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file']

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req,res)=>res.send('API Running'))

app.get('/getAuthURL', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPE,
        prompt: 'force'
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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started ${PORT}`));
