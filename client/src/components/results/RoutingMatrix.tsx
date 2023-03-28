//@ts-nocheck
import React, { useState, useEffect } from "react";

export const RouteMatrix = ({ originPlaceId, destinationPlaceIds }) => {
  console.log(destinationPlaceIds, originPlaceId);
  const [routeMatrix, setRouteMatrix] = useState(null);
  console.log("originPlaceId", originPlaceId);
  const computeRouteMatrix = async () => {
    const directionsService = new google.maps.DirectionsService();

    const destinations = destinationPlaceIds;
    //   .map((placeId) => ({ placeId }));
    console.log("destinations", destinations);
    const request = {
      origins: [{ placeId: originPlaceId }],
      destinations: destinations,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.routeMatrix(request, (response, status) => {
      if (status === "OK") {
        console.log("response from directionService.routeMatrix", response);
        setRouteMatrix(response);
      } else {
        console.error(`Error fetching route matrix: ${status}`);
      }
    });
  };

  if (originPlaceId && destinationPlaceIds.length > 0) {
    computeRouteMatrix();
  }
};

//   return (
//     <div>
//       {routeMatrix ? (
//         <pre>{JSON.stringify(routeMatrix, null, 2)}</pre>
//       ) : (
//         <p>Loading route matrix...</p>
//       )}
//     </div>
//   );
