// references used:
// https://www.youtube.com/watch?v=1QTnMghzTyA&ab_channel=GoogleMapsPlatform
// https://github.com/leighhalliday/google-maps-threejs
// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import {
  PerspectiveCamera,
  Scene,
  AmbientLight,
  WebGLRenderer,
  Matrix4,
  Renderer,
  Camera,
  Loader,
  WebGLBufferRenderer,
  InstancedBufferAttribute,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  nearbyPlacesAtom,
  coordinateAtom,
  loadingAtom,
  mapStyleAtom,
  mapReloadAtom,
  destinationIDAtom
} from "../../state";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";
import { TripsLayer } from "deck.gl";
import polyline from "@mapbox/polyline";
import pathData from "./path.json"

// TODO: set style toggle for user
// let styleToggle = 'full';
// let styleToggle = "retail";

let mapOptions: unknown;
let setDestinationIDValue;

export default function Mapper() {
  const mapStyleValue = useAtomValue(mapStyleAtom);
  const coordValue = useAtomValue(coordinateAtom);
  const [destinationIDValue, setDestinationIDValue] = useAtom(destinationIDAtom)

  // coordValue = useAtomValue(coordinateAtom);
  // mapOptions.center = coordValue;

  // temp comment
  // useEffect(() => {
  //   fetch('/api/test').then(r => r.json()).then(d => console.log(d))
  // }, [])

  // useEffect(() => {
  //   // move map function
  //   if (loadValue) {
  //     moveToLocation(coordValue.lat, coordValue.lng);
  //   }
  // }, [coordValue]);
  //     mapId: mapStyleValue === "full" ? "605e131c3939f175" : "f5d27befd916db8c"

  mapOptions = {
    mapId: mapStyleValue === "full" ? "605e131c3939f175" : "f5d27befd916db8c",
    center: coordValue || { lat: 34.0729297, lng: -118.4401635 },
    // zoom based on secondary search radius
    zoom: 19,
    disableDefaultUI: true,
    heading: 15,
    tilt: 55,
  };

  return (
    <>
      <div>{destinationIDValue}</div>
      <Wrapper apiKey={import.meta.env.VITE_APIKEY}>
        <MyMap />
      </Wrapper>
    </>
  );
}

let instance: unknown;

function MyMap() {
  const overlayRef = useRef();
  const [map, setMap] = useState();
  const ref = useRef();
  const coordValue = useAtomValue(coordinateAtom);
  // const nearbyPlacesArray = useAtomValue(nearbyPlacesAtom)
  const nearbyPlacesArray = useAtomValue(nearbyPlacesAtom);
  const setMapReload = useSetAtom(mapReloadAtom);
  // const loadValue = useAtomValue(loadingAtom);
  // const setLoadValue = useSetAtom(loadingAtom);
  const [loadValue, setLoadValue] = useState(false);

  // mapOptions.center = coordValue

  useEffect(() => {
    // useEffect gets called twice in strict mode, use this to say if map exists, only call once
    if (!overlayRef.current) {
      instance = new window.google.maps.Map(ref.current, mapOptions);
      setMap(instance);
      overlayRef.current = createOverlay(instance);
      setLoadValue(true);
    }
    // moveToLocation(coordValue.lat, coordValue.lng)
  }, []);

  useEffect(() => {
    // move map function
    if (loadValue) {
      moveToLocation(coordValue.lat, coordValue.lng);
    }
  }, [coordValue]);

  // MARKERS BELOW

  nearbyPlacesArray.forEach((location) => {
    const tagsArray = location.types.map((tag) => tag.replaceAll("_", " "))
    const tags = tagsArray.toString().replaceAll(",", ", ")
    const origin = "ucla";
    // needs more research, styling not fully functional
    // onclick="handleSetDestinationIDValue(${location.place_id}, ${setDestinationIDValue})"
    const contentString = `<div class="font-fuzzy-bubbles">
    <div>
      <b>${location.name}<b>
    </div>
    <div>
      <div>Location: ${location.vicinity}<div>
      <div>Tags: ${tags}<div>
    </div>
    <a 
      class="border-1 rounded-lg bg-slate-100 px-2 py-1 transition-all ease-out duration-300 hover:scale-110" 
      name="route" value="${location.place_id}" 
      href="#${location.place_id}"
      >
      Jump to result for ${location.name} 
    </a>


    </div>
    `;
    // document.querySelector(`#${location.name}`).addEventListener('click', event => {
    //   setDestinationIDValue(10)
    // })

    const infoWindow = new google.maps.InfoWindow({
      content: contentString,
    });

    const marker = new google.maps.Marker({
      // position: JSON.parse(localStorage.getItem('lastCoords')) || null,
      position: location.geometry.location,
      map,
      // label: location.name,
      // title: location.name,
      icon: {
        url: location.icon,
        scaledSize: new google.maps.Size(38, 31),
        // fillColor: location.icon_background_color,
        fillOpacity: 0.6,
      },
    });
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.open(marker.getMap(), marker);
    });
  });

  // useEffect(() => {
  //   // if (loadValue) {
  //   //   overlay.onRemove = () => {
  //   //     overlay.setMap(null)
  //   //   }
  //   if(loadValue) {
  //     overlay.setMap(null);
  //     // overlay = null;
  //     // createOverlay(map)
  //     setLoadValue(false)
  //   }
  //   // }
  // },[currentSearchValue])

  return <div ref={ref} id="map" />;
}

