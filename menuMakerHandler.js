const tablasDeValores = {
    classic: {
        "Leche, entera, desnatada, semidesnatada": 200,
        "Yogur natural": 2,
        "Yogur Sabores": 0.6,
        "Yogur desnatado": "Leer etiqueta",
        "Queso de burgos": 250,
        "Requesón": "Libre",
        "Quesitos, queso lonchas, otros.": "Libre",
        "Pan integral o blanco": 20,
        "Biscotes": 14,
        "Pan de Molde": 20,
        "Galletas Maria": 12,
        "Conr-Flakes de Kellogs": 14,
        "Harina de Trigo": 12,
        "Rice-Crispis": 12,
        "Legumbres Cocidas": 50,
        "Legumbre Cruda": 12,
        "Pasta Cocida": 50,
        "Pasta Cruda": 12,
        "Patata Cocida": 50,
        "Patata Frita": 35,
        "Patata Chips": 15,
        "Patata Cruda": 35,
        "Arroz Cocida y lavada": 35,
        "Arroz en paella": 25,
        "Arroz cruda": 12,
        "Las mas habituales, manzana, pera...": 100,
        "Plátano, no maduro": 50,
        "Uvas, higos, chirimoyas": 50,
        "Sandía, melón": 150,
        "Fresa, fresón": 180,
        "Ciruelas, cerezas, nísperos, fresquillas, kiwi, piña": 70,
        "Aguacate": 160,
        "Judías verdes, espinacas, acelgas, repollo, coliflor, brócoli, berenjena, calabacin, esparrago, cardo, puerro": 300,
        "Lechuga, escarola, endivia, pepino crudo": 300,
        "Tomate, crudo y frito": 250,
        "Coles de Bruselas Cocidas": 200,
        "Setas, champiñón frito o asado": 175,
        "Alcachofa, frita o asada": 150,
        "Pimiento, crudo o asado": 150,
        "Zanahoria Cocida": 150,
        "Zanahoria Cruda": 100,
        "Cebolla, cruda, frita o asada": 100,
        "Remolacha, guisantes, habas-cocidos.": 100
    },
    kfc: {
        "Tiras de pechuga Crispy": 12.90,
        "Tiras de pechuga Original": 8.00,
        "Tiras Veggie": 13.10,
        "Pieza pollo Original": 9.00,
        "Pieza pollo cruji": 10.40,
        "Alitas picantes": 12.80,
        "Aros de cebolla": 26.00,
        "Emmental bites": 32.00
    },
};

function returnItemValue(typeOfTable, itemName){
    let table;

    if (typeOfTable == 1){
        table = tablasDeValores.classic;
    }else{
        table = tablasDeValores.kfc;
    }

    let itemValue = table[itemName];
    return itemValue;
}


function openSpecificMenuMaker(calculatorMode) {
    let classicMenu = document.getElementById('classicMenu');
    let classicMenuInstructions = document.getElementById('classicMenuInstructions');
    let kfcMenu = document.getElementById('kfcMenu');
    let kfcMenuAlert = document.getElementById('kfcAlert');

    function makeMenusInvisible() {
        classicMenu.style.display = 'none';
        classicMenuInstructions.style.display = 'none';
        kfcMenu.style.display = 'none';
        kfcMenuAlert.style.display = 'none';
    }

    if (calculatorMode == 2) {
        makeMenusInvisible();
        kfcMenu.style.display = 'flex';
        kfcMenuAlert.style.display = 'block';
    } else {
        makeMenusInvisible();
        classicMenu.style.display = 'flex';
        classicMenuInstructions.style.display = 'flex';
    }
}

function calcularRaciones(hidratos, cada100) {
    // Verifica si los valores son válidos
    if (isNaN(hidratos) || isNaN(cada100)) {
        return 0;
    }

    // Calcula las raciones
    let raciones = (hidratos / 100) * cada100 / 10;

    return raciones;
}

