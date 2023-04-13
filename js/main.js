
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open('GET', 'https://free-to-play-games-database.p.rapidapi.com/api/games');
xhr.setRequestHeader('X-RapidAPI-Key', 'e8d1786883msh3097c4a82d2b6bep18d886jsneb07d6ef89a9');
xhr.setRequestHeader('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');
xhr.responseType = 'json';

const startBtn = document.querySelector('.start');

const filteredGenre = [];
xhr.addEventListener('load', function () {
  startBtn.addEventListener('click', function () {
    filteredGenre.length = 0;
    const selectGenre = document.querySelector('#genres');
    const index = selectGenre.selectedIndex;
    const selectedOptionText = selectGenre.options[index].textContent;
    for (let i = 0; i < xhr.response.length; i++) {
      if (xhr.response[i].genre === selectedOptionText) {
        filteredGenre.push(xhr.response[i]);
      }
    }
  });
});

xhr.send();
