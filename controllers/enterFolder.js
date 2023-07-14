import fs from "fs"

export default function handleEnterFolder(req,res) {
    console.log("Inside handleEnterFolder ");
    const rootPath = "/Users/dagmara/dagmara.gabriela.stach@gmail.com - Google Drive/Mój dysk/docProdukcja/"
    const folderPath = rootPath /*+ req.query.entfn*/
    console.log("req.query(\"entfn\")", req.query("entfn"))
    console.log("folderPath", folderPath);
    res.send(folderPath);

    fs.readdirSync(folderPath).filter(fn =>{
    if(!fn.startsWith(".")){
        if (fn.endsWith('') && (!fn.endsWith('.pdf')))
            console.log("machine", fn)}
        if (fn.endsWith('.pdf')){

            console.log('instruction', fn)
        }
        }
)
}
