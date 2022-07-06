import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const imageData = "https://i.imgur.com/fHyEMsl.jpg";
const imageSampleUrl = "http://localhost:8751/api/sample_step";
const imageUrl = "http://localhost:8751/api/step";

const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);
function App() {
  const [selectedAction, setSelectedAction] = useState('random');
  const [serviceRunning, setServiceRunning] = useState(false);
  const [img, setImg] = useState();
  const [upscaledImg, setUpscaledImg] = useState();
  const sessionId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });

  async function fetchImage(selectedAction) {
      var requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example',
    'session_id': sessionId, action:selectedAction})
  };

  console.log(selectedAction)
      const res = fetch(selectedAction == 'random' ? imageSampleUrl : imageUrl,requestOptions)
      .then(response => response.json()).
      then(json => {
        console.log(json)
        setImg(json["inference"]);
        setUpscaledImg(json["upscaled"]);
    
      });
 
    };

  useEffect(() => {
    setSelectedAction('random')
//    fetchImageLooper()
        console.log('i fire once');  
  }, []);


    const onActionToggleChange = (event) => {
      console.log('value',(event.target.value))
      setSelectedAction(event.target.value);
    };

    const onStartClick = (event) => {
      fetchImageLooper();
    }

    
    function startPolling(){

    }

    async function fetchImageLooper(){
      while (true){
        await fetchImage(selectedAction);
        await sleep(5000)
        console.log('selectedActionselectedActionselectedAction', selectedAction)
        if(selectedAction === 'a'){
          break
        }
      }
      console.log('done')

    }


  
  
  return (
    <div className="App">
      <header className="App-header">
      <FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Select Action</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    value={selectedAction}
    name="radio-buttons-group"
    onChange={onActionToggleChange}
  >
    <FormControlLabel value="a" control={<Radio />} label="Left" />
    <FormControlLabel value="random" control={<Radio />} label="Random" />
    <FormControlLabel value="d" control={<Radio />} label="Right" />
  </RadioGroup>
</FormControl>
<Button variant="contained" onClick={onStartClick}>Start Feed</Button>
              <img src={"data:image/png;base64," + img} alt="logo" height="300px" width="300px"/>
      <img src={"data:image/png;base64," + upscaledImg} alt="logo" height="300px" width="300px"/>
      <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
