'use client';

import styles from "../../styles/quiz-question/section4.module.css";
import { useState, useEffect } from "react";
import _debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';

export default function Section4() {
    const router = useRouter();
    const [datas, setDatas] = useState([]);
    const [active, setActive] = useState(0);
    const [question, setQuestion] = useState({});

    const getData = async () => {
        try {
            const response = await fetch(``);
            const result = await response.json();

            setDatas(result);
            setQuestion(result[0]);
        } catch(error) {
            console.log("an error occured : " + error);
        }
    };

    const getDataDebounced = _debounce(() => getData(), 300);
    
    useEffect(() => {
        getDataDebounced();
        return () => getDataDebounced.cancel();
    }, [router.asPath]);

    const handleChange = (index) => {
        setActive(index);
        setQuestion(datas[index]);
    }

    return (
        <main className={styles.main}>
        <img src="/group.png" alt="404" className={styles.blob} />

        <div className={styles.form_wrapper}>
            <div className={styles.number_div}>
                {/* {datas.map((item, idx) => (
                    <div key={idx} className={`${styles.circle} ${idx === active ? styles.circle_active : ""}`} onClick={() => handleChange(idx)}>{idx + 1}</div>
                ))} */}
            </div>
        <h1 className={styles.question}>
        What is the time complexity of searching an element in a balanced binary search tree?
        </h1><br/><br/>
        <form className={styles.form}>
            <div className={styles.input_wrapper}>
            <input className={styles.radio} type="radio" id="option1" name="mcq" value="O(n)" />
            <label className={styles.label} htmlFor="option1">
                <p className={styles.option}>O(n)</p>
            </label>
            </div>
            <br />

            <div className={styles.input_wrapper}>
            <input className={styles.radio} type="radio" id="option2" name="mcq" value="O(log n)" />
            <label className={styles.label} htmlFor="option2">
                <p className={styles.option}>O(log n)</p>
            </label>
            </div>
            <br />

            <div className={styles.input_wrapper}>
            <input className={styles.radio} type="radio" id="option3" name="mcq" value="O(n log n)" />
            <label className={styles.label} htmlFor="option3">
                <p className={styles.option}>O(n log n)</p>
            </label>
            </div>
            <br />

            <div className={styles.input_wrapper}>
            <input className={styles.radio} type="radio" id="option4" name="mcq" value="O(1)" />
            <label className={styles.label} htmlFor="option4">
                <p className={styles.option}>O(1)</p>
            </label>
            </div>
            <br /><br />

            <button type="submit" className={styles.btn}>NEXT</button>
        </form>
        </div>
        </main>
    );
}