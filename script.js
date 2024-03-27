/* FUNCIONALIDAD PARA EL AÑO DEL FOOTER */
// Obtenemos el año actual (para la función de mostrarTodosCumpleanos)
const hoy = new Date();
const año = hoy.getFullYear();
// Cargamos el año en el footer de las páginas html
const añoFooter = document.getElementsByClassName('ano-footer')[0];
añoFooter.innerHTML = año;

/* VARIABLES */
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startBtn');

const soundIzda = document.getElementById('soundIzda');
const soundDcha = document.getElementById('soundDcha');
const soundSentado = document.getElementById('soundSentado');
const soundFin = document.getElementById('soundFin');

const counterButton = document.getElementById('counterButtonId');
const instructionsButton = document.getElementById('instructionsButtonId');

const contenedorDeEstados = document.getElementById('contenedor-estados');
const fotoSecundaria = document.getElementById('foto-secundaria');
const textoFotoSecundaria = document.getElementById('texto-foto-secundaria');

let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;
let isRunning = false;

/* FUNCIONALIDAD BOTONES HEADER MENÚ */
counterButton.addEventListener('click', function () {
  window.location.href = './index.html';
});

instructionsButton.addEventListener('click', function () {
  window.location.href = './instructions.html';
});

/* */
function startOrResetTimer() {
  if (isRunning) {
    // Si el cronómetro está en funcionamiento, detenerlo y reiniciar todo
    clearInterval(interval);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerDisplay.textContent = '00:00:00';
    startButton.textContent = 'Iniciar';
    fotoSecundaria.src = './Medios/imagenes/sentado.jpg';
    textoFotoSecundaria.textContent = '';
  } else {
    // Si el cronómetro no está en funcionamiento, iniciar
    startButton.textContent = 'Reiniciar'; // Cambiar el texto del botón a "Reiniciar"
    startTimer();
  }
}

function startTimer() {
  contenedorDeEstados.classList.remove('doNotShow');
  contenedorDeEstados.classList.add('show');
  console.log('Se ha iniciado el ejercicio');
  isRunning = true;
  clearInterval(interval); // Detener el intervalo actual antes de iniciar uno nuevo
  interval = setInterval(updateTimer, 1000); // Establecer el intervalo para que se ejecute cada segundo

  // Solicitar el bloqueo de pantalla para evitar que se apague automáticamente
  requestWakeLock();
}

// Función para que funcione el conteo de números.
function updateTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
  }

  // Función que agrega un 0 delante de los números menors que 10 para mantener formato 00
  function pad(num) {
    return num < 10 ? `0${num}` : num;
  }

  // Aquí actualizamos los números del contador
  const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  timerDisplay.textContent = formattedTime;

  // Revisamos el momento temporal para cargar las instrucciones apropiadas.
  if ((minutes === 0 || minutes % 2 === 0) && seconds < 30) {
    fotoSecundaria.src = './Medios/imagenes/tumbado-dcha.jpg';

    textoFotoSecundaria.textContent = 'Túmbate hacia tu izquierda.';
  } else if (minutes % 2 !== 0 && seconds === 0) {
    fotoSecundaria.src = './Medios/imagenes/tumbado-izda.jpg';
    textoFotoSecundaria.textContent = 'Túmbate hacia tu derecha.';
  } else if (seconds > 30) {
    fotoSecundaria.src = './Medios/imagenes/sentado.jpg';
    textoFotoSecundaria.textContent = 'Siéntate.';
  }

  const losMinutosSonPares = minutes % 2 === 0;

  if (
    (minutes === 0 && seconds === 1) ||
    (minutes === 2 && seconds === 0) ||
    (minutes === 4 && seconds === 0) ||
    (minutes === 6 && seconds === 0) ||
    (minutes === 8 && seconds === 0)
  ) {
    console.log('Túmbate hacia la izquierda');
    playSound(soundIzda);
  } else if (
    (minutes === 1 && seconds === 0) ||
    (minutes === 3 && seconds === 0) ||
    (minutes === 5 && seconds === 0) ||
    (minutes === 7 && seconds === 0) ||
    (minutes === 9 && seconds === 0)
  ) {
    console.log('Túmbate hacia la derecha');
    playSound(soundDcha);
  } else if (seconds === 30) {
    console.log('Siéntate erguido');
    playSound(soundSentado);
  } else if (minutes === 10) {
    playSound(soundFin);
    clearInterval(interval);
    alert(
      'El cronómetro ha llegado a los 10 minutos. Has finalizado el ejercicio.'
    );
  }

  // Revisamos si ha finalizado el ejercicio.
  /*   if (minutes === 10) {
    playSound(soundFin);
    clearInterval(interval);
    alert(
      'El cronómetro ha llegado a los 10 minutos. Has finalizado el ejercicio.'
    );
  } */
}

// Solicitar el bloqueo de pantalla para evitar que se apague automáticamente
function requestWakeLock() {
  if ('wakeLock' in navigator) {
    navigator.wakeLock
      .request('screen')
      .then(() => {
        console.log('Bloqueo de pantalla activado.');
      })
      .catch((err) => {
        console.error('No se pudo solicitar el bloqueo de pantalla:', err);
      });
  } else {
    console.warn(
      'La API Screen Wake Lock no es compatible con este navegador.'
    );
  }
}

// Función para reproducir un sonido. Se rebobina el sonido y se reproduce.
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

startButton.addEventListener('click', startOrResetTimer);
