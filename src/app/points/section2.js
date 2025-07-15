import styles from "../../styles/home/section2.module.css";

export default function Section2() {

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