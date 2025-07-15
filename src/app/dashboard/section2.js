import styles from "../../styles/home/section2.module.css";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export default function Section2() {
    const router = useRouter();

    const logout = () => {
        deleteCookie('userRole');
        sessionStorage.removeItem('userData');
        router.push('/');
    };

    return (
        <main className={styles.main}>
            <div className={styles.text_wrap}>
            <div className={styles.bg}><p className={styles.text} style={{ fontWeight: '600', letterSpacing: '0.99px' }}>MARCH</p></div> ELITE ARENA
            </div>

            <div className={styles.btn}>
                <img src="/logout.png" alt="404" className={styles.user} />
                <p className={styles.p} onClick={logout}>Logout</p>
            </div>
        </main>
    );
}