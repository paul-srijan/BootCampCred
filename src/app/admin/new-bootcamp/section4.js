"use client";
import styles from "../../../styles/admin/bootcamp/section4.module.css";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';

export default function Section4() {
    const router = useRouter();
    const initialFormData = {
      name: '',
      topic: '',
      host_name: '',
      fdate: '',
      tdate: '',
      status: 'Pending' 
    }
    const [formData, setFormData] = useState(initialFormData);
    const [display, setDisplay] = useState('none');
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    function convertDateFormat(date) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        console.log("Invalid date format. Please use yyyy-mm-dd.");
      }
    
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    }

    const handleChange = (e) => {
        setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    }

    const handleChange1 = (e) => {
      setFormData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }
  
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedFDate = convertDateFormat(formData.fdate);
        const formattedTDate = convertDateFormat(formData.tdate);
  
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post?action=createBootcamp&name=${formData.name}&topic=${formData.topic}&host_name=${formData.host_name}&fdate=${formattedFDate}&tdate=${formattedTDate}&status=${formData.status}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            setFormData(initialFormData);

            setTimeout(() => {
              setLoading(false);
              setLoading2(true);

              setTimeout(() => {
                setLoading2(false);
                router.push('/admin/bootcamp');
              }, 3000);
            }, 2000);

          } else {
            console.error('Failed to submit entry:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error submitting entry:', error);
        }
    }

    return (
        <main className={styles.main}>
        { loading == true ? (
          <div className={styles.gif_wrapper}>
          <img className={styles.gif} src="/red-loader.gif" alt="gif" />
          </div>
        ) : (
          loading2 == true ? (
          <div className={styles.gif_wrapper}>
          <img className={`${styles.gif} ${styles.tick}`} src="/checkmark-unscreen.gif" alt="gif" />
          </div>
          ) : (
            <>
            <p className={`${styles.heading} ${styles.m_left}`}>Add New Bootcamp</p>
            <div className={styles.success} style={{ display: `${display}` }}>New Bootcamp Successfully Created!</div>
            <form className={styles.form}>
            <label className={styles.label} forhtml="bootcamp-name">Bootcamp Name</label><br/><br/>
            <input className={styles.input} type="text" id="bootcamp-name" name="name" value={formData.name} onChange={handleChange} required /><br/><br/>
    
            <label className={styles.label} forhtml="bootcamp-topic">Bootcamp Topic</label><br/><br/>
            <select type="text" className={`${styles.input} ${styles.select}`} name="topic" value={formData.topic} onChange={handleChange}>
              <option value="C" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>C</option>
              <option value="C++" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>C++</option>
              <option value="DSA with C" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>DSA using C</option>
              <option value="DSA with C++" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>DSA using C++</option>
              <option value="Java" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Java</option>
              <option value="Python" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Python</option>              
              <option value="AI and ML" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>AI & ML</option>
              <option value="Full Stack" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Full Stack</option>
              <option value="MERN Stack" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>MERN Stack</option>
              <option value="Android Dev" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Android Dev</option>
              <option value="Web and AI" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Web & AI</option>
              <option value="Django" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Django</option>
              <option value="Generative AI" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Generative AI</option>
              <option value="AI Agents" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>AI Agents</option>
              <option value="Cloud Development" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>Cloud Development</option>
              <option value="UI and UX" className={styles.input} style={{ backgroundColor: '#1b1b1b', paddingRight: '16px' }}>UI and UX</option> 
            </select><br/><br/>
    
            <label className={styles.label} forhtml="host-name">Host Name</label><br/><br/>
            <input className={styles.input} type="text" id="host-name" name="host_name" value={formData.host_name} onChange={handleChange} required /><br/><br/>
    
            <label className={styles.label}>Event Date From</label><br/><br/>
            <input className={`${styles.input} ${styles.custom_date_picker}`} onChange={handleChange} type="date" id="event-date" name="fdate" value={formData.fdate} style={{ paddingRight: '16px' }} required /><br/><br/>
    
            <label className={styles.label}>Event Date To</label><br/><br/>
            <input className={`${styles.input} ${styles.custom_date_picker}`} onChange={handleChange} type="date" id="event-date" name="tdate" value={formData.tdate} style={{ paddingRight: '16px' }} required /><br/><br/>
    
            <button className={styles.btn} style={{ float: 'right' }} onClick={(e) => {setLoading(true); handleSubmit(e);}}>Submit</button>
            </form>
            </>
          )
        ) }
        </main>
    );
}