function agregarFilaKFC(){
    const selectedValue = document.getElementById('selectIngredientKFC').value;
    const foodAmount = document.getElementById('foodAmountKFC').value;
    const each100 = document.getElementById('each100KFC').value;
    const foodName = document.getElementById('foodNameKFC').value;
    let tableToAdd = document.getElementById('menuTableKFC').querySelector("tbody");
    let fila = document.createElement('tr');
    let rowName = document.createElement('td');
    let amount = document.createElement('td');
    let rations = document.createElement('td');

    if (selectedValue == 'personalizado'){
        rowName.textContent = foodName;
        rations.textContent = calcularRaciones(foodAmount, each100);
    }else{
        rowName.textContent = selectedValue;
        rations.textContent = calcularRaciones(foodAmount, returnItemValue(2, selectedValue));
    }
    amount.textContent = foodAmount;
    fila.appendChild(rowName);
    fila.appendChild(amount);
    fila.appendChild(rations);
    tableToAdd.appendChild(fila);
    actualizarSumaTotal(2);
}

function agregarFilaClassic(){
    const selectedValue = document.getElementById('selectIngredientClassic').value;
    const foodAmount = document.getElementById('foodAmountClassic').value;
    const each100 = document.getElementById('each100Classic').value;
    const foodName = document.getElementById('foodNameClassic').value;
    let tableToAdd = document.getElementById('menuTableClassic').querySelector("tbody");
    let fila = document.createElement('tr');
    let rowName = document.createElement('td');
    let amount = document.createElement('td');
    let rations = document.createElement('td');

    if (selectedValue == 'personalizado'){
        rowName.textContent = foodName;
        rations.textContent = calcularRaciones(foodAmount, each100);
    }else{
        rowName.textContent = selectedValue;
        rations.textContent = calcularRaciones(foodAmount, returnItemValue(1, selectedValue));
    }
    amount.textContent = foodAmount;
    fila.appendChild(rowName);
    fila.appendChild(amount);
    fila.appendChild(rations);
    tableToAdd.appendChild(fila);
    actualizarSumaTotal(1);
}

function eliminarFilaKFC(){
    const tabla = document.getElementById("menuTableKFC").querySelector("tbody");
    const filas = tabla.querySelectorAll("tr");
    if (filas.length > 0) {
        tabla.removeChild(filas[filas.length - 1]);
        actualizarSumaTotal(2);
    }

}
function eliminarFilaClassic(){
    const tabla = document.getElementById("menuTableClassic").querySelector("tbody");
    const filas = tabla.querySelectorAll("tr");
    if (filas.length > 0) {
        tabla.removeChild(filas[filas.length - 1]);
        actualizarSumaTotal(1);
    }
}



function showExtraOptionsClassic() {
    const selectedValue = document.getElementById('selectIngredientClassic').value;
    const extraOptions = document.getElementById('extraInformationClassic');
    if (selectedValue == 'personalizado') {
        extraOptions.style.display = 'flex';
    } else {
        extraOptions.style.display = 'none';
    }

};

function showExtraOptionsKFC() {
    const selectedValue = document.getElementById('selectIngredientKFC').value;
    const extraOptions = document.getElementById('extraInformationKFC');
    if (selectedValue == 'personalizado') {
        extraOptions.style.display = 'flex';
    } else {
        extraOptions.style.display = 'none';
    }

};

function actualizarSumaTotal(tableNumber){
    var tabla;
    var sumaTotal;

    if(tableNumber == 1){
        tabla = document.getElementById("menuTableClassic").querySelector("tbody");
        sumaTotal = document.getElementById('sumaTotalClassic');
    }else{
        tabla = document.getElementById("menuTableKFC").querySelector("tbody");
        sumaTotal = document.getElementById('sumaTotalKFC');
    }

    let suma = 0;
    const filas = tabla.querySelectorAll("tr");
    filas.forEach(fila => {
        const resultado = parseFloat(fila.querySelector("td:last-child").textContent);
        if (!isNaN(resultado)) {
            suma += resultado;
        }
    });

    sumaTotal.textContent = "Suma total de raciones: " + suma.toFixed(2) + " raciones";
}