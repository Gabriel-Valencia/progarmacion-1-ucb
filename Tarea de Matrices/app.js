// CONTROL DE INTERACCIÓN

const contenedor = document.getElementById("matriz-container");
const selector = document.getElementById("ejercicio");
const boton = document.getElementById("mostrar");

function dibujarMatriz(matriz) {
  contenedor.innerHTML = "";
  matriz.forEach(fila => {
    const filaDiv = document.createElement("div");
    filaDiv.classList.add("row");
    fila.forEach(valor => {
      const celda = document.createElement("div");
      celda.classList.add("cell", `cell-${valor}`);
      celda.textContent = valor;
      filaDiv.appendChild(celda);
    });
    contenedor.appendChild(filaDiv);
  });
}

boton.addEventListener("click", () => {
  const n = parseInt(selector.value);
  const funciones = {
    1: matrizEj1, 2: matrizEj2, 3: matrizEj3, 4: matrizEj4,
    5: matrizEj5, 6: matrizEj6, 7: matrizEj7, 8: matrizEj8,
    9: matrizEj9, 10: matrizEj10, 11: matrizEj11
  };
  dibujarMatriz(funciones[n]());
});
