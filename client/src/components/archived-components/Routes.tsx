// //@ts-nocheck
// import { useState } from "react";
// import polyline from "@mapbox/polyline";

// if unarchived, rename Routes to something different since react-router has <Routes> component
// export default function Routes() {
//   const encodedPolyline =
//     "qukmEvvvnUz@l@\\n@H|@@vCQXMHE?eB?Ee@k@BM?qACeAHq@??c@AQu@k@UI@_D@uAAs@_@Bm@Ha@JsG`B_Br@kA\\s@Q_Bi@_Cs@oAI_BPaAf@uHrGaFjEIb@cCrBiEjEiErE_MxMkDtD_DzD{BbE{AxD{A`G_CxOiAnHgArEsBtFuCrGwIzRwO~]oDdIiGpMmGtKgDnH}Nb_@qJ~UuMvZkChFsCnEeFfHmFjHwBhDmBfFwAjGgGbYeC`I_EhJeGpKeGzKqAvCyEpK_M|XaK`UmMjY}FxIaEbFwFvHgC`EkCbF_CnFsH~SwBhG_KzUuDlIsAxCkHzNuAtCgCtEkKhT}CpH}HvRaF|LiIrSiD~H}HbPqJ~QoQ~_@kHfPmGlMwDhGeFtG_HnHiS|RwD|DuCvD}BtDaCxEeDdHiF~JeHrJkFjFqG~EuOxJ}XfQmRnLgh@v[uFlD}CvBcObJgKfGcX|OwZhQuHlEkF~DuC|CkD~E{HtLkNjTmU`^oE|GsB|CiEtE_CfBaCrAoChAuFvAmYdGwCl@kEtAoDfBgDxBiJjGcGtEiLfLkOjOcHdHuCnDqIdNuGxGiH`HyQ`QyPbPkCbCcCdBgEvBuErCsH~GsL~KoFpFoGtHuFxGyC`FkC`FoBjCgLjK_DlE}AnDwLb]iCpIcAdFeA|Eq@rByAzCgBtDaHbSiFdOsA~Em@`Dk@fFUjF?tHDzX?xJGvFYxDeA~GyCdKeHdT}IdXkCtI[nAQtAu@bDgFrO}FxPeHtS{A|DeBlD_FnHoDpDmEbD{EdBoBV{BDmE]oFIwBJsCFkE_@gFs@mGYoNNoFb@aEx@{GdCsJzDiCfBeBrCUj@YrAQbBYbF}@xIyA|QYtFq@hLJbIMfB_AtD{BvEsNzWyCjFqC~DwF|GqKzIiDpCkDfDuInMgGpJ}B|EcAnCeChJiFtS}ExQ_J`XuFzPkBvE}BlHeD`PcD~PqCfQyCpTkB~OaApE{AzEeEtJcFnMqGhQoE~IoLtRkEvGwErEkDzBoHvDcG`DaDjCaBlBcAbBmC`FoC`FaCfEsCrD{DlDcFvCqKhFaEnB{ChBkCjCcCbEgBzFm@rEWdOa@fEu@jDkBtE{DxHoDdHwEjJyGdMyCnDaCjBcD|AuD`AcLjCeJdBsDt@eErA_EhBcCxAoDlCqClCaMjOsClDoBzAwG`EkIdIqBtB}@|@QP[EA?{AtAcA~@QNw@`@yA`AaDpB{AlAgA`B{@zAiA~@k@t@m@v@KBUEQEyAw@wCg@mA?";

//   const decodedPolyline = polyline.decode(encodedPolyline);

//   const geoJson = polyline.toGeoJSON(encodedPolyline);


//   // useEffect(() => {
//   //   console.log(decodedPolyline);
//   //   console.log(geoJson);
//   // }, [decodedPoly]);

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     console.log("decodedPoly", decodedPolyline);
//     console.log("decodedGeo", geoJson);
//   };

//   // const origin = '6255 Sunset Blvd, Los Angeles, CA 90028';
//   // const destination = '6006 Fountain Ave, Los Angeles, CA 90028'
//   // const fetchUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${import.meta.env.VITE_APIKEY}`

//   // legs to polyline data structure
//   // https://stackoverflow.com/questions/16180104/get-a-polyline-from-google-maps-directions-v3
//   // https://stackoverflow.com/questions/40877840/google-maps-api-draw-a-route-using-points-of-a-polyline

//   // var axios = require('axios');

//   // var config = {
//   //   method: 'get',
//   //   url: 'https://maps.googleapis.com/maps/api/directions/json?origin=place_id%3AChIJ685WIFYViEgRHlHvBbiD5nE&destination=place_id%3AChIJA01I-8YVhkgRGJb0fW4UX7Y&key=YOUR_API_KEY',
//   //   headers: { }
//   // };

//   // axios(config)
//   // .then(function (response) {
//   //   console.log(JSON.stringify(response.data));
//   // })
//   // .catch(function (error) {
//   //   console.log(error);
//   // });

//   return (
//     <>
//       <button onClick={handleFormSubmit}>Yeet</button>
//     </>
//   );
// }
