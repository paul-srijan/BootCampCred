'use client';

import styles from "../../../styles/admin/bootcamp/section1.module.css";
import Section2 from "./section2";
import Section3 from "./section3";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";  

export default function Section1() {
    const router = useRouter();
    const [parsedData, setParsedData] = useState({});

    useEffect(() => {
        const userData = sessionStorage.getItem("userData");

        if (userData) {
            const data = JSON.parse(userData);
            if (data.role === 'admin') {
                setParsedData(data);
            } else {
                router.push('/');
            }
        } else {
            router.push('/');
        }
    }, []);

    return (
        <main className={styles.main}>

        <Section2 />
        <Section3 />

        </main>
    );
}