"use client";
import styles from "../../../styles/admin/bootcamp/section2.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export default function Section2() {
    const router = useRouter();
    const [mobile, setMobile] = useState(false);
    const [translate, setTranslate] = useState('-100%');

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

    const logout = () => {
        deleteCookie('userRole');
        router.push('/');
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.h1}>Admin<span className={styles.span}>Console</span></h1>
            { !mobile && (
                <button className={styles.logout} onClick={logout}>Logout</button>
            ) }
            <img src="/hamburger.png" alt="404" className={styles.menu} onClick={() => setTranslate('0%')} />
            <div className={styles.panel} style={{ transform: `translateX(${translate})` }}>
                <img src="/close.png" alt="404" className={styles.close} onClick={() => setTranslate('-100%')} />
                <ul className={styles.ul}>
                    <li className={`${styles.li}`} style={{ marginBottom: '28px' }}><img src="/dashboard.png" alt="404" className={styles.icon} /> <p className={`${styles.text} ${styles.heading}`}>Dashboard</p></li>
                    <a href="/admin/bootcamp"><li className={`${styles.li}`}><img src="/event-icon.png" alt="404" className={styles.icon} /> <p className={styles.text}>Bootcamps</p></li></a>
                    <a href="/admin/new-bootcamp"><li className={`${styles.li} ${styles.active}`}><img src="/add.png" alt="404" className={styles.icon} /> <p className={styles.text}>New Bootcamp</p></li></a>
                    <a href="/admin/new-question"><li className={`${styles.li}`}><img src="/quiz.png" alt="404" className={styles.icon} /> <p className={styles.text}>New Question</p></li></a>
                    <button className={styles.logout} onClick={logout}>Logout</button>
                </ul>
            </div>
        </main>
    );
}