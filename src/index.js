import { fetchScore, createScores, createGame } from './api.js';
import './style.css';

const Url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';

const bodycontent = `
<header>
<h1>Leaderboard</h1>
</header>

<main>
<section class="score-table">
  <div class = "table-head">
    <h2>Recent scores</h2>
    <button id="refresher" type = "button">Refresh</button>
  </div>

  <ul class="score-list">

  </ul>
</section>

<section class="add-score">
  <h2>Add your score</h2>
  <form action "#">
    <input id="name" type="text" placeholder= "name">
    <input id="score" type="number" placeholder= "Your score">
    <input id="submit" type="submit" value="Submit">
  </form>
</main>

`;

document.body.innerHTML = bodycontent;

const gameIdStorage = () => {
  const localStorageID = localStorage.getItem('ID') ? JSON.parse(localStorage.getItem('ID')) : null;
  return localStorageID;
};

const saveGameOnLocalStorage = () => {
  const data = {
    name: 'My new game',
  };
  if (!gameIdStorage()) {
    window.addEventListener('load', async () => {
      const { result } = await createGame(`${Url}games`, data);
      const gameID = result.substr(14, 20);
      localStorage.setItem('ID', JSON.stringify(gameID));
    });
  }
};

const newScore = () => {
  const data = {
    user: '',
    score: '',
  };

  const player = document.getElementById('name');
  const playerScore = document.getElementById('score');
  const submitData = document.getElementById('submit');

  player.addEventListener('change', (e) => {
    data.user = e.target.value;
  });

  playerScore.addEventListener('change', (e) => {
    data.score = e.target.value;
  });

  submitData.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = `${Url}games/${gameIdStorage()}/scores`;
    await createScores(url, data);
    player.value = '';
    playerScore.value = '';
    window.location.reload();
  });
};

const getScores = async () => {
  const ulTag = document.querySelector('.score-list');
  const liTag = document.createElement('li');
  const smallTag1 = document.createElement('small');
  const smallTag2 = document.createElement('small');
  const url = `${Url}games/${gameIdStorage()}/scores/`;
  const { result } = await fetchScore(url);
  result.forEach((item) => {
    smallTag1.textContent = `${item.user}:`;
    smallTag2.textContent = item.score;

    liTag.appendChild(smallTag1);

    liTag.appendChild(smallTag2);

    ulTag.appendChild(liTag.cloneNode(true));
  });
};

const refresher = document.querySelector('#refresher');

refresher.addEventListener('click', () => {
  window.location.reload();
});

getScores();

saveGameOnLocalStorage();

newScore();
