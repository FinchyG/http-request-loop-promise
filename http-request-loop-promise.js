// decalre global variable for storing here maps api key
var apiKey = "example API key";

// declare global variable to store postcodes for latitudes and longitudes fetching
var postcodes = ["LS1 4DY", "HX1 2NG", "HD1 1JB", "BD1 1TU"];

// declare global variables to store fetched latitudes and longitudes
var lats = [];
var lons = [];

function get_latitudes_and_longitudes() {
    
    // declare local variable for URL to get latitudes and longitudes from postcodes
    let nominatim_url = "https://nominatim.openstreetmap.org/search?postalcode=";
    
    // loop through postcodes fetching their latitudes and longitudes
    for (let i = 0; i < postcodes.length; i++) {
        
        // local variables constructing HTTP fetch requests for latitudes and longitudes
        // from UK postcodes through nominatim API in JSON format
        let postcode = postcodes[i];
        let url = nominatim_url + postcode + "&format=json&countrycodes=gb";

        // call helper function to send constructed requests
        request_postcode_lats_and_lons(url)
            .then(data => {
            lats.push(parseFloat(data[0].lat));
            lons.push(parseFloat(data[0].lon));
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
    }
    // call helper function to check all requested latitude
    // and longitudes have been received
    checkAllDataReceived();
}

function request_postcode_lats_and_lons(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error - status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}

function checkAllDataReceived() {
  if (
    lats.length === postcodes.length &&
    lons.length === postcodes.length
  ) {
    // all latitudes and longitudes received so call helper function
    // to display data on page
    displayDataOnPage();
  } else {
    // all latitudes and longitudes not received so wait half a second
    // and then re-call check function
    setTimeout(checkAllDataReceived, 500);
  }
}

function displayDataOnPage() {

  // declare variable to reference DOM element for displaying fetched
  // latitudes and longitudes
  let resultsDiv = document.getElementById("results");

  // create header in DOM to display fetched postcodes latitudes and longitudes
  let resultsHeader = document.createElement("h3");
  resultsHeader.innerText = "Returned postcodes:";
  resultsDiv.appendChild(resultsHeader);

  // create unordered list to display fetched latitudes and longitudes
  const resultsList = document.createElement("ul");
  resultsDiv.appendChild(resultsList);

  // create header to display fetched latitudes
  let latsListHeader = document.createElement("li");
  latsListHeader.innerHTML = "<b>Latitudes</b>";
  resultsList.appendChild(latsListHeader);

  // loop for displaying fetched latitudes
  for (let i = 0; i < lats.length; i++) {
    let newLine = document.createElement("li");
    newLine.innerText = lats[i];
    resultsList.appendChild(newLine);
  }

  // create header to display fetched longitudes
  const lonsListHeader = document.createElement("li");
  lonsListHeader.innerHTML = "<b>Longitudes</b>";
  resultsList.appendChild(lonsListHeader);

  // loop for displaying fetched longitudes
  for (let i = 0; i < lats.length; i++) {
    let newLine = document.createElement("li");
    newLine.innerText = lons[i];
    resultsList.appendChild(newLine);
  }
}