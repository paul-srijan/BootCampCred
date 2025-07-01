"use client";
import styles from "../../../styles/admin/bootcamp/section1.module.css";
import Section2 from "./section2";
import Section3 from "./section3";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export default function Section1() {
    const router = useRouter();

    useEffect(() => {
        if(getCookie('userRole')) {
        const role = getCookie('userRole');
    
        if (role != 'admin') {
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