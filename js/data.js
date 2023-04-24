var data = {
  view: 'home',
  favoriteGames: [],
  nextFavId: 0
};

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('faves-local-storage', dataJSON);
});

var previousDataJSON = localStorage.getItem('faves-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
