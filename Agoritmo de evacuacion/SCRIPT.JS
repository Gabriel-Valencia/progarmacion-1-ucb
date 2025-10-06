// Clase Pasajero
class Pasajero {
  constructor(nombre, edad, genero, clase) {
    this.nombre = nombre;
    this.edad = edad;
    this.genero = genero; // 'Masculino' o 'Femenino'
    this.clase = clase;   // 1, 2 o 3
  }

  mostrarInfo() {
    return `${this.nombre} (${this.genero}, ${this.edad} años, Clase ${this.clase})`;
  }
}

// Clase BoteRescate
class BoteRescate {
  constructor(capacidad) {
    this.capacidad = capacidad;
    this.ocupantes = [];
  }

  agregarPasajero(pasajero) {
    if (this.ocupantes.length < this.capacidad) {
      this.ocupantes.push(pasajero);
      return true;
    }
    return false;
  }

  mostrarOcupantes() {
    return this.ocupantes.map(p => p.mostrarInfo()).join("<br>");
  }
}

// Algoritmo de evacuación
function evacuar(pasajeros, botes) {
  // Orden: mujeres primero, luego por edad, luego por clase
  pasajeros.sort((a, b) => {
    if (a.genero !== b.genero) return a.genero === "Femenino" ? -1 : 1;
    if (a.edad !== b.edad) return a.edad - b.edad;
    return a.clase - b.clase;
  });

  let noSubieron = [];

  for (let p of pasajeros) {
    let colocado = false;
    for (let bote of botes) {
      if (bote.agregarPasajero(p)) {
        colocado = true;
        break;
      }
    }
    if (!colocado) noSubieron.push(p);
  }

  return noSubieron;
}

// Simulación
function simular() {
  let pasajeros = [
    new Pasajero("Ana", 25, "Femenino", 1),
    new Pasajero("Juan", 40, "Masculino", 2),
    new Pasajero("María", 5, "Femenino", 3),
    new Pasajero("Pedro", 30, "Masculino", 1),
    new Pasajero("Lucía", 60, "Femenino", 2),
    new Pasajero("Carlos", 15, "Masculino", 3),
    new Pasajero("Sofía", 35, "Femenino", 1),
    new Pasajero("Miguel", 8, "Masculino", 2),
    new Pasajero("Isabel", 50, "Femenino", 3),
    new Pasajero("Andrés", 28, "Masculino", 1),
  ];

  let botes = [
    new BoteRescate(4),
    new BoteRescate(3),
    new BoteRescate(2),
  ];

  let sobrantes = evacuar(pasajeros, botes);

  let salida = "";
  botes.forEach((bote, i) => {
    salida += `<div class="bote"><h3>🛶 Bote ${i+1} (Capacidad: ${bote.capacidad})</h3>`;
    salida += bote.ocupantes.length > 0 ? bote.mostrarOcupantes() : "Vacío";
    salida += "</div>";
  });

  salida += `<div class="sobrantes"><h3>❌ Pasajeros que no subieron</h3>`;
  salida += sobrantes.length > 0 ? sobrantes.map(p => p.mostrarInfo()).join("<br>") : "Todos fueron evacuados";
  salida += "</div>";

  document.getElementById("resultado").innerHTML = salida;
}
