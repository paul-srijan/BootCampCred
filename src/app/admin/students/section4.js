'use client';

import styles from "../../../styles/admin/bootcamp/section4.module.css";
import { useState, useEffect } from "react";
import _debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';

export default function Section4() {
    const router = useRouter();

    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const response = await fetch(``);
            const result = await response.json();
    
            setData(result);
        } catch(error) {
            console.log("an error occured : " + error);
        }
    };
    
    const getDataDebounced = _debounce(() => getData(), 300);
        
    useEffect(() => {
        getDataDebounced();
        return () => getDataDebounced.cancel();
    }, [router.asPath]);

    return (
        <main className={styles.main}>
            <p className={styles.heading}>Classroom 2.0</p>
            <div className={styles.container}>
            <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Bootcamp ID</th>
                <th>Points Earned</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
            <tr key={index}>
                <td>{item.code}</td>
                <td>{item.classroom}</td>
                <td>{item.subject}</td>
                <td>{item.teacher}</td>
                <td>{item.date}</td>
            </tr>
            ))}
            </tbody>
            </table>
            </div>
        </main>
    );
}