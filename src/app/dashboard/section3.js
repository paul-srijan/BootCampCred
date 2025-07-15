'use client';

import styles from "../../styles/contest/section3.module.css";
import { useState, useEffect } from "react";
import _debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';

export default function Section3() {
    const router = useRouter();
    const [task, setTask] = useState([]);
    const [date, setDate] = useState('');
    const [duration, setDuration] = useState(0);
    const [today, setToday] = useState('');
    const [show, setShow] = useState('none');
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const [userId, setUserId] = useState('');
    const [topic, setTopic]= useState('');

    // useEffect(() => {
    //     const userData = sessionStorage.getItem("userData");

    //     if (userData) {
    //         const data = JSON.parse(userData);
    //         setUserId(data.user_id);
    //     }
    // }, []);

    function getCurrentDate() {
        const d = new Date();
        const currDate = d.toISOString().split("T")[0]; // Returns YYYY-MM-DD format
        setDate(date);
    }

    const getDataDebounced = _debounce((bootcampId) => {
        getBootcamp(bootcampId);
      }, 300);
    
      // ✅ Bootcamp fetch function
      async function getBootcamp(bootcampId) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get?action=bootcamp&id=${bootcampId}`);
    
          if (response.ok) {
            const result = await response.json();

          // const quizDetails = {
          //   bootcamp_id: result.data.id,
          //   id: result.data.topic == "DSA with C" ? "c_programming" : "",
          //   topics: Array.isArray(result.data.subtopics)
          //     ? result.data.subtopics.join('/')
          //     : String(result.data.subtopics).split(',').join('/')
          // };

          // sessionStorage.setItem('quizDetails', JSON.stringify(quizDetails));
            setDuration(result.duration);
            setToday(result.data.today);
          } else {
            console.log("An error occurred while fetching bootcamp.");
          }
        } catch (error) {
          console.log("Fetch error:", error);
        }
      }

      
    
      // // ✅ useEffect to load on page view
      useEffect(() => {
        const userData = sessionStorage.getItem("userData");
    
        if (userData) {
          const parsed = JSON.parse(userData);
          console.log(parsed.bootcamps);
    
          if (parsed.role === 'student') {
            const bootcampId = parsed.bootcamps;
            getDataDebounced(bootcampId);
          } else {
            router.push('/');
          }
        } else {
          router.push('/');
        }
    
        return () => getDataDebounced.cancel();
      }, []);

      async function handleSubmit(e) {
        e.preventDefault();

        try{
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post?action=bootcamp_register&user_id=${userId}&id=${id}`, {
            method: "POST",
        });

          if(response.ok) {
            window.location.reload();
          } else {
            const result = await response.json();
            setError(result);
          }
        } catch(error) {
          console.log("an error occured: " + error);
        }
      }

    return (
        <main className={styles.main}>
            <div className={styles.bg}><p className={styles.text}>C<br/>O<br/>M<br/>P<br/>I<br/>L<br/>E<br/>X<br/></p></div>
            <div className={styles.container}>
            <div className={styles.left_text}>
                <p className={styles.p}>THE QUEST FOR <span className={`${styles.teal} ${styles.bold}`}>SKILL AWAITS</span></p>
                <p className={styles.medium}>LET THE</p>
                <div className={styles.flexbox}>
                <p className={styles.big}>BATTLE BEGIN</p>
                </div>
            </div>
            {/* <button className={styles.pulseBtn} onClick={() => setShow('flex')}>JOIN A BOOTCAMP</button> */}
            <div className={styles.wrapper}>
                {[...Array(duration)].map((_, idx) => (
                  <div className={styles.box} key={idx}>
                    <button onClick={() => router.push('/quiz-questions')} className={styles.btn} disabled={today != `DAY ${String(idx + 1).padStart(2, '0')}`} style={{ cursor: today == `DAY ${String(idx + 1).padStart(2, '0')}` ? "pointer" : "context-menu" }}>TASK {String(idx + 1).padStart(2, '0')}</button>
                    <p className={styles.para}>COMPLETE DAY {String(idx + 1).padStart(2, '0')} TASK TO EARN A <span className={styles.red}>POINT</span></p>
                  </div>
                ))}
            </div>
            </div>
            <img src="/circle.png" alt="404" className={styles.circle} />

            <div className={`${styles.popup}`} style={{ display: `${show}` }}>
              <div className={styles.alert} style={{ display: error != '' ? 'flex' : 'none' }}>{ error }</div>
              <label className={styles.label}>Enter Bootcamp ID:</label><br/>
              <img src="/close.png" className={styles.close} alt="404" onClick={() => setShow('none')} />
              <input type="text" className={styles.input} spellCheck="false" onChange={(e) => setId(e.target.value)} />
              <button className={styles.button} onClick={handleSubmit}>JOIN NOW</button>
            </div>
        </main>
    );
}