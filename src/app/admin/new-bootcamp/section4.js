'use client';

import styles from "../../../styles/admin/bootcamp/section4.module.css";
import { useState, useEffect } from "react";

export default function Section4() {
    const [formData, setFormData] = useState({
        name: '',
        topic: '',
        host_name: '',
        fdate: '',
        tdate: '',
        status: 'Pending'
    });

    const handleChange = (e) => {
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
  
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post?action=createBootcamp&name=${formData.name}&topic=${formData.topic}&host_name=${formData.host_name}&fdate=${formData.fdate}&tdate=${formData.tdate}&status=${formData.status}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
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

    return (
        <main className={styles.main}>
        <p className={`${styles.heading} ${styles.m_left}`}>Add New Bootcamp</p>
        <form className={styles.form}>
        <label className={styles.label} forhtml="bootcamp-name">Bootcamp Name</label><br/><br/>
        <input className={styles.input} type="text" id="bootcamp-name" name="name" value={formData.name} onChange={handleChange} required /><br/><br/>

        <label className={styles.label} forhtml="bootcamp-topic">Bootcamp Topic</label><br/><br/>
        <input className={styles.input} type="text" id="bootcamp-topic" name="topic" value={formData.topic} onChange={handleChange} required /><br/><br/>

        <label className={styles.label} forhtml="host-name">Host Name</label><br/><br/>
        <input className={styles.input} type="text" id="host-name" name="host_name" value={formData.host_name} onChange={handleChange} required /><br/><br/>

        <label className={styles.label}>Event Date From</label><br/><br/>
        <input className={`${styles.input} ${styles.custom_date_picker}`} onChange={handleChange} type="date" id="event-date" name="fdate" value={formData.fdate} style={{ paddingRight: '16px' }} required /><br/><br/>

        <label className={styles.label}>Event Date To</label><br/><br/>
        <input className={`${styles.input} ${styles.custom_date_picker}`} onChange={handleChange} type="date" id="event-date" name="tdate" value={formData.tdate} style={{ paddingRight: '16px' }} required /><br/><br/>

        <button type="submit" className={styles.btn} style={{ float: 'right' }} onClick={handleSubmit}>Submit</button>
        </form>
        </main>
    );
}