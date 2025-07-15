'use client';

import styles from "../../styles/points/section4.module.css";
import { useState, useEffect } from "react";

export default function Section4() {
    const [display, setDisplay] = useState('block')
    const [show, setShow] = useState('none');
    const [mobile, setMobile] = useState(false);
    const [email, setEmail] = useState('');
    const [score, setScore] = useState(0);

    useEffect(() => {
        const storedData = sessionStorage.getItem('userData');
    
        if (storedData) {
          // console.log(storedData);
            const parsedData = JSON.parse(storedData);
    
            console.log(parsedData.user_id);
            getPoints(parsedData.user_id);
        }
    }, []);

    const getPoints = async (pt)=> {
        console.log(pt);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get?action=score&id=${pt}`);
            const result = await response.json();

            console.log(result);
            setScore(Number(result) * 10);
            setDisplay('none');
            setShow('flex');
        } catch(error) {
            console.log("an error occured : " + error);
        }
    }

    const checkSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get?`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(email)
            });

            if (response.ok) {
                getPoints();
            } else {
                console.error('Failed to submit entry:', response.status, response.statusText);
            }
        } catch(error) {
            console.log("an error occured : " + error);
        }
    }

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
                <div className={styles.container}>
                <div className={styles.left}></div>
                <div className={styles.right}>
    
                {/* <div className={styles.form1} style={{  display: `${display}` }}>
                <p className={styles.p}>CLIMB THE <span className={styles.teal}>Leaderboard!</span></p>
                <p className={styles.medium}>CHECK YOUR</p>
                <div className={styles.bg}><div className={styles.text}>POINTS</div></div>
                <div className={styles.form_wrapper}>
                <form className={styles.form} method="POST">
                    <label className={styles.label}>Your <span className={styles.teal} style={{ fontWeight: '500' }}>Email</span></label><br/>
                    <input type="email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} /><br/><br/>
                    <button className={styles.button} onClick={(e) => checkSubmit(e)}>CHECK NOW</button>
                </form>
                </div>
                </div> */}
    
                <div className={styles.display}>
                    <h1 className={`${styles.txt}`}>YOU HAVE<br/><br/><br/><span className={styles.span}>{score}</span><br/><br/> POINTS</h1>
                </div>
    
                </div>
                </div>
        </main>
    );
}