'use client';

import styles from "../../styles/home/section1.module.css";
import Section2 from "./section2.js";
import Section3 from "./section3.js";
import Section4 from "./section4.js";
import { useState, useEffect } from "react";

export default function Section1() {
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
          setMobile(window.innerWidth <= 601);
        };

        checkIsMobile();
    
        window.addEventListener('resize', checkIsMobile);
    
        return () => {
          window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    return (
        <main className={styles.main} style={{ overflow: 'hidden' }}>

        <img src="/cross.png" alt="404" className={styles.cross} />
        
        <div className={`${styles.bar} ${styles.left}`}></div>
        <div className={`${styles.bar} ${styles.right}`}></div>

        <Section2 />
        <Section3 />
        <Section4 />

        </main>
    );
}