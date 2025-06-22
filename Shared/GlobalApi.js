import axios from 'axios';
//const { default: axios } = require("axios");
// import axios from '../app/lib/axiosConfig';


const getPlace=(category,radius,lat,lng)=>axios.get('http://localhost:3000/api/openStreet-place?'+
'category='+category+'&lat='+lat+'&lng='+lng+'&radius='+radius)
// 'category='+category+'&radius='+radius+'&lat='+lat+'&lng='+lng)

const getFoursquarePlaces = (category, radius, lat, lng) =>
  axios.get('/api/fourSquare', {
    params: {
      category,
      radius,
      lat,
      lng,
    },
  });

export default{
    getPlace,
    getFoursquarePlaces

}




