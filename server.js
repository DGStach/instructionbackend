import cors from 'cors'
import got from 'got';
import express from 'express'
import enterFolder from "./controllers/enterFolder.js"
import {uploadTree, getDriveService} from "./controllers/uploadTree.js"
import {authURL, getToken} from "./index.js"


const app = express()
 app.use(cors())
 app.get("/enterFolder", enterFolder);
 app.get("/getFolderTree", uploadTree);
 app.get("/getFolderTreeA", (req,res)=>res.send('API Running'))
 app.get('/getAuthURL', authURL );
app.post('/getToken', getToken);
app.post('/getDriveService', getDriveService)
app.get('/a',(req, res) => {

    let pdfurl2 = "https://www.wm.edu/as/programs/healthy_beginnings/files/additional_info/guide-to-firsts_first-time-clipping-babys-fingernails.pdf"
    let pdfurl1 = "https://drive.google.com/uc?export=download&id=1xXErjHYMWcABMGfej3_6WFfW19qNyxT-"
    let pdfurl6 = "https://drive.google.com/uc?export=download&id=16cFL1cAd-IwHjM1mCNzfUEIkJcr6PwoM"
/*  let pdfurl4 = "https://drive.google.com/uc?export=download&id=1gNYqT02I4E5GaQFurHhN57L2RdKA9qMW"
    let pdfurl3 = "https://media.tghn.org/articles/newbornsize.pdf"*/
    res.header(`Access-Control-Allow-Origin`, `*`);
    got.stream(pdfurl6).pipe(res);
});


const PORT = process.env.PORT || 5000;
 console.log('port to start: ', PORT)
app.listen(PORT, () => console.log(`Server Started ${PORT}`));

