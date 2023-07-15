import enterFolder from "../controllers/enterFolder.js"

test("opis testu", ()=>{
    expect(enterFolder('"/Users/dagmara/dagmara.gabriela.stach@gmail.com - Google Drive/Mój dysk/docProdukcja/stanowiskoMontażu2')).toBe('Hi');
})

