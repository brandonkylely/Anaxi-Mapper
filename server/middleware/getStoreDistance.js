require("dotenv").config();

let formatMatrixInputs = (locationDestinations, origin) => {
  function createUrl(locationDestinations, origin) {
    let locationOrigin = `${origin.lat}|${origin.lng}`;
    let destinationRequest = locationDestinations
      .map((location) => {
        return `${location.lat},${location.lng}`;
      })
      .join("|");
    return `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${locationOrigin}&destinations=${destinationRequest}&key=${process.env.apiKey}`;
  }

  async function getStoreDistance(locationDestinations, origin) {
    const response = await fetch(
      createUrl(locationDestinations, origin),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  }
};

module.exports = formatMatrixInputs();
