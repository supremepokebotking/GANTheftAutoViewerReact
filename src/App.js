import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect, useState } from "react";
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


class App extends Component {
  state = {
    selectedAction: 'random',
    img: null,
    upscaledImg: null,
  }

  sessionId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });

  serviceRunning = false;

  componentDidMount() {
    console.log('componentDidMount Before')
    console.log('componentDidMount')
  }

  componentWillUnmount(){
    console.log('componentWillUnmount')

  }

  async sessionRunner(){
    while(true){
      if(this.serviceRunning){
        await this.fetchImage()
        await sleep(10)
      }else{
        console.log('nope')
        return
      }
    }
  }

  async fetchImage() {
    if(!this.serviceRunning){
      console.log('nope')
      return;
    }
    var requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'React POST Request Example',
  'session_id': this.sessionId, action:this.state.selectedAction})};

console.log(this.state.selectedAction)
    const res = await fetch(this.state.selectedAction == 'random' ? imageSampleUrl : imageUrl,requestOptions);
    console.log(res)
      const imageBlob = await res.json();
      console.log(imageBlob)
      this.setState({
        img:imageBlob["inference"],
        upscaledImg:imageBlob["upscaled"],
      })

  };

  onActionToggleChange = (event) => {
    console.log('value',(event.target.value))
    this.setState({
      selectedAction:event.target.value
    })
  };

  onStartClick = (event) => {
    if(this.serviceRunning){
      return
    }
    this.serviceRunning = true;
    this.sessionRunner()
    console.log('onstart finish')
  }

  onStopClick = (event) => {
    this.serviceRunning = false;
    console.log('onstop finish')
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
      <FormControl>
  <FormLabel id="demo-radio-buttons-group-label">Select Action</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    value={this.state.selectedAction}
    name="radio-buttons-group"
    onChange={this.onActionToggleChange}
  >
    <FormControlLabel value="a" control={<Radio />} label="Left" />
    <FormControlLabel value="random" control={<Radio />} label="Random" />
    <FormControlLabel value="d" control={<Radio />} label="Right" />
  </RadioGroup>
</FormControl>
<Button variant="contained" onClick={this.onStartClick}>Start Feed</Button>
<Button variant="contained" onClick={this.onStopClick}>Stop Feed</Button>
              <img src={"data:image/png;base64," + this.state.img} alt="logo" height="300px" width="300px"/>
      <img src={"data:image/png;base64," + this.state.upscaledImg} alt="logo" height="300px" width="300px"/>
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
};

export default App;
