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
    const selectGenre = document.querySelector('#genres');
    const index = selectGenre.selectedIndex;
    const selectedOptionValue = selectGenre.options[index].value;

    if (selectedOptionValue === 'genre') {
      return;
    }

    switchViews('game');
    favoriteIcon.className = 'fa-regular fa-star fa-xl fav-star';
    gamePageContainer.textContent = '';
    filteredGenre.length = 0;

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
    gamePageContainer.classList.add('hidden');
    favesPageContainer.classList.add('hidden');
    homePageContainer.classList.remove('hidden');
    homePageContainer.classList.add('view');
  } else if (view === 'game') {
    homePageContainer.classList.add('hidden');
    favesPageContainer.classList.add('hidden');
    gamePageContainer.classList.remove('hidden');
    gamePageContainer.classList.add('view');
  } else if (view === 'faves') {
    gamePageContainer.classList.add('hidden');
    homePageContainer.classList.add('hidden');
    favesPageContainer.classList.remove('hidden');
    favesPageContainer.classList.add('view');
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
    noFaves.classList.add('view');
  } else {
    noFaves.classList.add('hidden');
    noFaves.classList.remove('view');
    renderFavedGames();
  }
});

function getRandomGame(filteredGenre) {
  const randomIndex = Math.floor(Math.random() * filteredGenre.length);
  const randomGame = filteredGenre[randomIndex];
  return randomGame;
}

function renderGame(randomGameObj) {
  gamePageContainer.classList.add('hidden');
  gamePageContainer.textContent = '';
  gamePageContainer.append(gameImageDiv, gameDetailsContainer);

  gameImage.setAttribute('src', randomGameObj.thumbnail);
  gameImage.setAttribute('alt', randomGameObj.title);
  gameImage.className = 'game-thumb';
  gameImage.onload = function () {
    gamePageContainer.classList.remove('hidden');
  };
  gameImageDiv.append(gameImage);

  gameDetailsContainer.append(titleRow);

  gameName.textContent = randomGameObj.title;
  titleRow.append(gameName);

  titleRow.append(favoriteIcon);

  gameDetailsContainer.append(gameRow2);

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
var gameDetailsContainer = document.createElement('div');
gameDetailsContainer.className = 'game-details';

nextBtn.addEventListener('click', function () {
  const randomGameObj = getRandomGame(filteredGenre);
  renderGame(randomGameObj);
  favoriteIcon.className = 'fa-regular fa-star fa-xl fav-star';
});

favoriteIcon.addEventListener('click', function () {
  favoriteIcon.className = 'fa-solid fa-star fa-xl fav-star';

  const gameTitle = document.querySelector('.game-title').textContent;
  const gameThumbnail = document.querySelector('.game-thumb').src;
  const gameDescription = document.querySelector('.game-description').textContent;
  const gameGenre = filteredGenre[0].genre;
  var favedGame = {};
  favedGame.title = gameTitle;
  favedGame.thumbnail = gameThumbnail;
  favedGame.genre = gameGenre;
  favedGame.description = gameDescription;

  let isDuplicate = false;
  for (let i = 0; i < data.favoriteGames.length; i++) {
    const game = data.favoriteGames[i];
    if (game.title === favedGame.title && game.thumbnail === favedGame.thumbnail) {
      isDuplicate = true;
      break;
    }
  }

  if (!isDuplicate) {
    data.favoriteGames.push(favedGame);
    data.nextFavId++;
    favedGame.id = data.nextFavId;
  }
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

    const genreRow = document.createElement('div');
    genreRow.className = 'genre row column-full';
    favesListChild.append(genreRow);

    const genreColumn = document.createElement('div');
    genreColumn.className = 'fav-row column-full';
    genreRow.append(genreColumn);

    const favGameGenre = document.createElement('p');
    favGameGenre.className = 'fav-game-genre';
    favGameGenre.textContent = 'Genre: ' + faveGame.genre;
    genreColumn.append(favGameGenre);

    const descriptionRow = document.createElement('div');
    descriptionRow.className = 'description row column-full';
    favesListChild.append(descriptionRow);

    const descriptionColumn = document.createElement('div');
    descriptionColumn.className = 'fav-row column-full';
    descriptionRow.append(descriptionColumn);

    const favGameDescription = document.createElement('p');
    favGameDescription.className = 'fav-game-description';
    favGameDescription.textContent = 'Description: ' + faveGame.description;
    descriptionColumn.append(favGameDescription);

    favesListChild.setAttribute('fave-game-id', faveGame.id);

    favoritedIcon.addEventListener('click', function (event) {
      const gameElement = event.target.closest('li');
      data.gameEditing = gameElement;
      openModal();
    });
  }
}

var modal = document.querySelector('.modal');
var cancelBtn = document.querySelector('.cancel');
var confirmBtn = document.querySelector('.confirm-btn');

function openModal() {
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

cancelBtn.addEventListener('click', function () {
  closeModal();
});

confirmBtn.addEventListener('click', function () {
  const selectedGame = data.gameEditing;
  const selectedGameId = selectedGame.getAttribute('fave-game-id');

  var liNode = document.querySelectorAll('.faves');

  for (var i = 0; i < liNode.length; i++) {
    if (liNode[i].getAttribute('fave-game-id') === selectedGameId) {
      liNode[i].remove();
    }
  }

  for (var j = 0; j < data.favoriteGames.length; j++) {
    if (data.favoriteGames[j].id.toString() === selectedGameId) {
      data.favoriteGames.splice(j, 1);
      break;
    }
  }

  closeModal();

  if (data.favoriteGames.length === 0) {
    noFaves.classList.remove('hidden');
    noFaves.classList.add('view');
  } else {
    noFaves.classList.add('hidden');
    noFaves.classList.remove('view');
    renderFavedGames();
  }
});
