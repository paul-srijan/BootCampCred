'use client';

import styles from "../../styles/home/section1.module.css";
import Section2 from "./section2.js";
import Section3 from "./section3.js";
import Section4 from "./section4.js";
import { useState, useEffect } from "react";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from "next/navigation";

export default function Section1() {
    const [mobile, setMobile] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(getCookie('userRole')) {
        const role = getCookie('userRole');
    
        if (role != 'student') {
          router.push('/');
        } 
      } else {
        router.push('/');
      }
    }, []);

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
        <main className={styles.main}>

        <img src="/cross.png" alt="404" className={styles.cross} />
        
        <div className={`${styles.bar} ${styles.left}`}></div>
        <div className={`${styles.bar} ${styles.right}`}></div>

        <Section2 />
        <Section3 />
        <Section4 />

        </main>
    );
}