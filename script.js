/* VARIABLES */
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startBtn');
const sound30 = document.getElementById('sound30');
const soundMinute = document.getElementById('soundMinute');

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
  } else if (minutes % 2 !== 0 && seconds < 30) {
    fotoSecundaria.src = './Medios/imagenes/tumbado-izda.jpg';
    textoFotoSecundaria.textContent = 'Túmbate hacia tu derecha.';
  } else {
    fotoSecundaria.src = './Medios/imagenes/sentado.jpg';
    textoFotoSecundaria.textContent = 'Siéntate.';
  }

  // Creamos un pitido para indicar que hay que sentarse
  if (seconds === 30) {
    console.log('Siéntate.');
    /* playSound(sound30); */
  }

  // Creamos un pitido para indicar que toca tumbarse
  if (seconds === 0 && minutes > 0) {
    console.log('Túmbate hacia un lado.');
    /* playSound(soundMinute); */
  }

  // Revisamos si ha finalizado el ejercicio.
  if (minutes === 10) {
    clearInterval(interval);
    alert(
      'El cronómetro ha llegado a los 10 minutos. Has finalizado el ejercicio.'
    );
  }
}

// Función para reproducir un sonido. Se rebobina el sonido y se reproduce.
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

startButton.addEventListener('click', startOrResetTimer);
