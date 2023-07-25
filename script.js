function generarEdades(numPersonas) {
  var edades = [];

  while (numPersonas > 0) {
    var edad = Math.floor(Math.random() * 100) + 1; // Generar una edad aleatoria entre 1 y 100

    if (edad >= 18) {
      edades.push(edad);
      numPersonas--;
    }
  }

  // Almacenar las edades en el Local Storage
  localStorage.setItem('edades', JSON.stringify(edades));

  return edades;
}

function calcularEdadPromedio(edades) {
  if (edades.length === 0) {
    return 0; // Si no hay edades en la lista, se devuelve 0 para evitar una división por cero.
  }

  var sumaEdades = 0;

  for (var i = 0; i < edades.length; i++) {
    sumaEdades += edades[i];
  }

  var promedio = sumaEdades / edades.length;

  return promedio;
}

function mostrarResultado() {
  var numPersonasInput = document.getElementById('numPersonas');
  var numPersonas = parseInt(numPersonasInput.value);

  if (isNaN(numPersonas) || numPersonas < 5) {
    alert("Por favor, ingrese un número válido de personas. El número mínimo de personas es 5.");
    return;
  }

  // Cambiar el texto del botón mientras se generan las edades
  var btnCalcular = document.getElementById('btn-calcular');
  btnCalcular.textContent = 'Generando...';
  btnCalcular.disabled = true; // Deshabilitar el botón durante el procesamiento

  var edadesAleatorias = generarEdades(numPersonas);
  var edadPromedio = calcularEdadPromedio(edadesAleatorias);

  // Restaurar el texto original del botón y habilitarlo nuevamente
  btnCalcular.textContent = 'Calcular Promedio';
  btnCalcular.disabled = false;

  // Mostrar los resultados en el DOM
  var resultadoElement = document.getElementById("resultado");
  resultadoElement.innerHTML = "<p>Edades generadas: " + edadesAleatorias.join(", ") + "</p><p>Edad promedio: " + edadPromedio.toFixed(2) + "</p>";
}

// Asignar el evento al botón "Calcular Promedio"
var btnCalcular = document.getElementById('btn-calcular');
btnCalcular.addEventListener('click', mostrarResultado);

// Capturar el evento de cambio en el campo de entrada "Ingrese el número de personas"
var numPersonasInput = document.getElementById('numPersonas');
numPersonasInput.addEventListener('change', function () {
  var resultadoElement = document.getElementById("resultado");
  resultadoElement.innerHTML = ""; // Borrar los resultados anteriores si hubiera
});

// Evento al cargar la página
window.onload = function () {
  var edadesGuardadas = localStorage.getItem('edades');
  var resultadoGuardado = localStorage.getItem('resultado');

  if (edadesGuardadas) {
    var edades = JSON.parse(edadesGuardadas);
    var edadPromedio = calcularEdadPromedio(edades);

    var resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = "<p>Edades generadas: " + edades.join(", ") + "</p><p>Edad promedio: " + edadPromedio.toFixed(2) + "</p>";
  }

  if (resultadoGuardado) {
    var resultadoElement = document.getElementById("resultado");
    resultadoElement.innerHTML = resultadoGuardado;
  }
};
