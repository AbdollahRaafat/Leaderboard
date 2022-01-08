import './style.css';

const bodycontent = `
<header>
<h1>Leaderboard</h1>
</header>

<main>
<section class="score-table">
  <div class = "table-head">
    <h2>Recent scores</h2>
    <button type = "button">Refresh</button>
  </div>

  <ul class="score-list">
    <li>name: 50</li>
    <li>name: 50</li>
    <li>name: 50</li>
    <li>name: 50</li>
    <li>name: 50</li>
  </ul>
</section>

<section class="add-score">
  <h2>Add your score</h2>
  <form action "#">
    <input type="text" placeholder= "name">
    <input type="number" placeholder= "Your score">
    <input type="submit" value="Submit">
  </form>
</main>

`;

document.body.innerHTML = bodycontent;
