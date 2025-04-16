'use client';

import styles from "../../styles/contest/section1.module.css";
import Section2 from "./section2";
import Section3 from "./section3";
import Section4 from "../home/section3";
import { useState, useEffect } from "react";

export default function Section1() {
    return (
        <main className={styles.main}>

        <div className={`${styles.bar} ${styles.left}`}></div>
        <div className={`${styles.bar} ${styles.right}`}></div>

        <Section2 />
        <Section3 />
        <Section4 />

        <img className={styles.cross } src="/cross-verti.png" alt="404" />

        </main>
    );
}