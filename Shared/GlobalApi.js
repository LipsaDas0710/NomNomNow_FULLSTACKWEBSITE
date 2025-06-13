import axios from 'axios';
//const { default: axios } = require("axios");
// import axios from '../app/lib/axiosConfig';


const getPlace=(category,radius,lat,lng)=>axios.get('http://localhost:3000/api/openStreet-place?'+
'category='+category+'&lat='+lat+'&lng='+lng+'&radius='+radius)
// 'category='+category+'&radius='+radius+'&lat='+lat+'&lng='+lng)


export default{
    getPlace,

}


//http://localhost:3000/api/google-place?category=italian&lat=37.7749&lng=-122.4194&radius=5
//http://localhost:3000/api/google-place?category=[restaurant]&lat=37.7749&lng=-122.4194&radius=5


