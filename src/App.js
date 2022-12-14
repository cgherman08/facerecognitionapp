import React, { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecogntion/FaceRecognition';
import Navigation from './components/Navigation/navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
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
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('newface');
    const width = Number(image.width);
    const height = Number(image.height); 
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }  
  }

  dislpayFaceBox = (box) => {   
    this.setState({ box });
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
    .then(response => this.dislpayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
    
    } 

    onRouteChange = (route) => {
      if ( route === 'signout') {
        this.setState({isSignedIn: 'false'})
      } else if (route === 'home') {
        this.setState({isSignedIn:'true'})
      }
      this.setState({route: route});
    }

  render() {  
    const { imageURL, box, isSignedIn, route } = this.state;
      return (
        <div className="App">
        <ParticlesBg className='particles' type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' 
        ? <div> 
            <Logo />       
            <Rank />
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={ box } imageURL={ imageURL } />
          </div>
        : (
            route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange}/>
          )       
        }
      </div>
      
    );
  }   
}

export default App; 
