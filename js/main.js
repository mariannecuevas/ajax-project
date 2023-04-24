const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open('GET', 'https://free-to-play-games-database.p.rapidapi.com/api/games');
xhr.setRequestHeader('X-RapidAPI-Key', 'e8d1786883msh3097c4a82d2b6bep18d886jsneb07d6ef89a9');
xhr.setRequestHeader('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');
xhr.responseType = 'json';

var $startBtn = document.querySelector('.start');
var homePageContainer = document.querySelector('.container');
var gamePageContainer = document.querySelector('.game-container');
var favesPageContainer = document.querySelector('.faves-container');

const filteredGenre = [];

xhr.addEventListener('load', function () {
  $startBtn.addEventListener('click', function () {
    switchViews('game');
    favoriteIcon.className = 'fa-regular fa-star fa-xl fav-star';
    gamePageContainer.textContent = '';
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
    gamePageContainer.className = 'game-container hidden';
    favesPageContainer.className = 'faves-container hidden';
    homePageContainer.className = 'container view';
  } else if (view === 'game') {
    homePageContainer.className = 'container hidden';
    favesPageContainer.className = 'faves-container hidden';
    gamePageContainer.className = 'game-container view';
  } else if (view === 'faves') {
    gamePageContainer.className = 'game-container hidden';
    homePageContainer.className = 'container hidden';
    favesPageContainer.className = 'faves-container view';
  }
}

var $logo = document.querySelector('.logo');
$logo.addEventListener('click', function () {
  const selectGenreOptions = document.querySelector('#genres');
  selectGenreOptions.selectedIndex = 0;
  switchViews('home');
});

var $homeBtn = document.querySelector('.home-nav');
$homeBtn.addEventListener('click', function () {
  const selectGenreOptions = document.querySelector('#genres');
  selectGenreOptions.selectedIndex = 0;
  switchViews('home');
});

var $favesBtn = document.querySelector('.faves-nav');
var noFaves = document.querySelector('.no-faves');
$favesBtn.addEventListener('click', function () {
  switchViews('faves');
  if (data.favoriteGames.length === 0) {
    noFaves.className = 'no-faves view';
  } else {
    noFaves.className = 'no-faves hidden';
    renderFavedGames();
  }

});

function getRandomGame(filteredGenre) {
  const randomIndex = Math.floor(Math.random() * filteredGenre.length);
  const randomGame = filteredGenre[randomIndex];
  return randomGame;
}

function renderGame(randomGameObj) {
  gamePageContainer.textContent = '';
  gamePageContainer.append(gameImageDiv);

  gameImage.setAttribute('src', randomGameObj.thumbnail);
  gameImage.setAttribute('alt', randomGameObj.title);
  gameImage.className = 'game-thumb';
  gameImageDiv.append(gameImage);

  gamePageContainer.append(titleRow);

  gameName.textContent = randomGameObj.title;
  titleRow.append(gameName);

  titleRow.append(favoriteIcon);

  gamePageContainer.append(gameRow2);

  gameDetails.textContent = randomGameObj.short_description;
  gameRow2.append(gameDetails);

  gamePageContainer.append(nextBtnDiv);

  nextBtnDiv.append(nextBtn);
}

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

nextBtn.addEventListener('click', function () {
  const randomGameObj = getRandomGame(filteredGenre);
  renderGame(randomGameObj);
  favoriteIcon.className = 'fa-regular fa-star fa-xl fav-star';
});

favoriteIcon.addEventListener('click', function () {
  favoriteIcon.className = 'fa-solid fa-star fa-xl fav-star';

  const gameTitle = document.querySelector('.game-title').textContent;
  const gameThumbnail = document.querySelector('.game-thumb').src;
  const gameGenre = filteredGenre[0].genre;
  var favedGame = {};
  favedGame.title = gameTitle;
  favedGame.thumbnail = gameThumbnail;
  favedGame.genre = gameGenre;

  data.favoriteGames.push(favedGame);
  data.nextFavId++;

  favedGame.id = data.nextFavId;
});

var $favesList = document.querySelector('.faves-list');
function renderFavedGames() {
  $favesList.innerHTML = '';
  for (let i = 0; i < data.favoriteGames.length; i++) {
    const faveGame = data.favoriteGames[i];

    const favesListChild = document.createElement('li');
    favesListChild.className = 'faves row column-full';
    $favesList.append(favesListChild);

    const favImgRow = document.createElement('div');
    favImgRow.className = 'row';
    favesListChild.append(favImgRow);

    const favImgColumn = document.createElement('div');
    favImgColumn.className = 'column-full';
    favImgRow.append(favImgColumn);

    const favGameImg = document.createElement('img');
    favGameImg.className = 'fave-img';
    favGameImg.setAttribute('src', faveGame.thumbnail);
    favGameImg.setAttribute('alt', faveGame.title);
    favImgColumn.append(favGameImg);

    const favTitleRow = document.createElement('div');
    favTitleRow.className = 'fav-title row column-full';
    favesListChild.append(favTitleRow);

    const favTitleColumn = document.createElement('div');
    favTitleColumn.className = 'column-full';
    favTitleRow.append(favTitleColumn);

    const favGameName = document.createElement('h3');
    favGameName.className = 'fav-game-title';
    favGameName.textContent = faveGame.title;
    favTitleRow.append(favGameName);

    const favoritedIcon = document.createElement('i');
    favoritedIcon.className = 'fa-solid fa-star fa-xl faved-star';

    favTitleRow.append(favoritedIcon);

    favesListChild.setAttribute('fave-game-id', faveGame.id);
  }
}
