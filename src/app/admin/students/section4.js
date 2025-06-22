"use client";
import styles from "../../../styles/admin/bootcamp/section4.module.css";
import { useState, useEffect } from "react";
import _debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';

export default function Section4() {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [parsedID, setParsedID] = useState({});
        
    useEffect(() => {
        const userID = sessionStorage.getItem("userData");
    
        if (userID) {
            const data = JSON.parse(userID);
            setParsedID(data);
        }
    }, []);

    useEffect(() => {
        if (parsedID.length === 0) return;

        const fetchStudentData = async () => {
            try {
                const results = await Promise.all(
                    parsedID.map(async (id) => {
                        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}`);

                        if(res.ok) {
                            return res.json();
                        } else {
                            console.log("an error occured!");
                        }
                    })
                );
                
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudentData();
    }, []);
    
    // const getDataDebounced = _debounce(() => getData(), 300);
        
    // useEffect(() => {
    //     getDataDebounced();
    //     return () => getDataDebounced.cancel();
    // }, [router.asPath]);

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
                <th>Roles</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
            <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.id}</td>
                <td>{item.roles}</td>
            </tr>
            ))}
            </tbody>
            </table>
            </div>
        </main>
    );
}