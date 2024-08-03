import React, { useState, useEffect, useRef } from 'react';
import styles from './HomeHeadLine.module.css';
import { Button, Icon } from 'semantic-ui-react';

const HomeHeadLine = () => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.headlineContainer} ref={containerRef}>
      <div className={styles.textWrapper}>
        Fast and secure transportation of your cargo
        <div>
        <Button inverted size="huge" className="sendit-button">
          SendIT
          <Icon name="right arrow" />
        </Button>       
        </div>
      </div>
      
      <div className={`${styles.imageWrapper} ${inView ? styles.inView : ''}`}>
        <img src="src/assets/yellow-container.png" alt="Transport" style={{ width: '100%', height: 'auto' }} />
      </div>
      <div className={styles.verticalLine}></div>
      <div className={styles.horizontalLine}></div>
    </div>
  );
};

export default HomeHeadLine;
