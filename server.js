import cors from 'cors'
import got from 'got';
import express from 'express'

const app = express()
app.use(cors())




 app.get('/a',(req, res) => {
    let pdfurl2 = "https://www.wm.edu/as/programs/healthy_beginnings/files/additional_info/guide-to-firsts_first-time-clipping-babys-fingernails.pdf"
    let pdfurl1 = "https://drive.google.com/uc?export=download&id=1xXErjHYMWcABMGfej3_6WFfW19qNyxT-"
    let pdfurl4 = "https://drive.google.com/uc?export=download&id=1gNYqT02I4E5GaQFurHhN57L2RdKA9qMW"
    let pdfurl3 = "https://media.tghn.org/articles/newbornsize.pdf"


/*
    console.log(pdfurl2);
*/
    res.header(`Access-Control-Allow-Origin`, `*`);
    got.stream(pdfurl1).pipe(res);
})

app.listen(3005)

