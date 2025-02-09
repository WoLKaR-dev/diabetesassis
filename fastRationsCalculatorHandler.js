
function hideCalculators(){
    let simpleCalculatorUI = document.getElementById('simpleCalculatorMode');
    let advancedCalculatorUI = document.getElementById('advancedCalculatorMode');
    simpleCalculatorUI.style.display = 'none';
    advancedCalculatorUI.style.display = 'none';
}

function showSimpleCalculator( ){
    hideCalculators();
    let simpleCalculatorUI= document.getElementById('simpleCalculatorMode');
    simpleCalculatorUI.style.display = 'flex';
}

function showAdvancedCalculator() {
    hideCalculators();
    let advancedCalculatorUI = document.getElementById('advancedCalculatorMode');
    advancedCalculatorUI.style.display = 'flex';
}

function returnRations () {
    let foodAmount = parseFloat(document.getElementById('simpleFoodAmount').value);
    let each100 = parseFloat(document.getElementById('simpleEach100').value);
    
    if(isNaN(foodAmount)||isNaN(each100)){
        return 0;
    }

    let calc = (foodAmount / 100) * each100 / 10;
    return calc; 
}

function returnAdvancedRations(){
    let foodAmount = parseFloat(document.getElementById('advancedFoodAmount').value);
    let each100 = parseFloat(document.getElementById('advancedEach100').value);
    
    if(isNaN(foodAmount)||isNaN(each100)){
        return 0;
    }

    let calc = (foodAmount / 100) * each100 / 10;
    return calc; 
}

function calculateSimpleRations(){
    let calculatedRations = returnRations();
    document.getElementById('resultado').innerText = "Raciones calculadas: " + calculatedRations.toFixed(2);
}


function agregarFila(){
    let table = document.getElementById("advancedCalculator").querySelector('tbody');
    let row = document.createElement('tr');
    let tdResultado = document.createElement("td");
    tdResultado.textContent = returnAdvancedRations();
    row.appendChild(tdResultado);
    table.appendChild(row);
    actualizarSumaTotal();
}

function eliminarFila() {
    let table = document.getElementById("advancedCalculator").querySelector('tbody');
    const filas = document.getElementById("advancedCalculator").querySelector('tbody').querySelectorAll("tr");
    if (filas.length > 0) {
        table.removeChild(filas[filas.length - 1]);
        actualizarSumaTotal();
    }
}

function actualizarSumaTotal() {
    let suma = 0;
    let sumaTotal = document.getElementById("sumaTotal")
    const filas = document.getElementById("advancedCalculator").querySelector('tbody').querySelectorAll("tr");
    filas.forEach(fila => {
        const resultado = parseFloat(fila.querySelector("td:last-child").textContent);
        if (!isNaN(resultado)) {
            suma += resultado;
        }
    });

    sumaTotal.textContent = "Suma total de raciones: " + suma.toFixed(2) + " raciones";
}

