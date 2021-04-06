// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
// 1. TODO - Import required model here
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
// 2. TODO - Import drawing utility here
import { drawRect } from "./utilities";

import Map from './components/Map'

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [ countPeople, setCountPeople ] = useState(0); // 1 because it starts with false which is -1

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network
    const net = await cocossd.load();

    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  // useEffect(() => {
  //   // console.log(foundPerson)
  //        // 1: If found person = true, increment peopleCount
  //   // if(foundPerson) {
  //   //   setCountPeople(countPeople + 1);
  //   //   // return;
  //   // }

  //   // if(!foundPerson){
  //   //   setCountPeople(countPeople - 1);
  //   //   // return;
  //   // }
  // }, [ foundPerson ])

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const obj = await net.detect(video);

      // let foundPerson = false;

      for (let i = 0; i < obj.length; i++) {
        if (obj[i].class == "person") {
          // setFoundPerson(true);
          const result = obj.filter(object => object.class === "person");
          setCountPeople(result.length);
        }
      }

     //2: Use setTimeOut to change foundPerson to false.

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      drawRect(obj, ctx)
    }
  };


  useEffect(()=>{runCoco()},[]);

  return (
    <div className="App">
      <p>Amount of people: { countPeople } </p>
      <div className="App__container">
        <Webcam
          ref={webcamRef}
          muted={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: '50%',
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: '50%',
            height: 480,
          }}
        />
        <Map countPeople={ countPeople } />
      </div>
    </div>
  );
}

export default App;
