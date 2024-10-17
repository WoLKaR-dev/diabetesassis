function calcularRaciones() {
  const gramos = parseFloat(document.getElementById('hidratos').value);
  const cada100 = parseFloat(document.getElementById('cada100').value);

  // Verifica si los valores son válidos
  if (isNaN(gramos) || isNaN(cada100)) {
      document.getElementById('resultado').innerText = "Por favor, introduce valores numéricos válidos.";
      return;
  }

  // Calcula las raciones
  let raciones = (gramos / 100) * cada100 / 10;
  
  // Muestra el resultado en el div
  document.getElementById('resultado').innerText = "Raciones calculadas: " + raciones.toFixed(2);
}

function corregirGlucosa() {
    // Obtener el valor de la glucosa del input
    const nivelGlucosa = parseFloat(document.getElementById('glucosa').value);

    // Aplicar la regla de tres para calcular la corrección
    let glucosaCorregida;
    let diferencia;
    if (nivelGlucosa <= 50) {
        glucosaCorregida = nivelGlucosa;
        alert(`Nivel real de glucosa: ${glucosaCorregida}`);
    } else {
        glucosaCorregida = nivelGlucosa - 50;
        glucosaCorregida = (glucosaCorregida * 70) / 170;
        diferencia = nivelGlucosa - glucosaCorregida;
        alert(`Nivel real de glucosa: ${diferencia}`);
    }

}

// JavaScript para añadir interactividad al formulario
document.addEventListener("DOMContentLoaded", function() {
    const opciones = document.querySelectorAll("select");
  
    // Ocultar las opciones desplegables al cargar la página
    opciones.forEach(opcion => opcion.size = 1);
  
    // Mostrar opciones desplegables al hacer clic en el formulario
    const formulario = document.getElementById("miFormulario");
    formulario.addEventListener("click", function(event) {
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
  document.addEventListener("DOMContentLoaded", function() {
    const opcion1 = document.getElementById("opcion1");
    const opcion2 = document.getElementById("opcion2");
    const tabla = document.getElementById("tablaCalculadora").querySelector("tbody");
    const agregarFilaBtn = document.getElementById("agregarFila");
    const eliminarFilaBtn = document.getElementById("eliminarFila");
    const sumaTotal = document.getElementById("sumaTotal");
  
    opcion1.addEventListener("change", function() {
      calcularResultado();
    });
  
    opcion2.addEventListener("input", function() {
      calcularResultado();
    });
  
    agregarFilaBtn.addEventListener("click", function() {
      agregarFila();
    });
  
    eliminarFilaBtn.addEventListener("click", function() {
      eliminarFila();
    });
  
    function calcularResultado() {
      const resultado = (opcion1.value in tablaDeValores && typeof tablaDeValores[opcion1.value] === "number") ? opcion2.value / tablaDeValores[opcion1.value] : "No definido";
      return resultado;
    }
  
    function agregarFila() {
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
  
      sumaTotal.textContent = "Suma total de raciones: " + suma +" raciones";
    }
  });
  
  
