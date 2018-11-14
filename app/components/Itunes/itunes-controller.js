import ItunesService from "./itunes-service.js";

//PRIVATE

const itunesService = new ItunesService()

function drawSongs(results) {
  console.log(results)
  //YOUR CODING STARTS HERE
  let template = ''
  let songListElem = document.getElementById('song-list')
  for (let i = 0; i < results.length; i++) {
    let songString = JSON.stringify(results[i])
    template += `
    <li class="song d-inline-block" onclick="app.controllers.itunesCtrl.makeTarget(${i})"> ${results[i].title} - ${results[i].collection}
    <i class="fa fa-play-circle"></i> </li>
     `
  }
  songListElem.innerHTML = template

}



//PUBLIC
class ItunesController {
  //DO NOT MODIFY THIS METHOD
  getMusic(e) {
    e.preventDefault();
    var artist = e.target.artist.value;
    //changes the button to loading while songs load
    $('#get-music-button').text('LOADING....');
    itunesService.getMusicByArtist(artist).then(results => {
      drawSongs(results)
      //changes button back to GET MUSIC once songs are loaded
      $('#get-music-button').text('GET MUSIC');
    })
  }
  makeTarget(index) {
    let song = itunesService.getTargetSong(index)
    document.getElementById('target-song').innerHTML = `
  <div class="target-card card bg-dark"> 
  <img class="card-img-top" src="${song.albumArt}">
  <div class="card-body">
  <h5 class="card-title">${song.title} - ${song.artist}</h5>
  <p class="card-text">${song.collection} - ${song.price}</p>
  <audio controls>
  <source src="${song.preview}" type="audio/mp3">
  </div>
  </div>
  `
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
  clearTarget() {
    document.getElementById('target-song').innerHTML = ``
  }
}


export default ItunesController