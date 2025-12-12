# Proyecto Final de Programación 1

## ISAAC --- Videojuego 2D con Integración al DOBOT MG400

### Integrantes:

- Carlos lopez 
- Jorge Gabriel Valencia Villarroel 

**Asignatura:** Programación 1\
**Carrera:** Ingeniería Industrial\
**Docente:** Eddy Escalante U.\
**Fecha de presentación:** 12/12/2025

# 2. Introducción

El proyecto **ISAAC** consiste en el desarrollo de un videojuego 2D
programado en **JavaScript**, implementado con **HTML5 Canvas** e
integrado con el brazo robótico **DOBOT MG400** utilizando **DobotStudio
Pro**.\
El objetivo principal es aplicar los conocimientos de programación,
diseño de videojuegos e interacción con hardware aprendido durante el
semestre.

Este proyecto permite comprender conceptos como manejo de eventos,
ciclos de renderizado, colisiones, lógica de niveles, así como la
comunicación entre software y hardware físico mediante el DOBOT,
mostrando la importancia de la automatización dentro de la programación.

# 3. Desarrollo del Proyecto

## 3.1 Diseño del Videojuego

### Concepto general

ISAAC es un videojuego donde el jugador controla a un personaje
principal (Isaac), representado en pantalla por un sprite de color claro
(cabeza grande), mientras debe eliminar a varios enemigos rojos que
aparecen en el escenario.\
El personaje **dispara automáticamente**, y el objetivo del jugador es
**moverse lateralmente** para alinear los disparos y eliminar a los
enemigos para avanzar entre los niveles.

Al completar todos los enemigos, el jugador pasa al siguiente nivel; si
pierde vida o es golpeado por los enemigos, aparece la pantalla
**"Perdiste"**.\
Si supera el nivel final, aparece **"Ganador"**.

### Personajes

-   **Isaac (Jugador)**
    -   Sprite grande (color gris claro).\
    -   Se mueve horizontalmente.\
    -   Disparo automático programado.\
    -   Salud baja; si recibe daño, pierde la partida.
-   **Enemigos rojos**
    -   Múltiples enemigos en cada nivel.\
    -   Se mueven más rápido dependiendo del nivel.\
    -   Son eliminados al recibir un disparo.

### Escenario

-   Fondo basado en un patrón repetitivo.\
-   Área rectangular donde se posicionan enemigos y jugador.

### Mecánicas principales

-   **Movimiento:** Isaac se mueve con flecha izquierda/derecha.\
-   **Disparo automático:** dispara cada cierto intervalo.\
-   **Victoria:** eliminar a todos los enemigos.\
-   **Derrota:** perder la vida del personaje.\
-   **Pantallas finales:** "Ganador" y "Perdiste".

## 3.1.1 Niveles del videojuego

### Nivel 1: Fácil

-   Pocos enemigos.\
-   Velocidad baja.

### Nivel 2: Intermedio

-   Más enemigos.\
-   Velocidad media.

### Nivel 3: Difícil

-   Muchos enemigos.\
-   Mayor velocidad y agresividad.

# 3.2 Herramientas Utilizadas

-   JavaScript\
-   HTML5 Canvas\
-   Visual Studio Code\
-   DobotStudio Pro\
-   GitHub

# 3.3 Integración con el DOBOT MG400

### Configuración

1.  Conectar el DOBOT.\
2.  Abrir DobotStudio Pro.\
3.  Configurar movimientos del efector para presionar teclas.\
4.  Calibrar posiciones exactas.\
5.  Crear macros para izquierda, derecha, ariba , avajo y espacio.

### Funciones controladas por el DOBOT

-   Movimiento lateral.\
-   Iniciar el juego (barra espaciadora).\
-   El disparo NO lo controla el robot (es automático).

### Impacto en la jugabilidad

-   El robot actúa como jugador físico.\
-   La precisión depende de la calibración.\
-   El tiempo de reacción del robot influye en evasión y ataque.

# 3.4 Organización del Trabajo

-   **Isaac:** programación del juego, niveles, disparo automático y
    sprites.\
-   **Compañero:** configuración del DOBOT MG400, integración y
    pruebas.\
-   **GitHub:** repositorio con código y estructura por carpetas.

# 4. Resultados

### Captura del videojuego

*(Insertar la imagen proporcionada por el estudiante)*

### Funcionamiento observado

-   Movimiento correcto.\
-   Disparo automático operativo.\
-   Enemigos generados correctamente.\
-   Cambios de nivel funcionales.\
-   DOBOT controla flechas y espacio exitosamente.

# 5. Conclusiones y Lecciones Aprendidas

### Retos enfrentados

-   Ajustar velocidad de disparos y movimiento.\
-   Programar colisiones correctamente.\
-   Calibrar el DOBOT sin errores.\
-   Balancear dificultades.

### Soluciones

-   Temporizadores optimizados.\
-   Mejoras en lógica de colisiones.\
-   Calibración precisa del DOBOT.\
-   Ajustes por nivel.

### Habilidades adquiridas

-   Programación de videojuegos.\
-   Uso de Canvas.\
-   Integración hardware--software.\
-   Trabajo colaborativo.

### Recomendaciones

-   Añadir power-ups.\
-   Mejorar animaciones.\
-   Añadir más enemigos o jefes.\
-   Hacer un menú más completo.

# 6. Anexos

### Movimiento del jugador

``` javascript
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
        player.x -= player.speed;
    }
    if (event.key === "ArrowRight") {
        player.x += player.speed;
    }
    if (event.key === " ") {
        startGame();
    }
});
```

### Disparo automático

``` javascript
setInterval(() => {
    shootProjectile(player.x + player.width/2, player.y);
}, player.fireRate);
```

### Colisiones

``` javascript
function collision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

# Fin del Informe
