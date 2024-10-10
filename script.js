// script.js

const alertas = [
  { tipo: 'Inundación', ubicacion: 'Ciudad A', riesgo: 'Alto', lat: 13.7, lon: -89.2 },
  { tipo: 'Terremoto', ubicacion: 'Ciudad B', riesgo: 'Moderado', lat: 13.8, lon: -89.1 }
];

// Función para mostrar alertas en la lista
function mostrarAlertas() {
  const alertasList = document.getElementById('alertas-list');
  alertas.forEach(alerta => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item';
    listItem.innerHTML = `<strong>${alerta.tipo}</strong> en ${alerta.ubicacion} - Riesgo: ${alerta.riesgo}`;
    alertasList.appendChild(listItem);
  });
}

// Función para inicializar el mapa
function inicializarMapa() {
  const map = L.map('mapa-canvas').setView([13.794185, -88.89653], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // Añadir marcadores para cada alerta
  alertas.forEach(alerta => {
    L.marker([alerta.lat, alerta.lon])
      .addTo(map)
      .bindPopup(`<strong>${alerta.tipo}</strong><br>${alerta.ubicacion}<br>Riesgo: ${alerta.riesgo}`);
  });
}

// Función para manejar la suscripción
function manejarSuscripcion() {
  const formulario = document.getElementById('formulario-notificaciones');
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    alert(`Te has suscrito a las notificaciones con el correo: ${email}`);
    formulario.reset();
  });
}

// Función principal
function iniciar() {
  mostrarAlertas();
  inicializarMapa();
  manejarSuscripcion();
}

document.addEventListener('DOMContentLoaded', iniciar);
