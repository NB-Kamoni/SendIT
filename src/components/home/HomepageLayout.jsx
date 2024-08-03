import React from 'react';
import HomeLanding from './HomeLanding'; 
import Navbar from '../navbar/Navbar';
import HomeSidebar from './HomeSidebar';
import HomeHeadLine from './HomeHeadLine';


const HomepageLayer = () => (
  <div className="homepage-layer">
    <Navbar />
    <HomeSidebar/>
    <HomeLanding />
   
    <HomeHeadLine />
    

  </div>
);

export default HomepageLayer;