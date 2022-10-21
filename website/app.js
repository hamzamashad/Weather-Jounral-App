/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?lat=',
zipURL = 'http://api.openweathermap.org/geo/1.0/zip?zip='
apiKey = 'd3fdaa4d0905b18d74f519c2150e4320';
const zipArea = document.getElementById('zip'),
userFeelingsArea = document.getElementById('feelings'),
dateDisplay = document.getElementById('date'),
tempDisplay = document.getElementById('temp'),
feelingsDisplay = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction() {
    const zipCode = zipArea.value,
    userFeelings = userFeelingsArea.value;
    const targetLocation = getGeo(zipURL, zipCode, apiKey);
    const targetLat = getLat(targetLocation);
    const targetLon = getLon(targetLocation);
    const target = {
        lat: targetLat,
        lon: targetLon
    };
    const targetTemperature = getTemp(baseURL, target.lat, target.lon, apiKey);
    const sendData = targetTemperature.then(function(data) {
        postData('/weatherData', {
            temperature: data,
            date: newDate,
            userResponse: userFeelings
        })
    });
    sendData.then(updateUI);
}

/* Function to GET Web API Data*/
const getGeo = async (url, zip, key) => {
    const res = await fetch(url+zip+'&appid='+key);
    try {
        const data = await res.json();
        return await data
    } catch(error) {
        console.log("error", error);
    }
}
const getTemp = async (url, lat, lon, key) => {
    const res = await fetch(url+await lat+'&lon='+await lon+'&units=metric&appid='+key);
    try {
        const data = await res.json();
        tempData = data.main.temp;
        return tempData
    } catch(error) {
        console.log("error", error);
    }
}

/* Functions to process Project Data */
const getLat = async (location) => {
    const res = await location;
    try {
        const data = await res.lat;
        return data
    } catch(error) {
        console.log("error", error);
    }
}
const getLon = async (location) => {
    const res = await location;
    try {
        const data = await res.lon;
        return data
    } catch(error) {
        console.log("error", error);
    }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data)
    });
    
    try {
        const newData = await response.json();
        console.log(newData);
        return newData
    } catch(error) {
      console.log("error", error);
    }
}

/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        tempDisplay.innerText = allData[0].temperature;
        dateDisplay.innerText = allData[0].date;
        feelingsDisplay.innerText = allData[0].userResponse;
  
    } catch(error) {
        console.log("error", error);
    }
}