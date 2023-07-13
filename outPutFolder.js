import fs from "fs"
const folderPath = "/Users/dagmara/dagmara.gabriela.stach@gmail.com - Google Drive/Mój dysk/docProdukcja/stanowisko_kontroli/RB0508"

function outPutFolder(){
fs.readdirSync(folderPath).filter(fn =>{
    if(!fn.startsWith(".")){
        if (fn.endsWith('') && (!fn.endsWith('.pdf')))
            console.log("machine", fn)}
        if (fn.endsWith('.pdf')){
            console.log('instruction', fn)
        }
        }
)}
outPutFolder()