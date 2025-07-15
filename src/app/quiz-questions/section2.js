'use client';

import styles from "../../styles/quiz-question/section2.module.css";
import { useRouter } from "next/navigation";

export default function Section2() {
    const router = useRouter();

    const logout = () => {
        sessionStorage.removeItem("userData");
        router.push('/');
    };

    return (
        <main className={styles.main}>
            <div className={styles.text_wrap}>
            <div className={styles.bg}><p className={styles.text} style={{ fontWeight: '600', letterSpacing: '0.99px' }}>MARCH</p></div> ELITE ARENA
            </div>

            <div className={styles.btn}>
                <img src="/logout.png" alt="404" className={styles.user} />
                <a href="/dashboard"><p className={styles.p}>End Task</p></a>
            </div>
        </main>
    );
}