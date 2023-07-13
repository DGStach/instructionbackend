import fs from "fs"
const folderPath = "/Users/dagmara/dagmara.gabriela.stach@gmail.com - Google Drive/Mój dysk/docProdukcja"

function outPutFolder(){
fs.readdirSync(folderPath).forEach((file)=>{
    console.log(file)
})
}
outPutFolder()