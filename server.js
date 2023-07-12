import cors from 'cors'
import got from 'got';
import express from 'express'

const app = express()
app.use(cors())

 app.get('/a',(req, res) => {
    let pdfurl2 = "https://www.wm.edu/as/programs/healthy_beginnings/files/additional_info/guide-to-firsts_first-time-clipping-babys-fingernails.pdf"
    let pdfurl1 = "https://drive.google.com/file/d/1xXErjHYMWcABMGfej3_6WFfW19qNyxT-/view?usp=sharing"
    let pdfurl3 = "https://media.tghn.org/articles/newbornsize.pdf"


    console.log(pdfurl1);
    res.header(`Access-Control-Allow-Origin`, `*`);
    got.stream(pdfurl3).pipe(res);

})

app.listen(3005)

