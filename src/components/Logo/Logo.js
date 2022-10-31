import React from 'react';
import Tilt from 'react-parallax-tilt';
import logo from './logo.png'
import './Logo.css';

const Logo = () => {
	return ( 
      <Tilt className='Tilt br2 shadow-2 ma4 mt0' style={{ height: '150px', width: '150px' }}>
        <div>
          <img alt='logo' src={logo}></img>
        </div>
      </Tilt> 
	);
}

export default Logo;