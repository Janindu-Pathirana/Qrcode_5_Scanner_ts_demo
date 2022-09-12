import { useState } from "react";
import { Html5Qrcode } from 'html5-qrcode'
import styled from "styled-components";

function App() {
  const [cameraId, setCameraId] = useState('');
  let html5QrCode : Html5Qrcode;

  const getPermition = () => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          setCameraId(devices[0].id)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const start = () => {
    html5QrCode = new Html5Qrcode('reader')
    html5QrCode
      .start(
        cameraId,
        {
          fps: 10, 
          qrbox: { width: 250, height: 250 },
        },
        (decodedText, decodedResult) => {
          console.log('decodedText: ', decodedText)
          console.log('decodedResult: ', decodedResult)
        },
        (errorMessage) => {
         console.log(errorMessage);
        },
      )
      .catch((err) => {
        console.log("start fail", err);
      })
  }

  return (
    <div>
      <CamRange id="reader"></CamRange>
      <Button onClick={(e) => getPermition()}>permitions</Button>
      <Button onClick={(e) => start()}>start</Button>
      <Button
        onClick={(e) => {
          html5QrCode.stop()
        }}
      >
        stop
      </Button>
    </div>
  );
}


const CamRange = styled.div`
  width: 500px;
  height: 500px;
`

const Button = styled.div`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 5px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
`

export default App;
