import Song from "../../models/Song.js";

let _results = []

//DO NOT MODIFY
class ItunesService {

  getMusicByArtist(artist) {
    var url = 'https://itunes.apple.com/search?callback=?&term=' + artist;
    // @ts-ignore
    return $.getJSON(url)
      .then(res => res.results.map(s => new Song(s)))
      .then(res => _results = res)
      .catch(err => console.log(err))
  }
  getTargetSong(index) {
    return _results[index]

  }
}



export default ItunesService