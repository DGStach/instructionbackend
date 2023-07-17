import fs from "fs"

export default function enterFolder(req,res) {

    let rootPath = "/Users/dagmara/dagmara.gabriela.stach@gmail.com - Google Drive/Mój dysk/docProdukcja/stanowiskoMontazu1"
    let folderPath = rootPath + "/" + req.query.entfn;
    let folderContent = [];

    fs.readdirSync(folderPath).filter(fn => {
        let ext = "folder"
        if (fn.split(".").pop() === "pdf"){
            ext ="pdf"
        }
        if (!fn.startsWith(".")) {
            folderContent.push({
                ext:ext,
                Name:fn,
                path:folderPath + fn
            })
        }
    })
    rootPath = folderPath;

    console.log("folderContent", folderContent);
    console.log("rootPath", rootPath);

    res.send(folderContent)
}
