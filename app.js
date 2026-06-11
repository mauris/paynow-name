import { maskPayNowName } from './src/index.js';

const input = document.querySelector('#full-name');
const output = document.querySelector('#masked-name');

function renderMaskedName() {
  const maskedName = maskPayNowName(input.value);

  if (maskedName) {
    output.textContent = maskedName;
    output.classList.add('has-value');
    return;
  }

  output.innerHTML = '<span class="placeholder">Your masked name will appear here</span>';
  output.classList.remove('has-value');
}

input.addEventListener('input', renderMaskedName);
renderMaskedName();
