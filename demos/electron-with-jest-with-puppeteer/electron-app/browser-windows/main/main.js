const { ipcRenderer } = require('electron');
const { events } = require('../../constants/constants.js');

const signUpButton = document.querySelector('#sign-up');
const welcomeBlock = document.querySelector('#welcome-block');
const greetingBlock = document.querySelector('#greeting-block');
const greetingHeader = greetingBlock.querySelector('h1');

signUpButton.addEventListener('click', () => ipcRenderer.send(events.SIGN_UP.showRegistrationForm));

ipcRenderer.on(events.SIGN_UP.success, (_, value) => {
  greetingHeader.innerText = value;
  welcomeBlock.style.display = 'none';
  greetingBlock.style.display = 'block';
});

