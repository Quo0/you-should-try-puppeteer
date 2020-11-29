const { ipcRenderer } = require('electron');
const { events } = require('../../constants/constants.js');

const input = document.querySelector('input');
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();
  ipcRenderer.send(events.SIGN_UP.success, input.value);
  setTimeout(() => window.close(), 50);
})