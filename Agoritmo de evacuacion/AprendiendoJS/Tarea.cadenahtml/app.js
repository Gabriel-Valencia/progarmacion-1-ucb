/* app.js — Controlador de UI que invoca funciones existentes en cadenas.js */

(function(){
  const $ = (sel) => document.querySelector(sel);
  const input = $('#inputTexto');
  const salida = $('#salida');

  // Año dinámico en el footer
  const y = new Date().getFullYear();
  const anio = document.getElementById('anio');
  if (anio) anio.textContent = y;

  // Utilidad: obtiene texto y verifica
  function getTexto() {
    const txt = (input.value || '').trim();
    if (!txt) {
      alert('Por favor, ingresa una palabra o texto.');
      input.focus();
      return null;
    }
    return txt;
  }

  // Manejadores
  $('#btnVocales')?.addEventListener('click', () => {
    const txt = getTexto();
    if (txt == null) return;

    try {
      // Se asume que ContarVocales(palabra) existe en cadenas.js
      const conteo = ContarVocales(txt);
      salida.textContent = `Vocales encontradas: ${conteo}`;
    } catch (err) {
      console.error(err);
      salida.textContent = 'Error: verifica que ContarVocales(palabra) está definida en cadenas.js.';
    }
  });

  $('#btnPalabras')?.addEventListener('click', () => {
    const txt = getTexto();
    if (txt == null) return;

    try {
      // Se asume que ContarPalabras(texto) existe en cadenas.js
      const conteo = ContarPalabras(txt);
      salida.textContent = `Palabras encontradas: ${conteo}`;
    } catch (err) {
      console.error(err);
      salida.textContent = 'Error: verifica que ContarPalabras(texto) está definida en cadenas.js.';
    }
  });

  $('#btnCaracteres')?.addEventListener('click', () => {
    const txt = getTexto();
    if (txt == null) return;

    try {
      // Se asume que ContarCaracteres(texto) existe en cadenas.js
      const conteo = ContarCaracteres(txt);
      salida.textContent = `Caracteres totales: ${conteo}`;
    } catch (err) {
      console.error(err);
      salida.textContent = 'Error: verifica que ContarCaracteres(texto) está definida en cadenas.js.';
    }
  });

  $('#btnLimpiar')?.addEventListener('click', () => {
    input.value = '';
    salida.textContent = '—';
    input.focus();
  });
})();
