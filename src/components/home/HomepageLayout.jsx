import React from 'react';
import HomeLanding from './HomeLanding'; 
import Navbar from '../navbar/Navbar';


const HomepageLayer = () => (
  <div className="homepage-layer">
    <Navbar />
    <HomeLanding />
  </div>
);

export default HomepageLayer;