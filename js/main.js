
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open('GET', 'https://free-to-play-games-database.p.rapidapi.com/api/games');
xhr.setRequestHeader('X-RapidAPI-Key', 'e8d1786883msh3097c4a82d2b6bep18d886jsneb07d6ef89a9');
xhr.setRequestHeader('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');
xhr.responseType = 'json';

var $startBtn = document.querySelector('.start');
var homePageContainer = document.querySelector('.container');
var gamePageContainer = document.querySelector('.game-container');

const filteredGenre = [];

xhr.addEventListener('load', function () {
  $startBtn.addEventListener('click', function () {
    switchViews('game');
    filteredGenre.length = 0;
    const selectGenre = document.querySelector('#genres');
    const index = selectGenre.selectedIndex;
    const selectedOptionText = selectGenre.options[index].textContent;
    for (let i = 0; i < xhr.response.length; i++) {
      if (xhr.response[i].genre === selectedOptionText) {
        filteredGenre.push(xhr.response[i]);
      }
    }
    const randomGameObj = getRandomGame(filteredGenre);
    renderGame(randomGameObj);
  });
});

xhr.send();

function switchViews(view) {
  if (view === 'home') {
    homePageContainer.className = 'container view';
    gamePageContainer.className = 'game-container hidden';
  } else if (view === 'game') {
    homePageContainer.className = 'container hidden';
    gamePageContainer.className = 'game-container view';
  }
}

var $homeBtn = document.querySelector('.home-nav');
$homeBtn.addEventListener('click', function () {
  const selectGenreOptions = document.querySelector('#genres');
  selectGenreOptions.selectedIndex = 0;
  switchViews('home');
});

function getRandomGame(filteredGenre) {
  const randomIndex = Math.floor(Math.random() * filteredGenre.length);
  const randomGame = filteredGenre[randomIndex];
  return randomGame;
}

function renderGame(randomGameObj) {
  $gameContainer.append(gameImageDiv);

  gameImage.setAttribute('src', randomGameObj.thumbnail);
  gameImage.setAttribute('alt', randomGameObj.title);
  gameImageDiv.append(gameImage);

  $gameContainer.append(titleRow);

  gameName.textContent = randomGameObj.title;
  titleRow.append(gameName);

  titleRow.append(favoriteIcon);

  $gameContainer.append(gameRow2);

  gameDetails.textContent = randomGameObj.short_description;
  gameRow2.append(gameDetails);

  $gameContainer.append(nextBtnDiv);

  nextBtnDiv.append(nextBtn);
}

var $gameContainer = document.querySelector('.game-container');
var gameImageDiv = document.createElement('div');
gameImageDiv.className = 'game-img row column-full';
var gameImage = document.createElement('img');
var titleRow = document.createElement('div');
titleRow.className = 'game-row column-full';
var gameName = document.createElement('h3');
gameName.className = 'game-title';
var favoriteIcon = document.createElement('i');
favoriteIcon.className = 'fa-regular fa-star fa-xl fav-star';
var gameRow2 = document.createElement('div');
gameRow2.className = 'game-row column-full';
var gameDetails = document.createElement('p');
gameDetails.className = 'game-description';
var nextBtnDiv = document.createElement('div');
nextBtnDiv.className = 'next-btn row column-full';
var nextBtn = document.createElement('button');
nextBtn.className = 'next';
nextBtn.textContent = 'Next';
