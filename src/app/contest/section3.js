'use client';

import styles from "../../styles/contest/section3.module.css";
import { useState, useEffect } from "react";
import _debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';

export default function Section3() {
    const router = useRouter();
    const [task, setTask] = useState([]);
    const [date, setDate] = useState('');

    function getCurrentDate() {
        const d = new Date();
        const currDate = d.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
        setDate(date);
    }
      

    useEffect(() => {
        getDataDebounced();
        return () => getDataDebounced.cancel();
    }, [router.asPath]);

    const getDataDebounced = _debounce(() => getData(), 300);

    const getData = async () => {
        try {
            const response = await fetch(``);
            const result = await response.json();

            setTask(result);
        } catch (error) {
            console.log("An error occured while fetching data : " + error);
        }
    }

    return (
        <main className={styles.main}>
            <div className={styles.bg}><p className={styles.text}>C<br/>O<br/>M<br/>P<br/>I<br/>L<br/>E<br/>X<br/></p></div>
            <div className={styles.container}>
            <div className={styles.left_text}>
                <p className={styles.p}>THE QUEST FOR <span className={`${styles.teal} ${styles.bold}`}>SKILL AWAITS</span></p>
                <p className={styles.medium}>LET THE</p>
                <p className={styles.big}>BATTLE BEGIN</p>
            </div>
            <div className={styles.wrapper}>
                {/* <div className={styles.box}>
                    <button className={styles.btn}>DAY 1</button>
                    <p className={styles.para}>COMPLETE TASK TO EARN A <span className={styles.red}>POINT</span></p>
                </div>
                <div className={styles.box}>
                    <button className={styles.btn}>DAY 2</button>
                    <p className={styles.para}>COMPLETE TASK TO EARN A <span className={styles.red}>POINT</span></p>
                </div>
                <div className={styles.box}>
                    <button className={styles.btn} disabled>DAY 3</button>
                    <p className={styles.para}>COMPLETE TASK TO EARN A <span className={styles.red}>POINT</span></p>
                </div>
                <div className={styles.box}>
                    <button className={styles.btn} disabled>DAY 4</button>
                    <p className={styles.para}>COMPLETE TASK TO EARN A <span className={styles.red}>POINT</span></p>
                </div> */}
                {task.map((item, idx) => (
                    <div className={styles.box} key={idx} style={{ opacity: item.date == date ? '1' : '0.64' }}>
                        <button className={styles.btn} disabled={item.date === date} style={{ cursor: item.date == date ? "pointer" : "context-menu" }}>{item.name}</button>
                        <p className={styles.para}>COMPLETE TASK TO EARN A <span className={styles.red}>POINT</span></p>
                    </div>
                ))}
            </div>
            </div>
            <img src="/circle.png" alt="404" className={styles.circle} />
        </main>
    );
}