function moveToLocation(lat: number, lng: number) {
  const center = new google.maps.LatLng(lat, lng);
  // using global variable:
  instance?.panTo(center);
}
// function handleSetDestinationIDValue(place_id) {
//   setDestinationIDValue(place_id);
// }

let overlay: unknown;

function createOverlay(map) {
  const encodedPolyline =
    "{p~nEbt~qUORn@x@r@`AjDnEbC~CPZLb@JdA?^Gn@Qx@E`@@z@Hj@Pd@dAxAlBlC^n@Vz@AJ@NJpAC~@UrAWn@g@x@k@h@c@l@O`@Md@Eb@DbA`@pAdAdCxBbF`@~@~@xBgAnA]ZSFKBKCMEM]C]@a@J[JOVY?SNMbBmA~@s@rB}AfEiDxLgKfS}PpNoLtGiFfGwEhMeJxDsCtGiFjEmD~AmAjAu@dAk@lAi@dDmAvCu@nDy@jCy@|BkA`CyAtBaBxD_D`F_EpLqJlOeMfDqCnDsC|@u@`Aq@d@Yn@[~@c@vAk@`Bk@T@R@r@Q~Bq@rB_ArBmA\\WN@j@a@dDaCdA]`AI^?f@Fv@Tf@Tn@f@j@t@Vj@Vr@Jf@XvBNx@`@dE@DR^BXNjBP`CXxCp@rFvA~InEpWfAnG^`CPxBFnB?z@GvDKtDC~BFzBRpCbAlIrBpP~@rGzApIdE|UxF`\\j@bDn@dDh@tB`@pA|@|BrAhCfBdClCnDvEhGhPfTV\\ETPZh@|@Zt@`@tATjBDl@Pn@NVFLBRx@`Av@hA\\n@\\j@o@x@_AjAm@t@aAnAkAxAmErFgI|J";

  const decodedPolyline = polyline.toGeoJSON(encodedPolyline);
  // console.log(decodedPolyline);

  const DATA_URL =
    "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/trips-v7.json";

    const data = [{path: [], timestamps: []}];
    for (let i = 0; i < decodedPolyline.coordinates.length; i++) {
      data[0].path.push(decodedPolyline.coordinates[i]);
      data[0].timestamps.push((i * 8))
    }
    
  // console.log(DATA_URL)
  console.log(data, "data");
  const LOOP_LENGTH = 1800;
  const VENDOR_COLORS = [
    [255, 0, 0], // vendor #0
    [0, 0, 255], // vendor #1
  ];
  const overlay2 = new GoogleMapsOverlay({});
  let currentTime = 0;

  const props = {
    id: "trips",
    data: data,
    getPath: (d: Data) => d.path,
    getTimestamps: (d: Data) => d.timestamps,
    getColor: [255, 0, 0],
    opacity: 1,
    widthMinPixels: 5,
    trailLength: 180,
    currentTime,
    shadowEnabled: false,
  };

  // const props = {
  //   id: "trips",
  //   // data: pathData,
  //   // getPath: (d) => d.waypoints.map((p) => p.coordinates),
  //   // getTimestamps: (d: Data) => d.waypoints.map((p) => p.timestamp),
  //   getPath: d => d.map(p => p.path),
  //   getTimestamps: d => d.map(p => p.timestamps),
  //   getColor: [253, 128, 93],
  //   opacity: 1,
  //   widthMinPixels: 2,
  //   trailLength: 180,
  //   currentTime,
  // };

console.log(pathData)
  // const props = {
  //   id: "trips",
  //   data: pathData,
  //   getPath: (d: Data) => d.path,
  //   getTimestamps: (d: Data) => d.timestamps,
  //   getColor: (d: Data) => VENDOR_COLORS[d.vendor],
  //   opacity: 1,
  //   widthMinPixels: 50,
  //   trailLength: 180,
  //   currentTime,
  //   shadowEnabled: false,
  // };

  console.log(props, "props");

  overlay = new google.maps.WebGLOverlayView();
  let renderer: WebGLBufferRenderer,
    scene: Scene,
    camera: Camera,
    loader: Loader;

  // onAdd happens once when the overlay is created
  // threejs scene setting
  overlay.onAdd = () => {
    scene = new Scene();
    camera = new PerspectiveCamera();
    const light = new AmbientLight(0xffffff, 0.9);
    scene.add(light);

    // const search results array [{}]
    // for (all search results) {
    // const matrix = transformer.fromLatLngAltitude({
    //   lat: results[i].center.lat,
    //   lng: results[i].center.lng,
    //   altitude: 120,
    // });
    //
    // }

    // TODO: add DRACO loader to use compressed models
    loader = new GLTFLoader();
    loader.loadAsync("./scooter/scene.gltf").then((object) => {
      const group = object.scene;
      group.scale.setScalar(25);
      group.rotation.set(Math.PI / 2, Math.PI / 2.4, 0);
      group.position.setX(20);
      group.position.setZ(-120);
      scene.add(group);
    });
    loader.loadAsync("./flag.gltf").then((object) => {
      const group = object.scene;
      group.scale.setScalar(20);
      group.rotation.set(Math.PI / 2, 0, 0);
      group.position.setZ(-120);
      scene.add(group);
    });
  };

  //happens only once when we have access to the webgl context
  // gl variable provided by WebGLOverlayView
  overlay.onContextRestored = ({ gl }) => {
    renderer = new WebGLRenderer({
      canvas: gl.canvas,
      context: gl,
      ...gl.getContextAttributes(),
    });
    // gives us control of setting renderer before next scene
    renderer.autoClear = false;

    const animate = () => {
      currentTime = (currentTime + 1) % LOOP_LENGTH;

      const tripsLayer = new TripsLayer({
        ...props,
        currentTime,
      });

      overlay2.setProps({
        layers: [tripsLayer],
      });

      window.requestAnimationFrame(animate);
    };

    window.requestAnimationFrame(animate);

    // happens when scene is rendered, can use to start animation
    loader.manager.onLoad = () => {
      renderer.setAnimationLoop(() => {
        map.moveCamera({
          tilt: mapOptions.tilt,
          heading: mapOptions.heading,
          zoom: mapOptions.zoom,
        });

        if (mapOptions.zoom > 18.5) {
          mapOptions.zoom -= 0.01;
          mapOptions.heading += 0.04;
        } else {
          renderer.setAnimationLoop(null);
        }
      });
    };
  };

  // happens many times
  // transformer converts lat and lng to its location in a 3d space
  overlay.onDraw = ({ transformer }) => {
    const matrix = transformer.fromLatLngAltitude({
      lat: mapOptions.center.lat,
      lng: mapOptions.center.lng,
      altitude: 120,
    });
    // console.log(matrix)
    // returns array with 16 points
    // Matrix4 is a 16 point matrix
    camera.projectionMatrix = new Matrix4().fromArray(matrix);
    // constantly redraw whats in the camera view
    overlay.requestRedraw();
    // points the camera at the scene
    renderer.render(scene, camera);
    // good practice, not explained
    renderer.resetState();
  };
  // tells overlay which map to use
  overlay.setMap(map);

  overlay2.setMap(map);

  return overlay;
}
