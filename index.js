const puppeteer = require('puppeteer');

async function pegaPrecos (){

  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.setViewport({
    width: 1350,
    height: 2200,
    deviceScaleFactor: 1
  });
  await page.goto('https://www.angeloni.com.br/super/c/especiais/super-ofertas/');

  await page.waitFor(5000)


  const titulo = await page.evaluate(()=>{
    let selector = document.querySelectorAll(".box-produto__desc-prod");
    let tituloProduto = []
    selector.forEach((i)=>{
        tituloProduto.push(i.textContent)
    })
    return tituloProduto
});

const preco = await page.evaluate(()=>{
    let selectorPreco = document.querySelectorAll(".box-produto__preco");
    let precoProduto = [];

    selectorPreco.forEach((i)=>{
        precoProduto.push(i.textContent)
    })
    return precoProduto;
})

const nomePrecoPronto = juntarTituloComPreco(titulo, preco)


console.log(nomePrecoPronto)      
    
  await page.screenshot({path: './screenShot/produtos12/example.png', fullPage: true});

  await browser.close();
};

pegaPrecos();





function juntarTituloComPreco(a,b){
    let arrayFinal = []
    for(let i = 0; i < a.length; i++){
        arrayFinal.push(a[i]+ " " + b[i])
    }
    return arrayFinal    
}