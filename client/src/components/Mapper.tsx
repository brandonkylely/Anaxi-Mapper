// references used:
// https://www.youtube.com/watch?v=1QTnMghzTyA&ab_channel=GoogleMapsPlatform
// https://github.com/leighhalliday/google-maps-threejs

import React, { useState, useRef, useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import {
  PerspectiveCamera,
  Scene,
  AmbientLight,
  WebGLRenderer,
  Matrix4,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const mapOptions = {
  mapId: import.meta.env.VITE_MAPID,
  center: { lat: 43.661036, lng: -79.391277 },
  zoom: 17,
  disableDefaultUI: true,
  heading: 25,
  tilt: 25,
};

export default function Mapper(props) {
  // temp comment
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

  useEffect(() => {
     // useEffect gets called twice in strict mode, use this to say if map exists, only call once
    if (!overlayRef.current) {
      const instance = new window.google.maps.Map(ref.current, mapOptions);
      setMap(instance);
      overlayRef.current = createOverlay(instance);
    }
  }, []);

  return <div ref={ref} id="map" />;
}

function createOverlay(map) {
  const overlay = new google.maps.WebGLOverlayView();
  let renderer, scene, camera, loader;

  // onAdd happens once when the overlay is created
  // threejs scene setting
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

// happens when scene is rendered, can use to start animation
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

// happens many times
// transformer converts lat and lng to its location in a 3d space
  overlay.onDraw = ({ transformer }) => {
    const matrix = transformer.fromLatLngAltitude({
      lat: mapOptions.center.lat,
      lng: mapOptions.center.lng,
      altitude: 120,
    });
    // tells camera 16 point matrix for setup
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

  return overlay;
}