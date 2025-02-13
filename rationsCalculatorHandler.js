var isFat = false;

function checkedCheckbox() {
    isFat = !isFat;
    let simpleFatOption = document.getElementById('simpleFatOption');
    let advancedFatOption = document.getElementById('advancedFatOption');

    if (isFat == true) {
        simpleFatOption.style.display = 'flex'
        advancedFatOption.style.display = 'flex'
    } else {
        simpleFatOption.style.display = 'none'
        advancedFatOption.style.display = 'none'
    }

}


function showCalculator(tipeOfCalculator) {
    let simple = document.getElementById('simpleCalculator');
    let advanced = document.getElementById('advancedCalculator');
    simple.style.display = 'none';
    advanced.style.display = 'none';

    if (tipeOfCalculator == 'simple') {
        simple.style.display = 'flex'
    } else {
        advanced.style.display = 'flex'
    }
}



function returnClassicRations() {
    let foodAmount = parseFloat(document.getElementById('simpleFoodAmount').value);
    let each100 = parseFloat(document.getElementById('simpleEach100').value);
    let fatEach100 = parseFloat(document.getElementById('simpleFatEach100').value);
    let result = 0;
    let fatRations = ((foodAmount/100)*fatEach100)/10;



    if (isNaN(foodAmount) || isNaN(each100)) {
        return 0;
    }

    if (isFat){
        result = ((foodAmount / 100) * each100 / 10)+fatRations;
    }else{
        result = (foodAmount / 100) * each100 / 10;
    }


    return result;
}

function returnAdvancedRations() {
    let foodAmount = parseFloat(document.getElementById('advancedFoodAmount').value);
    let each100 = parseFloat(document.getElementById('advancedEach100').value);
    let fatEach100 = parseFloat(document.getElementById('advancedFatEach100').value);
    let result = 0;
    let fatRations = ((foodAmount/100)*fatEach100)/10;



    if (isNaN(foodAmount) || isNaN(each100)) {
        return 0;
    }

    if (isFat){
        result = ((foodAmount / 100) * each100 / 10)+fatRations;
    }else{
        result = (foodAmount / 100) * each100 / 10;
    }


    return result;
}


function simpleCalc() {
    let amount = returnClassicRations();
    document.getElementById('finalResult').innerText = 'Raciones calculadas: ' + amount;
}

function agregarFila() {
    let table = document.getElementById("foodTable").querySelector('tbody');
    let row = document.createElement('tr');
    let tdName = document.createElement("td");
    let tdResultado = document.createElement("td");
    tdResultado.textContent = returnAdvancedRations();
    tdName.textContent = document.getElementById("foodName").value;
    row.appendChild(tdName);
    row.appendChild(tdResultado);
    table.appendChild(row);
    actualizarSumaTotal();
}

function eliminarFila() {
    let table = document.getElementById("foodTable").querySelector('tbody');
    const filas = document.getElementById("foodTable").querySelector('tbody').querySelectorAll("tr");
    if (filas.length > 0) {
        table.removeChild(filas[filas.length - 1]);
        actualizarSumaTotal();
    }
}
function actualizarSumaTotal() {
    let suma = 0;
    let sumaTotal = document.getElementById("sumaTotal")
    const filas = document.getElementById("foodTable").querySelector('tbody').querySelectorAll("tr");
    filas.forEach(fila => {
        const resultado = parseFloat(fila.querySelector("td:last-child").textContent);
        if (!isNaN(resultado)) {
            suma += resultado;
        }
    });

    sumaTotal.textContent = "Suma total de raciones: " + suma.toFixed(2) + " raciones";
}