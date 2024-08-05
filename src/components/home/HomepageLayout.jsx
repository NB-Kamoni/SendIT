import React from 'react';
import HomeLanding from './HomeLanding'; 
import Navbar from '../navbar/Navbar';
import HomeSidebar from './HomeSidebar';
import HomeHeadLine from './HomeHeadLine';
import Solutions from './Solutions';
import Footer from './Footer';



const HomepageLayer = () => (
  <div className="homepage-layer">
    <Navbar />
    <HomeSidebar/>
    <HomeLanding />
    <HomeHeadLine />
    <Solutions />
    <Footer />
   
    

  </div>
);

export default HomepageLayer;