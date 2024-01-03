`use strict`;

const interval = 10;

const fetchLatestRssData = async function () {
  try{

    const response = await fetch("http://localhost:8080");
    
    const data = await response.json();
  
    console.log(data);
  }
  catch(error){
    console.log(error.message)
  }
};

fetchLatestRssData();
// setInterval(fetchLatestRssData, interval * 1000)