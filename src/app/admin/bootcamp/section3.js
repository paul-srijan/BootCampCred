"use client";
import styles from "../../../styles/admin/bootcamp/section3.module.css";
import Section4 from "./section4";

export default function Section3() {
    return (
        <main className={styles.main}>
            <div className={styles.panel}>
                <ul className={styles.ul}>
                    <li className={`${styles.li}`} style={{ marginBottom: '28px' }}><img src="/dashboard.png" alt="404" className={styles.icon} /> <p className={`${styles.text} ${styles.heading}`}>Dashboard</p></li>
                    <a href="/admin/bootcamp"><li className={`${styles.li} ${styles.active}`}><img src="/event-icon.png" alt="404" className={styles.icon} /> <p className={styles.text}>Bootcamps</p></li></a>
                    <a href="/admin/new-bootcamp"><li className={`${styles.li}`}><img src="/add.png" alt="404" className={styles.icon} /> <p className={styles.text}>New Bootcamp</p></li></a>
                    <a href="/admin/new-question"><li className={`${styles.li}`}><img src="/quiz.png" alt="404" className={styles.icon} /> <p className={styles.text}>New Question</p></li></a>
                </ul>
            </div>
            <div className={styles.right}>
                <Section4 />
            </div>
        </main>
    );
}