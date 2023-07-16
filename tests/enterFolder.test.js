import enterFolder from "../controllers/enterFolder.js"

test("Zawartość Folderu", ()=>{
    expect(enterFolder('/Users/dagmara/dagmara.gabriela.stach@gmail.com - Google Drive/Mój dysk/docProdukcja')).toBe('blabalb');
})

