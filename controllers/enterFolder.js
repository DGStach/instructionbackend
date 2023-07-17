import fs from "fs"

export default function enterFolder(req,res) {


    let rootPath = "/Users/dagmara/dagmara.gabriela.stach@gmail.com - Google Drive/Mój dysk/docProdukcja"
    let folderPath = rootPath + "/" + req.query.entfn;
    let folderContent = [];

    fs.readdirSync(folderPath).filter(fn => {
        if (!fn.startsWith(".")) {
            folderContent.push({
                ext:fn.split(".")[0],
                Name:fn.split(".")[1],
                path:folderPath
            })
        }
    })
    rootPath = folderPath;

    console.log("folderContent", folderContent);
    console.log("rootPath", rootPath);

    res.send(folderContent)
}
