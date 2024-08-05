import React, { useState } from 'react';
import { Segment, Header, Button, Icon } from 'semantic-ui-react';
import './Solutions.css';
import HomeSummary from './HomeSummary'

const Solutions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const services = [
    {
      title: 'Transparent Pricing',
      summary: 'Understand our pricing with no hidden fees.',
      description: 'At SendIT, we believe in full transparency. Our pricing is straightforward, with no hidden fees. You get a detailed breakdown of costs for every shipment, ensuring you know exactly what you’re paying for. Our team is always available to help you understand our pricing structure and find the best value for your budget.'
    },
    {
      title: 'Warehouse Storage',
      summary: 'Secure and flexible storage solutions.',
      description: 'Our state-of-the-art warehouse facilities are designed to keep your goods safe and secure. With 24/7 surveillance and advanced inventory management systems, you can trust us with your storage needs. Whether you need short-term or long-term storage, we provide flexible solutions tailored to your requirements.'
    },
    {
      title: 'Real-Time Tracking',
      summary: 'Monitor your shipment at every step.',
      description: 'Stay updated with our real-time tracking system. From the moment your shipment leaves our facility, you can monitor its progress at every step. Our intuitive tracking platform provides live updates and notifications, so you are always in the loop and can plan accordingly.'
    },
    {
      title: 'Security for Cargo',
      summary: 'Ensuring the safety of your goods.',
      description: 'Security is our top priority at SendIT. We employ rigorous security protocols to ensure the safety of your cargo. Our team of experts uses the latest technology and practices to protect your goods from theft, damage, or loss. With SendIT, your cargo is in safe hands.'
    }
  ];

  const toggleOpen = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="solutions-container">
      <Header as="h1" textAlign="left" className="solutions-header">
        SendIT gives you complete control of your shipments.
      </Header>
      {services.map((service, index) => (
        <Segment
          key={index}
          className={`service-item ${openIndex === index ? 'open' : ''}`}
        >
          <div className="service-header" onClick={() => toggleOpen(index)}>
            <div className="service-info">
              <span className="service-title">{service.title}</span>
              <span className="service-summary">{service.summary}</span>
            </div>
            <Button circular icon className={`toggle-button ${openIndex === index ? 'open' : ''}`}>
              <Icon name={openIndex === index ? 'minus' : 'plus'} />
            </Button>
          </div>
          <div className={`service-description ${openIndex === index ? 'open' : ''}`}>
            {service.description}
          </div>
         
        </Segment>
        
      ))}
       <HomeSummary />
    </div>
  );
};

export default Solutions;
