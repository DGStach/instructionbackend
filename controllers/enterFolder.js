import fs from "fs"

export default function enterFolder(req,res) {

    let rootPath = "/Users/dagmara/dagmara.gabriela.stach@gmail.com - Google Drive/Mój dysk/docProdukcja"
    let folderPath = rootPath + "/" + req.query.entfn;
    let folderContent = [];

    fs.readdirSync(folderPath).filter(fn => {
        if (!fn.startsWith(".")) {
            if (fn.endsWith('.dir'))
                console.log("folder", fn);
            folderContent.push(`folder_${fn}`);
            if (fn.endsWith('.pdf')) {
                folderContent.push(`instruction_${fn}`);
            }
        }
    })
    console.log("folderContent", folderContent);
    rootPath = folderPath;
    console.log("rootPath", rootPath);
}
