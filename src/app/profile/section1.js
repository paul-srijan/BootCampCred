'use client';

import styles from "../../styles/otp/section1.module.css";
import Section2 from "../points/section2";
import Section3 from "../otp/section3";
import { useState, useEffect } from "react";
import _debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';

export default function Section1() {
    const [mobile, setMobile] = useState(false);
    const [data, setData] = useState();
    const router = useRouter();

    const getData = async (id) => {
      try {
        const response = await fetch(``);
        const result = await response.json();

        setData(result);
      } catch(error) {
        console.log("an error occured : " + error);
      }
    }

    const getDataDebounced = _debounce(() => getData(), 300);

    useEffect(() => {
      getDataDebounced();
      return () => getDataDebounced.cancel();
    }, [router.asPath]);
    
    const initialFormData = {
      name: '',
      year: '',
      stream: ''
    }

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
      setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(``, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
  
        if (response.ok) {
          console.log('Entry submitted successfully!');
        } else {
          console.error('Failed to submit entry:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error submitting entry:', error);
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
        
        <div className={`${styles.bar} ${styles.left}`}></div>
        <div className={`${styles.bar} ${styles.right} ${styles.m_bar}`}></div>

        <Section2 />
        <Section3 />

        <div className={styles.container}>
            <div className={styles.left_text}>
                <p className={styles.p}>THE QUEST FOR <span className={`${styles.teal} ${styles.bold}`}>SKILL AWAITS</span></p>
                <p className={styles.medium}>PLAY HARD</p>
                <p className={styles.big}>LEARN MORE</p>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.left_content}>
                  <div className={styles.details}>
                    <p className={styles.teal}>NAME : </p>
                    <p className={styles.txt}>Sayantan Dey</p>
                  </div>
                  <div className={styles.details}>
                    <p className={styles.teal}>EMAIL : </p>
                    <p className={styles.txt}>sayantandey506@gmail.com</p>
                  </div>
                  <div className={styles.details}>
                    <p className={styles.teal}>PHONE NO : </p>
                    <p className={styles.txt}>8017511521</p>
                  </div>
                  <div className={styles.details}>
                    <p className={styles.teal}>BOOTCAMP ID : </p>
                    <p className={styles.txt}>1cnf66680png</p>
                  </div>
                </div>
                <img src="/circle.png" alt="404" className={styles.image} />
            </div>
        </div>

        <div className={styles.form_wrapper}>
        <p className={styles.p} style={{ color: '#ffff', fontWeight: '300', letterSpacing: '1px', textAlign: 'right' }}>COMPLETE YOUR <span style={{ fontSize: '24px', color: '#BA0E42' }} className={`${styles.teal} ${styles.bold}`}>Profile</span></p>
          <br/><br/>
          <form className={styles.form} method="POST">
            <label className={styles.label}>Institute <span className={styles.teal} style={{ fontWeight: '500' }} value={formData.name} onChange={handleChange}>Name</span></label><br/>
            <input type="text" className={styles.input} /><br/><br/>
            <label className={styles.label}>Current <span className={styles.teal} style={{ fontWeight: '500' }}  value={formData.year} onChange={handleChange}>Year</span></label><br/>
            <input type="text" className={styles.input} /><br/><br/>
            <label className={styles.label}>Your <span className={styles.teal} style={{ fontWeight: '500' }}  value={formData.stream} onChange={handleChange}>Stream</span></label><br/>
            <input type="text" className={styles.input} /><br/><br/>
            <button className={styles.button} onClick={handleSubmit}>UPDATE NOW</button>
          </form>
        </div>

        <img src="/cross.png" alt="404" className={styles.cross} />
        <img src="/cross.png" alt="404" className={`${styles.bottom} ${styles.bottom_cross}`} />

        { mobile && (
          <div className={`${styles.form_wrapper_mob} ${styles.wrapper_alt}`}>
            <p className={styles.p} style={{ color: '#ffff', fontWeight: '300', letterSpacing: '1px', textAlign: 'right' }}>COMPLETE YOUR <br/> <span style={{ fontSize: '24px', color: '#BA0E42' }} className={`${styles.teal} ${styles.bold}`}>Profile</span></p>
            <br/><br/>
            <form className={styles.form}>
                <label className={`${styles.label} ${styles.label_mob}`}>Institute <span className={styles.teal} style={{ fontWeight: '500' }}>Name</span></label><br/>
                <input type="text" className={styles.input} value={formData.name} onChange={handleChange} /><br/><br/>
                <label className={`${styles.label} ${styles.label_mob}`}>Current <span className={styles.teal} style={{ fontWeight: '500' }}>Year</span></label><br/>
                <input type="text" className={styles.input} value={formData.year} onChange={handleChange} /><br/><br/>
                <label className={`${styles.label} ${styles.label_mob}`}>Your <span className={styles.teal} style={{ fontWeight: '500' }}>Stream</span></label><br/>
                <input type="text" className={styles.input} value={formData.stream} onChange={handleChange} /><br/><br/>
                <button className={styles.button} onClick={handleSubmit}>UPDATE NOW</button>
            </form>
          </div>
        ) }

        </main>
    );
}