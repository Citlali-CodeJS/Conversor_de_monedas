

let valorDolar
let valorEuro

async function getConversorMonedas(){
    try{
    const res = await fetch("https://mindicador.cl/api/")
    const dataConversor = await res.json()
    valorDolar = dataConversor.dolar.valor
    valorEuro = dataConversor.euro.valor
    }
    catch(error){
        imprimirResultado.innerHTML=`Error en el sistema: ${error.message}`
    }
}

getConversorMonedas()



let buscarDato = document.getElementById("conversor")
let imprimirResultado = document.getElementById("result")
let valorEndpointGrafica = ""

buscarDato.addEventListener("click", ()=>{

let selectMoneda = document.getElementById("currency").value
let pesos = document.getElementById("amount").value
let resultado




if (selectMoneda=="dolar"){
    resultado = pesos / valorDolar
    imprimirResultado.innerHTML=`Resultado: $ ${resultado}`
}
else if (selectMoneda=="euro"){
    resultado = pesos / valorEuro
    imprimirResultado.innerHTML=`Resultado: € ${resultado}`
}
})


async function getDataHistoricaDol(){ 
    const endpoint = "https://mindicador.cl/api/dolar";
    const res = await fetch(endpoint);
    const monedas = await res.json();
    return monedas;
}

function ConfiguracionGraficaDol(monedas){
    const tipoDeGrafica = "line";
   
    const fechas = monedas.serie.map((moneda)=>moneda.fecha.substr(0,10));
    const titulo = "Últimos 10 Registros";
    const colorDeLinea = "rgba(127, 160, 124, 0.993)";
    const valores = monedas.serie.map((moneda)=>{
        const valor = moneda.valor;
        return Number(valor);
    });
    
    const fechas10 = fechas.slice(0,10).reverse();
    const valores10 = valores.slice(0,10).reverse();

const config = {
    type: tipoDeGrafica,
    data: {
        labels: fechas10,
        datasets: [{
            label: titulo,
            backgroundColor: colorDeLinea,
            data: valores10
        }]
    }
}

return config;

}

async function renderGraficaDol(){
    const monedas = await getDataHistoricaDol();
    const config = ConfiguracionGraficaDol(monedas);
    const chartDOM = document.getElementById("ChartDol");
    new Chart(chartDOM, config);
}

renderGraficaDol();




async function getDataHistoricaEu(){ 
    const endpoint = "https://mindicador.cl/api/euro";
    const res = await fetch(endpoint);
    const monedas = await res.json();
    return monedas;
}

function ConfiguracionGraficaEu(monedas){
    const tipoDeGrafica = "line";
    
    const fechas = monedas.serie.map((moneda)=>moneda.fecha.substr(0,10));
    const titulo = "Últimos 10 Registros";
    const colorDeLinea = "rgba(127, 160, 124, 0.993)";
    const valores = monedas.serie.map((moneda)=>{
        const valor = moneda.valor;
        return Number(valor);
    });
   
    const fechas10 = fechas.slice(0,10).reverse();
    const valores10 = valores.slice(0,10).reverse();

const config = {
    type: tipoDeGrafica,
    data: {
        labels: fechas10,
        datasets: [{
            label: titulo,
            backgroundColor: colorDeLinea,
            data: valores10
        }]
    }
}

return config;

}

async function renderGraficaEu(){
    const monedas = await getDataHistoricaEu();
    const config = ConfiguracionGraficaEu(monedas);
    const chartDOM = document.getElementById("ChartEu");
    new Chart(chartDOM, config);
}

renderGraficaEu();