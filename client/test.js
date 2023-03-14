let lat = 43.661036;
let lng = -79.391277;
let type = 'restaurant';
let keyword = 'american';

function fetch(){
  fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&keyword=${keyword}&key=AIzaSyAu_LSz4lhyzD93VfVMyMOGcT1orW-D9eo`)
  .then((results)=>(console.log(results.json())))
}

fetch()

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=${type}&keyword=${keyword}&key=import.meta.env.VITE_APIKEY`