'use client';

import styles from "../../styles/quiz/section4.module.css";
import { useEffect, useState } from "react";
import _debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';

export default function Section4() {
    const router = useRouter();
    const [data, setData] = useState([]);
    
    const getData = async () => {
        try {
        const response = await fetch(``); 
        const result = await response.json();

        setData(result);
        }
        catch(error) {
        console.log("An error occured while fetching data from api.");
        }
    }

    const getDataDebounced = _debounce(() => getData(), 300);

    useEffect(() => {
        getDataDebounced();
        return () => getDataDebounced.cancel();
    }, [router.asPath]);
    
    return (
        <main className={styles.main}>
            <div className={styles.timer}>
                <img src="/timer.png" alt="404" className={styles.time_icon} />
                <p className={styles.time}>01 : 54 : 49 left</p>
            </div>
            <p className={styles.medium}>JOIN THE</p>
            <h1 className={styles.h1}><span className={styles.red}>BATTLE</span> <span className={styles.teal}>ARENA</span></h1>
            <div className={styles.container}>
            {data.map((idx, item) => (
            <div className={styles.content} key={idx}>
                <h2 className={styles.h2}>{item.heading}</h2>
                <p className={styles.para}>{item.description}</p>
                <a href="#"><button className={styles.btn}>Take Quiz</button></a>
            </div>              
            ))}
            {/* <div className={styles.content}>
                <h2 className={styles.h2}>Type Conversions (Implicit & Explicit)</h2>
                <p className={styles.para}>C is a powerful, fast, and versatile programming language used for system programming, embedded systems, game development, and more.Its efficiency and portability make it a popular choice for beginners and professionals alike.
                </p>
                <a href="#"><button className={styles.btn}>Take Quiz</button></a>
            </div>   */}
            </div>
        </main>
    );
}