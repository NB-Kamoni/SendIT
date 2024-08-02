import React from 'react';
import HomeLanding from './HomeLanding'; 
import Navbar from '../navbar/Navbar';
import HomeSidebar from './HomeSidebar';


const HomepageLayer = () => (
  <div className="homepage-layer">
    <Navbar />
    <HomeSidebar/>
    <HomeLanding />

  </div>
);

export default HomepageLayer;