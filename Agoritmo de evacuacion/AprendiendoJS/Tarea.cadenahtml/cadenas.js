/* cadenas.js
   Implementaciones solicitadas para Programación 1.
   Expone tres funciones globales:
     - ContarVocales(palabra)
     - ContarPalabras(texto)
     - ContarCaracteres(texto)

   Notas:
   - Soporta español: tildes (á, é, í, ó, ú), ñ y diéresis (ü).
   - Por simplicidad, la "y" NO se considera vocal.
   - ContarCaracteres cuenta todos los caracteres del texto recibido (incluye espacios internos y signos).
*/

/**
 * Normaliza una cadena a NFD para tratar vocales acentuadas como su base (á -> a).
 * No altera el string original que recibe el usuario de cara al conteo de caracteres.
 */
function _normalizarParaVocales(s) {
  if (typeof s !== 'string') return '';
  return s.normalize('NFD'); // separa letras y diacríticos (á -> a + ́)
}

/**
 * ContarVocales(palabra)
 * @param {string} palabra - palabra o texto corto
 * @returns {number} cantidad de vocales (a, e, i, o, u) incluyendo acentuadas y diéresis.
 */
function ContarVocales(palabra) {
  if (palabra == null) return 0;

  // Normalizamos a NFD y pasamos a minúsculas para comparar fácilmente.
  const s = _normalizarParaVocales(String(palabra)).toLowerCase();

  // Con NFD, á/ä/à/â y ü quedan como 'a'/'u' + marcas; comprobamos solo la base.
  // Filtramos por letras base aeiou (no contamos 'y').
  let conteo = 0;
  for (const ch of s) {
    // ignoramos marcas diacríticas (Unicode Mn)
    // Si el navegador soporta property escapes:
    // if (/\p{Mn}/u.test(ch)) continue;
    // Alternativa sin property escapes: descartar signos combinantes por rango aproximado
    const code = ch.codePointAt(0);
    const esMarca = (code >= 0x0300 && code <= 0x036F);
    if (esMarca) continue;

    if (ch === 'a' || ch === 'e' || ch === 'i' || ch === 'o' || ch === 'u') {
      conteo++;
    }
  }
  return conteo;
}

/**
 * ContarPalabras(texto)
 * Cuenta palabras usando Unicode (letras con tildes/ñ) y también considera números como "palabras".
 * Ejemplos que cuenta como 3: "hola mundo 2025"
 * Soporta contracciones con apóstrofos y guiones internos: "rompe-hielos", "l'idea".
 * @param {string} texto
 * @returns {number}
 */
function ContarPalabras(texto) {
  if (texto == null) return 0;
  const str = String(texto).trim();
  if (str === '') return 0;

  // Explicación del patrón:
  // - \p{L}+ : una o más letras Unicode (incluye á, ñ, ü)
  // - (?:['’\-]\p{L}+)* : permite segmentos adicionales unidos por apóstrofo o guion
  // - | \p{N}+ : o bien una secuencia de números
  // Bandera "u" para Unicode, "g" para hallar todas las coincidencias.
  const regex = /\p{L}+(?:['’\-]\p{L}+)*|\p{N}+/gu;

  const matches = str.match(regex);
  return matches ? matches.length : 0;
}

/**
 * ContarCaracteres(texto)
 * Cuenta la cantidad total de caracteres del texto TRIMMEADO (sin espacios al inicio/fin),
 * incluyendo espacios internos, saltos de línea y signos de puntuación.
 * @param {string} texto
 * @returns {number}
 */
function ContarCaracteres(texto) {
  if (texto == null) return 0;
  const s = String(texto).trim();
  return s.length;
}

/* Exponer en el objeto global (por si se usa en distintos contextos/bundlers). */
(function exposeGlobals(){
  if (typeof window !== 'undefined') {
    window.ContarVocales = ContarVocales;
    window.ContarPalabras = ContarPalabras;
    window.ContarCaracteres = ContarCaracteres;
  } else if (typeof globalThis !== 'undefined') {
    globalThis.ContarVocales = ContarVocales;
    globalThis.ContarPalabras = ContarPalabras;
    globalThis.ContarCaracteres = ContarCaracteres;
  }
})();
