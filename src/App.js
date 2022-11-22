import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecogntion/FaceRecognition';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
  apiKey: '1f4bc24a956041de9ece17777485a64c'
});

class App extends Component { 
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col = width,
      topRow: clarifaiFace.top_row = height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }  
  }

  dislpayFaceBox = (box) => { 
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
   this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
   this.setState({imageURL: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response => this.calculateFaceLocation(response))
    .catch(err => console.log(err));
    
    } 

  render() {  

    return (
      <div className="App">
       <ParticlesBg className='particles' type="cobweb" bg={true} />
       <Navigation />
       <Logo />
       <Rank />
       <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
       <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
    </div>
  );
}
}

export default App; 
