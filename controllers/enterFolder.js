import fs from "fs"

export default function enterFolder(req,res) {

    const rootPath = "/Users/dagmara/dagmara.gabriela.stach@gmail.com - Google Drive/Mój dysk/docProdukcja"
    const folderPath = rootPath + "/" + req.query.entfn;

    fs.readdirSync(folderPath).filter(fn => {
        if (!fn.startsWith(".")) {
            if (fn.endsWith('') && (!fn.endsWith('.pdf')))
                console.log("machine", fn)
            if (fn.endsWith('.pdf')) {
                console.log('instruction', fn)
            }
        }

        /*     if(!fn.startsWith(".")){
                 if (fn.endsWith('') && (!fn.endsWith('.pdf')))
                     console.log("machine", fn)}
             if (fn.endsWith('.pdf')){
                 console.log('instruction', fn)
             }*/

        /*
                }*/
        /*)*/
    })
}
