// HomeSummary.jsx
import React, { useState, useEffect, useRef } from 'react';
import './HomeSummary.css';
import { Divider } from 'semantic-ui-react'

const HomeSummary = () => {
  const [data, setData] = useState({
    deliveredPackages: 0,
    kmPerMonth: 0,
    tonsOfGoods: 0,
    satisfiedClients: 0,
  });

  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef();

  const dummyData = {
    deliveredPackages: 7255,
    kmPerMonth: 5348,
    tonsOfGoods: 8500,
    satisfiedClients: 3125,
  };
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
        } else {
          setHasIntersected(false);
          setData({
            deliveredPackages: 0,
            kmPerMonth: 0,
            tonsOfGoods: 0,
            satisfiedClients: 0,
          });
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (hasIntersected) {
      Object.keys(dummyData).forEach((key) => {
        let start = 0;
        const end = dummyData[key];
        const increment = end / 200; // adjust speed here
        const interval = setInterval(() => {
          start += increment;
          if (start >= end) {
            clearInterval(interval);
            start = end;
          }
          setData((prevData) => ({
            ...prevData,
            [key]: Math.ceil(start),
          }));
        }, 10);
      });
    }
  }, [hasIntersected]);

  return (

    
    <div className="summary-container" ref={ref}>
     
      <div className="summary-item">
        <span className="summary-title">Delivered Packages</span>
        <span className="summary-value">{data.deliveredPackages}</span>
      </div>
      <div className="summary-item">
        <span className="summary-title">KM Per Month</span>
        <span className="summary-value">{data.kmPerMonth}</span>
      </div>
      <div className="summary-item">
        <span className="summary-title">Tons Of Goods</span>
        <span className="summary-value">{data.tonsOfGoods}</span>
      </div>
      <div className="summary-item">
        <span className="summary-title">Satisfied Clients</span>
        <span className="summary-value">{data.satisfiedClients}</span>
      </div>
    </div>
  );
};

export default HomeSummary;
