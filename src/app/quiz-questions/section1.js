'use client';

import styles from "../../styles/quiz-question/section1.module.css";
import Section2 from "./section2";
import Section3 from "./section3";
import Section4 from "./section4";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export default function Section1() {
  const router = useRouter();
  
    const [parsedData, setParsedData] = useState({});

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
    const storedData = sessionStorage.getItem('quizDetails');

    if (storedData) {
      // console.log(storedData);
        const parsedData = JSON.parse(storedData);

        console.log(parsedData);
    }
  }, []);

    return (
        <main className={styles.main}>

        <img src="/cross.png" alt="404" className={`${styles.cross} ${styles.top}`} />
        <img src="/cross.png" alt="404" className={`${styles.cross} ${styles.bottom}`} />

        <div className={`${styles.bar} ${styles.left}`}></div>

        <Section2 />
        <Section3 />
        <Section4 />

        <img src="/console.png" alt="404" className={styles.console} />

        </main>
    );
}