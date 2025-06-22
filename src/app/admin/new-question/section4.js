"use client";
import styles from "../../../styles/admin/bootcamp/section4.module.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';

export default function Section4() {
    const Router = useRouter();
    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);

    // useEffect(()=> {
    //   const anim = Lottie.loadAnimation({
    //     container: animationContainer.current,
    //     renderer: 'svg',
    //     loop: true,
    //     autoplay: true,
    //     path: '/animation.json'
    //   });

    //   return () => {
    //     anim.destroy();
    //   };
    // }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setTimeout(() => {
                    setLoading(false);
                    Router.push('admin/new-question');
                }, 3000);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <main className={styles.main}>
            { loading == true ? (
            <>
            <img className={styles.gif} src="/red-loader.gif" alt="gif" />
            </>
            ) : (
            <>
            <p className={`${styles.heading} ${styles.m_left}`}>Add New Question Set</p>
            <form className={styles.form} style={{ marginTop: '54px' }} onSubmit={handleSubmit}>
                <label className={`${styles.label} ${styles.label_}`} htmlFor="question">Upload CSV:</label><br/><br/>
                <input type="file" className={styles.input} style={{ background: 'transparent' }} onChange={handleFileChange} /><br/><br/>
                <button type="submit" className={styles.btn} onClick={(e) => {setLoading(true); handleSubmit(e);}}>Submit</button>
            </form>
            </>
            ) }
        </main>
    );
}