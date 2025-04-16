// Node V.22

'use client';

import styles from "../../styles/points/section4.module.css";
import { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Section4() {
    const componentRef = useRef(null);
    const [display, setDisplay] = useState('block')
    const [show, setShow] = useState('none');
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState(false);
    const [result, setResult] = useState({});

    useEffect(() => {
        setUsername("Sayantan Dey");
    }, []);
    
    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: "Certificate",
    });

    async function handleMobilePrint() {
        const element = componentRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
    
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
        pdf.save("Certificate.pdf")
    }

    useEffect(() => {
        const checkIsMobile = () => {
          setMobile(window.innerWidth <= 601);
        };

        checkIsMobile();
    
        window.addEventListener('resize', checkIsMobile);
    
        return () => {
          window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    const checkSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get?action=verify_certificate&id=${id}`)

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setResult(result);
                setShow('flex');
            } else {
                setResult(result);
                console.error('Failed to submit entry:', result.error);
            }
        } catch(error) {
            console.log("an error occured : " + error);
        }
    }

    return (
        <main className={styles.main}>

            <div className={styles.overlay} style={{ display: `${show}` }}>
            <img src="/close.png" className={styles.close} alt="404" onClick={() => setShow('none')} />
            <div ref={componentRef} className={styles.certificate}>
            <img
                src="./certificate.png"
                alt="Certificate Background"
                className={styles.background}
            />
            <div className={styles.content}>
            <h2 className={styles.username}>{result.name && result.name}</h2>
            <p className={styles.para}>{result.message && result.message}</p>
            </div>
            </div>

            <button
            className={styles.downloadButton}
            onClick={ mobile == true ? handleMobilePrint : handlePrint }
            >
                Download PDF
            </button>
                </div>

                <div className={styles.container}>
                <div className={styles.left}></div>
                <div className={styles.right}>
    
                <div className={styles.form1} style={{  display: `${display}`, paddingRight: '16px' }}>
                <p className={styles.medium} style={{ fontSize: '24px' }}>VERIFY YOUR</p>
                <div className={styles.bg} style={{ width: '294px', marginLeft: 'calc(100% - 274px)' }}><div className={styles.text}>CERTIFICATE</div></div>
                <div className={styles.form_wrapper} style={{ marginRight: '-20px' }}>
                <form className={styles.form} method="POST">
                    <label className={styles.label}>Enter <span className={styles.teal} style={{ fontWeight: '500' }}>UNIQUE CODE</span></label><br/>
                    <input type="email" className={styles.input} value={id} onChange={(e) => setId(e.target.value)} spellCheck="false" /><br/><br/>
                    <button className={styles.button} onClick={(e) => checkSubmit(e)}>CHECK NOW</button>
                </form>
                </div>
                </div>
    
                </div>
                </div>
        </main>
    );
}