// references used:
// https://www.youtube.com/watch?v=1QTnMghzTyA&ab_channel=GoogleMapsPlatform
// https://github.com/leighhalliday/google-maps-threejs

// import * as dotenv from 'dotenv';
import coordState from "../state";
import React, { useState, useRef, useEffect, useContext } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import {
  PerspectiveCamera,
  Scene,
  AmbientLight,
  WebGLRenderer,
  Matrix4,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// require('dotenv').config();
// import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
// console.log(import.meta.env)



export default function Mapper(props) {
  // useEffect(() => {
  //   fetch('/api/test').then(r => r.json()).then(d => console.log(d))
  // }, [])
  return (
    <Wrapper apiKey={import.meta.env.VITE_APIKEY}>
      <MyMap />
    </Wrapper>
  );
}

function MyMap() {
  const overlayRef = useRef();
  const [map, setMap] = useState();
  const ref = useRef();

  const localCoordState = useContext(coordState)

  if  (!localCoordState) {
    return <></>
  }
  const {currentCoords, setCurrentCoords} = localCoordState

  const [mapOptions, setMapOptions] = useState({
    mapId: import.meta.env.VITE_MAPID,
    center: { lat: 43.661036, lng: -79.391277 },
    zoom: 17,
    disableDefaultUI: true,
    heading: 25,
    tilt: 25,
  });

  useEffect(() => {
    setMapOptions((prevOptions) => ({
      ...prevOptions,
      center: currentCoords
    })) 
    console.log("CURRETN COORDS CHANGED")
    if (!overlayRef.current) {
      console.log("WE ARE REDOING THE MAP")
      const instance = new window.google.maps.Map(ref.current, mapOptions);
      setMap(instance);
      overlayRef.current = createOverlay(instance, mapOptions);
    } else {
      // overlayRef.current.moveToCoords(currentCoords)
    }
  }, [currentCoords])

  // useEffect(() => {
   
  // }, []);

  return <>
  { currentCoords.lat }, { currentCoords.lng }
    <div ref={ref} id="map" />
  </>;
}

function createOverlay(map, mapOptions) {

  const overlay = new google.maps.WebGLOverlayView();
  let renderer, scene, camera, loader;

  overlay.onAdd = () => {
    scene = new Scene();
    camera = new PerspectiveCamera();
    const light = new AmbientLight(0xffffff, 0.9);
    scene.add(light);

    loader = new GLTFLoader();
    loader.loadAsync("./scooter/scene.gltf").then((object) => {
      const group = object.scene;
      group.scale.setScalar(25);
      group.rotation.set(Math.PI / 2, 0, 0);
      group.position.setZ(-120);
      scene.add(group);
    });
  };

  overlay.onContextRestored = ({ gl }) => {
    renderer = new WebGLRenderer({
      canvas: gl.canvas,
      context: gl,
      ...gl.getContextAttributes(),
    });
    renderer.autoClear = false;

    // loader.manager.onLoad = () => {
    //   renderer.setAnimationLoop(() => {
    //     map.moveCamera({
    //       tilt: mapOptions.tilt,
    //       heading: mapOptions.heading,
    //       zoom: mapOptions.zoom,
    //     });

    //     if (mapOptions.tilt < 60) {
    //       mapOptions.tilt += 0.5;
    //     } else if (mapOptions.zoom < 20) {
    //       mapOptions.zoom += 0.05;
    //     } else if (mapOptions.heading < 125) {
    //       mapOptions.heading += 0.5;
    //     } else {
    //       renderer.setAnimationLoop(null);
    //     }
    //   });
    // };
  };

  overlay.onDraw = ({ transformer }) => {
    const matrix = transformer.fromLatLngAltitude({
      lat: mapOptions.center.lat,
      lng: mapOptions.center.lng,
      altitude: 120,
    });
    camera.projectionMatrix = new Matrix4().fromArray(matrix);

    overlay.requestRedraw();
    renderer.render(scene, camera);
    renderer.resetState();
  };

  overlay.setMap(map);

  return overlay;
}
