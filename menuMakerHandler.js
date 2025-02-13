function calcularRaciones(hidratos, cada100) {
    // Verifica si los valores son válidos
    if (isNaN(hidratos) || isNaN(cada100)) {
        return 0;
    }

    // Calcula las raciones
    let raciones = (hidratos / 100) * cada100 / 10;

    return raciones;
}


// JavaScript para añadir interactividad al formulario
document.addEventListener("DOMContentLoaded", function () {
    const opciones = document.querySelectorAll("select");

    // Ocultar las opciones desplegables al cargar la página
    opciones.forEach(opcion => opcion.size = 1);

    // Mostrar opciones desplegables al hacer clic en el formulario
    const formulario = document.getElementById("miFormulario");
    formulario.addEventListener("click", function (event) {
        // Mostrar todas las opciones desplegables al hacer clic en el formulario
        opciones.forEach(opcion => {
            opcion.size = opcion.size === 1 ? opcion.length : 1;
        });
    });
});

// Tabla de valores
const tablaDeValores = {
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
};

// JavaScript para la calculadora
document.addEventListener("DOMContentLoaded", function () {
    const opcion1 = document.getElementById("selectIngredient");
    const opcion2 = document.getElementById("menuMakerQuantity");
    const opcion3 = document.getElementById("porCada100");
    const opcion4 = document.getElementById("foodName");
    const tabla = document.getElementById("calculatorTable").querySelector("tbody");
    const agregarFilaBtn = document.getElementById("agregarFila");
    const eliminarFilaBtn = document.getElementById("eliminarFila");
    const sumaTotal = document.getElementById("sumaTotal");

    opcion1.addEventListener("change", function () {
        calcularResultado();
    });

    opcion2.addEventListener("input", function () {
        calcularResultado();
    });

    agregarFilaBtn.addEventListener("click", function () {
        if (opcion1.value == 'personalizado'){
            agregarFilaPersonalizada();
        }else{
            agregarFilaClasica();
        }
        
    });

    eliminarFilaBtn.addEventListener("click", function () {
        eliminarFila();
    });

    function calcularResultado() {
        const resultado = (opcion1.value in tablaDeValores && typeof tablaDeValores[opcion1.value] === "number") ? opcion2.value / tablaDeValores[opcion1.value] : "No definido";
        return resultado !== "No definido" ? parseFloat(resultado).toFixed(2) : resultado;
    }

    function agregarFilaPersonalizada(){
        const fila = document.createElement("tr");
        const tdOpcion1 = document.createElement("td");
        const tdOpcion2 = document.createElement("td");
        const tdResultado = document.createElement("td");

        tdOpcion1.textContent = document.getElementById("foodName").value;
        tdOpcion2.textContent = opcion2.value;
        tdResultado.textContent = calcularRaciones(document.getElementById("menuMakerQuantity").value, document.getElementById("porCada100").value);

        fila.appendChild(tdOpcion1);
        fila.appendChild(tdOpcion2);
        fila.appendChild(tdResultado);

        tabla.appendChild(fila);

        // Actualizar la suma total
        actualizarSumaTotal();
    }

    function agregarFilaClasica() {
        const fila = document.createElement("tr");
        const tdOpcion1 = document.createElement("td");
        const tdOpcion2 = document.createElement("td");
        const tdResultado = document.createElement("td");

        tdOpcion1.textContent = opcion1.value;
        tdOpcion2.textContent = opcion2.value;
        tdResultado.textContent = calcularResultado();

        fila.appendChild(tdOpcion1);
        fila.appendChild(tdOpcion2);
        fila.appendChild(tdResultado);

        tabla.appendChild(fila);

        // Actualizar la suma total
        actualizarSumaTotal();
    }

    function eliminarFila() {
        const filas = tabla.querySelectorAll("tr");
        if (filas.length > 0) {
            tabla.removeChild(filas[filas.length - 1]);
            // Actualizar la suma total después de eliminar la fila
            actualizarSumaTotal();
        }
    }

    function actualizarSumaTotal() {
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
});



function showExtraOptions() {
    const selectedValue = document.getElementById('selectIngredient').value;
    const extraOptions = document.getElementById('extraInformation');
    if (selectedValue == 'personalizado'){
        extraOptions.style.display = 'flex';
    }else{
        extraOptions.style.display = 'none';
    }

};

function newRow(){
    const selectedValue = document.getElementById('selectIngredient').value;
    if (selectedValue == 'personalizado'){
        
    }else{

    }
}