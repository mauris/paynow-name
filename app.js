import { maskPayNowName } from './src/index.js';

const singaporeanNames = [
  'Aisyah Binte Rahman',
  'Ananya Nair',
  'Cheryl Lim Hui Min',
  'Dinesh s/o Rajan',
  'Farhan Bin Ismail',
  'Goh Wei Ming',
  'Kavitha d/o Kumar',
  'Muhammad Irfan Bin Ahmad',
  'Nurul Syafiqah Binte Hassan',
  'Tan Jia Yi',
  'Abdul Hakim Bin Salleh',
  'Adeline Teo Xin Yi',
  'Ahmad Firdaus Bin Osman',
  'Benjamin Lee Jun Wei',
  'Devi d/o Muthu',
  'Ethan Ong Kai Wen',
  'Fatin Nur Binte Zulkifli',
  'Harini d/o Suresh',
  'Isaac Chua Zhi Hao',
  'Jasmine Koh Pei Ling',
  'Jonathan Yeo Wei Jie',
  'Lim Shi Hui',
  'Marcus Ng Jun Kai',
  'Meera Nair',
  'Nabil Bin Hamzah',
  'Priya d/o Anand',
  'Rachel Wong Hui Ting',
  'Siti Hajar Binte Ali',
  'Vignesh s/o Maniam',
  'Zhang Wen Qi'
];

const input = document.querySelector('#full-name');
const output = document.querySelector('#masked-name');
const randomNameButton = document.querySelector('#random-name');

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

function generateRandomName() {
  const availableNames = singaporeanNames.filter((name) => name !== input.value);
  const randomIndex = Math.floor(Math.random() * availableNames.length);
  input.value = availableNames[randomIndex];
  renderMaskedName();
  input.focus();
}

input.addEventListener('input', renderMaskedName);
randomNameButton.addEventListener('click', generateRandomName);
renderMaskedName();
