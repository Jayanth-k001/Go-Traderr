const axios = require('axios');
let indice;

const options = {
    method: 'GET',
    url: 'https://latest-stock-price.p.rapidapi.com/price',
    params: {
      Indices: `NIFTY 50`
    },
    headers: {
      'X-RapidAPI-Key': '1655a8f34bmsh056234229340566p1a60a1jsn002269f555a2',
      'X-RapidAPI-Host': 'latest-stock-price.p.rapidapi.com'
    }
  };
  
 const fetchstock=async(arg)=>{
    indice=arg;
    try {
      const response = await axios.request(options);
      console.log(response.data);
  } catch (error) {
      console.error(error);
  }
  }
fetchstock("NIFTY 50");

