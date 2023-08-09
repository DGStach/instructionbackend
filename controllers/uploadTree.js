import {google} from 'googleapis';
import path from 'path'


export const uploadTree = (req,res)=>{
    console.log("tree")
    res.send("tree")
}

export const getDriveService = (req,res) => {
    console.log("hahah jestem w funkcji")
    const KEYFILEPATH = path.join(__dirname, "../service.json");
    const SCOPES = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES,
    });

    const driveService = google.drive({ version: 'v3', auth });
    const params = {};
    driveService.files.list(params)
        .then(response => {
        console.log(response.data);
        res.send(response.data)
    });
};


