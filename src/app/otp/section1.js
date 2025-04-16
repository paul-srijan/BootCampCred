'use client';

import styles from "../../styles/otp/section1.module.css";
import Section2 from "./section2.js";
import Section3 from "./section3.js";
import { useState, useEffect } from "react";

export default function Section1() {
    const [mobile, setMobile] = useState(false);

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
        
        <div className={`${styles.bar} ${styles.left}`}></div>
        <div className={`${styles.bar} ${styles.right}`}></div>

        <Section2 />
        <Section3 />

        <div className={styles.container}>
            <div className={styles.left_text}>
                <p className={styles.p}>THE QUEST FOR <span className={`${styles.teal} ${styles.bold}`}>SKILL AWAITS</span></p>
                <p className={styles.medium}>LET THE</p>
                <p className={styles.big}>BATTLE BEGIN</p>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.left_content}>
                    <button className={styles.btn}>BOOTCAMP</button>
                    <div className={styles.para}>Rise to the <span className={styles.bg}><span className={styles.text}>challenge!</span></span> Tackle obstacles, push your boundaries, and emerge <span className={styles.bg}><span className={styles.text}>victorious</span></span> as a leader in the <span className={styles.bg}><span className={styles.text}>Tech</span></span> arena.</div>
                    <br/><br/>
                    <button className={styles.btn}>CODECOMBAT</button>
                    <div className={styles.para}>Step into the arena! Showcase your <span className={styles.bg}><span className={styles.text}>skills</span></span>, outthink the competition, and claim your title as the ultimate <span className={styles.bg}><span className={styles.text}>challenge!</span></span>.</div>
                </div>
                <img src="/circle.png" alt="404" className={styles.image} />
            </div>
        </div>

        <div className={styles.form_wrapper}>
          <p className={styles.p} style={{ color: '#ffff', fontWeight: '300', letterSpacing: '1px', textAlign: 'right' }}>ENTER THE CODE TO <br/> <span style={{ fontSize: '24px' }} className={`${styles.teal} ${styles.bold}`}>Register</span></p>
          <br/><br/>
          <form className={styles.form}>
            <label className={styles.label}>OTP <span className={styles.teal} style={{ fontWeight: '500' }}>code</span></label><br/>
            <input type="text" className={styles.input} /><br/><br/>
            <a href="#" className={styles.link}>Resend OTP?</a>
            <button className={styles.button} >JOIN NOW</button>
          </form>
        </div>

        <img src="/cross.png" alt="404" className={styles.cross} />
        <img src="/cross.png" alt="404" className={`${styles.bottom}`} />

        { mobile && (
                  <div className={styles.form_wrapper_mob}>
                    <p className={styles.p} style={{ color: '#ffff', fontWeight: '300', letterSpacing: '1px', textAlign: 'right' }}>ENTER THE CODE TO <br/> <span style={{ fontSize: '24px' }} className={`${styles.teal} ${styles.bold}`}>Register</span></p>
                    <br/><br/>
                    <form className={styles.form}>
                      <label className={styles.label}>OTP <span className={styles.teal} style={{ fontWeight: '500' }}>code</span></label><br/>
                      <input type="text" className={styles.input} /><br/><br/>
                      <a href="#" className={styles.link}>Resend OTP?</a>
                      <button className={styles.button} >JOIN NOW</button>
                    </form>
                  </div>
        ) }

        </main>
    );
}