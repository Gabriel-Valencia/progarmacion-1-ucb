// Lista global
let lista = [];

// Seleccionamos los elementos
const entrada = document.getElementById("entrada");
const btnMostrar = document.getElementById("btnMostrar");
const btnInsertar = document.getElementById("btnInsertar");
const btnEliminar = document.getElementById("btnEliminar");
const btnLimpiar = document.getElementById("btnLimpiar");
const resultado = document.getElementById("resultado");

// Insertar en la lista
btnInsertar.addEventListener("click", () => {
  const valor = entrada.value.trim();
  if (valor === "") {
    resultado.innerHTML = "⚠️ Ingresa un valor válido.";
  } else {
    lista.push(valor);
    entrada.value = "";
    MostrarLista();
  }
});

// Eliminar de la lista
btnEliminar.addEventListener("click", () => {
  const valor = entrada.value.trim();
  if (valor === "") {
    resultado.innerHTML = "⚠️ Escribe el valor que deseas eliminar.";
  } else {
    lista = lista.filter(item => item !== valor); // elimina todos los repetidos
    entrada.value = "";
    MostrarLista();
  }
});

// Mostrar la lista
btnMostrar.addEventListener("click", () => {
  MostrarLista();
});

// Limpiar lista
btnLimpiar.addEventListener("click", () => {
  lista = [];
  MostrarLista();
});

// Función que actualiza la vista de la lista
function MostrarLista() {
  if (lista.length === 0) {
    resultado.innerHTML = " Lista : (vacía)";
  } else {
    resultado.innerHTML = " Lista : " + lista.join(", ");
  }
}
