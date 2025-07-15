'use client';

import styles from "../../styles/quiz/section1.module.css";
import Section2 from "../dashboard/section2";
import Section3 from "../quiz/section3";
import Section4 from "../quiz/section4";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export default function Section1() {
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

    return (
        <main className={styles.main}>

        <div className={`${styles.bar} ${styles.left}`}></div>

        <Section2 />
        <Section3 />
        <Section4 />

        <img className={styles.gamer} src="/vr-gamer.png" alt="404" />

        <img src="/cross-verti.png" alt="404" className={styles.cross} />

        </main>
    );
}