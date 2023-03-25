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
  Renderer,
  Camera,
  Loader,
  WebGLBufferRenderer,
  InstancedBufferAttribute,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { nearbyPlacesAtom, coordinateAtom, loadingAtom } from "../state";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

// TODO: set style toggle for user
// let styleToggle = 'full';
let styleToggle = "retail";

let mapOptions: unknown;

export default function Mapper() {
  const coordValue = useAtomValue(coordinateAtom);
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

  mapOptions = {
    mapId: styleToggle === "full" ? "605e131c3939f175" : "f5d27befd916db8c",
    center: coordValue || { lat: 34.0729297, lng: -118.4401635 },
    // zoom based on secondary search radius
    zoom: 19,
    disableDefaultUI: true,
    heading: 15,
    tilt: 55,
  };
  

  return (
    <>
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
  const coordValue = useAtomValue(coordinateAtom)
  // const nearbyPlacesArray = useAtomValue(nearbyPlacesAtom)
  const nearbyPlacesArray = useAtomValue(nearbyPlacesAtom) 


  const loadValue = useAtomValue(loadingAtom);
  const setLoadValue = useSetAtom(loadingAtom)

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
    const infoWindow = new google.maps.InfoWindow();
    const marker = new google.maps.Marker({
      // position: JSON.parse(localStorage.getItem('lastCoords')) || null,
      position: location.geometry.location,
      map,
      // label: location.name,
      title: location.name,
      icon: {
        url: location.icon,
        scaledSize: new google.maps.Size(38, 31),
        // fillColor: location.icon_background_color,
        fillOpacity: 0.6,
      },
    });
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
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

let overlay: unknown;

function createOverlay(map) {
  overlay = new google.maps.WebGLOverlayView();
  let renderer: WebGLBufferRenderer, scene: Scene, camera: Camera, loader: Loader;

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

  return overlay;
}
