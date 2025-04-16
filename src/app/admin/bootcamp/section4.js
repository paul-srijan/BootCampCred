'use client';

import styles from "../../../styles/admin/bootcamp/section4.module.css";
import { useState, useEffect } from "react";
import _debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';

export default function Section4() {
    const router = useRouter();

    const [option, setOption] = useState('');
    const [display, setDisplay] = useState('none');
    const [show, setShow] = useState('none');
    const [popup, setPopup] = useState('none');
    const [showPopup, setShowPopup] = useState('none');
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [id, setId] = useState('');
    const [showSts, setShowSts] = useState('none');
    const [entry, setEntry] = useState({
        id: id,
        parameter: '',
        value: ''
    });

    const [questions, setQuestions] = ([]);
    const [status, setStatus] = useState('');
    const [renderData, setRenderData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('none');
    const [message, setMessage] = useState('');

    const getData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get?action=bootcamps`);
            const result = await response.json();
    
            console.log(result);
            setData(result);
            setRenderData(result);
        } catch(error) {
            console.log("an error occured : " + error);
        }
    };
    
    const getDataDebounced = _debounce(() => getData(), 300);
        
    useEffect(() => {
        getDataDebounced();
        return () => getDataDebounced.cancel();
    }, [router.asPath]);

    const handleSearch = () => {
        const value = searchTerm.toLowerCase();
        const filtered = data.filter(item =>
          item[option]?.toString().toLowerCase().includes(value)
        );

        setRenderData(filtered.length ? filtered : data);
    };

    const handleChange = (e) => {
        setOption(e.target.value);
        if(e.target.value == '') {
            setDisplay('none');
        } else {
            setDisplay('flex');
        }
    };

    const handleParamChange = (e) => {
        const value = e.target.value;
        setStatus(value); 
        setEntry((prevEntry) => ({
          ...prevEntry,
          parameter: value
        }));
    };    

    async function handlePopup(id) {
        try {
            const response = await fetch(``);
            const result = response.json();
    
            setQuestions(result);
            setPopup('block');
        } catch(error) {
            console.log("an error occured : " + error);
        }
        setPopup('block');
    }

    async function handleUpdate() {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/put?action=update_bootcamp&id=${entry.id}&parameter=${entry.parameter}&value=${entry.value}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            window.location.reload();
          } else {
            console.error('Failed to submit entry:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error submitting entry:', error);
        }
    }

    async function handleStsUpdate(id) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/put?action=update_bootcamp&id=${id}&parameter=bootcamp_status&value=${status}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            window.location.reload();
          } else {
            console.error('Failed to submit entry:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Error submitting entry:', error);
        }
    }

    function handleKeyUp() {
        if(searchTerm == '') {
            setRenderData(data);
        }
    }

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setEntry((prevEntry) => ({
          ...prevEntry,
          [name]: value
        }));
    };

    const handleSuccess = async (e, id) => {
        e.preventDefault();

        setSuccess('flex');
        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get?action=certificate&bootcamp_id=${id}`);
      
            if (response.ok) {
              console.log('entry submitted successfuly!');

              setTimeout(() => {
                setLoading(false);
                setMessage('Certificate successfully generated!');
              }, 3000);
            } else {
              console.error('Failed to submit entry:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('Error submitting entry:', error);
          }
    }

    return (
        <main className={styles.main}>
            <div className={styles.filter}>
                <div className={styles.flexbox}>
                <p className={styles.txt}>Filter by :</p>
                <select className={styles.select} style={{ padding: '0px 12px' }} onChange={handleChange}>
                    <option className={styles.option} value="">Choose a Criteria</option>
                    <option className={styles.option} value="id">Bootcamp ID</option>
                    <option className={styles.option} value="date_from">Bootcamp Date</option>
                    <option className={styles.option} value="topic">Bootcamp Topic</option>
                    <option className={styles.option} value="host_name">Hostname</option>
                </select>
                </div>
                <div className={styles.search_bar} style={{ display: `${display}` }}>
                    <input type="text" onKeyUp={handleKeyUp} className={styles.searchbar} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <img onClick={handleSearch} src="/search.png" className={styles.icon} />
                </div>
            </div>
            <p className={styles.heading}>Manage Bootcamp</p>
            <div className={styles.container}>
            <table>
            <thead>
            <tr>
                <th>Data No</th>
                <th>Bootcamp ID</th>
                <th>Bootcamp Name</th>
                <th>Topic</th>
                <th>View Details</th>
                <th>Host Name</th>
                <th>Event Date</th>
                <th>Bootcamp Status</th>
                <th>Update</th>
                <th>Certification</th>
            </tr>
            </thead>
            <tbody>
            {renderData.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td onClick={() => setShowPopup('block')} style={{ cursor: 'pointer' }}>{item.topic}</td>
                <td>
                    <button className={styles.view} onClick={(e) => handlePopup(e.target.value)}>VIEW</button>
                </td>
                <td>{item.host_name}</td>
                <td>{item.date_from}</td>
                <td>
                    <div className={styles.text_wrapper}>
                        <p style={{ cursor: 'pointer' }} onClick={() => {setShowSts('block'); setId(item.id);}}>{item.bootcamp_status}</p>
                    </div>
                </td>
                <td>
                <div className={styles.text_wrapper}>
                        <p>Edit</p>
                        <img 
                            src="/edit.png"
                            className={styles.edit} 
                            onClick={() => {
                                setShow('block');
                                setId(item.id);
                                setEntry((prev) => ({ ...prev, id: item.id }));
                              }}
                        />
                    </div>
                </td>
                <td>
                    <button className={`${styles.button}`} style={{ padding: '8px 12px', backgroundColor: '#5FD9E7', borderRadius: '6px', color: '#1b1b1b' }} onClick={(e) => handleSuccess(e, item.id)}>Generate</button>
                </td>
            </tr>
            ))}
            </tbody>
            </table>
            </div>

            <div className={styles.popup} style={{ display: `${show}` }}>
                <img src="/close.png" className={styles.close} onClick={() => setShow('none')} />
                <label className={styles.label}>Bootcamp Id:</label><br/><br/>
                <input type="text" className={styles.input} name="id" value={id} onChange={(e) => setId(e.target.value)} /><br/><br/>
                <label className={styles.label}>Parameter:</label><br/><br/>
                <select className={`${styles.select} ${styles.custom_select}`} onChange={handleParamChange} id="parameter" name="parameter">
                    <option value=" "  defaultValue>Select An Option</option>
                    <option value="host_name">Host Name</option>
                    <option value="name">Name</option>
                    <option value="topic">Topic</option>
                </select><br/><br/>
                <label className={styles.label}>Value:</label><br/><br/>
                <input type="text" className={styles.input} name="value" onChange={handleChange1} /><br/><br/>
                <button className={`${styles.btn} ${styles.button}`} onClick={() => handleUpdate()}>UPDATE</button>
            </div>

            <div className={styles.popup} style={{ display: `${showSts}` }}>
                <img src="/close.png" className={styles.close} onClick={() => setShowSts('none')} />
                <label className={styles.label}>Update Status:</label><br/><br/>
                <select className={`${styles.select} ${styles.custom_select}`} onChange={(e) => setStatus(e.target.value)} id="parameter" name="parameter">
                    <option value=" "  defaultValue>Select An Option</option>
                    <option value="Pending">Pending</option>
                    <option value="On Going">On Going</option>
                    <option value="Done">Done</option>
                </select><br/><br/>
                <button className={`${styles.btn} ${styles.button}`} onClick={() => handleStsUpdate(id)}>UPDATE</button>
            </div>

            <div className={`${styles.popup} ${styles.window}`} style={{ display: `${popup}` }}>
                <img src="/close.png" className={styles.close} onClick={() => setPopup('none')} />
                {questions && questions.map((item, index) => (
                <div className={styles.question_wrapper} key={index}>
                <h1 className={styles.h}>DAY 01</h1>
                <p className={styles.question}>1. What is the full form of HTML?</p>
                <p className={styles.options}>A. Hyper Text Markup Language, B. High Tech Machine Learning, C. Hyperlink and Text Management Language, D. Home Tool Management Language</p>
                </div>
                ))}
            </div>

            <div className={`${styles.popup}`} style={{ display: `${success}`, justifyContent: 'center', alignItems: 'center' }}>
                <img src="/close.png" className={styles.close} onClick={() => setSuccess('none')} />
                { loading == true && (<img className={`${styles.gif} ${styles.tick}`} src="/tick.gif" alt="gif" />) }
                <p className={styles.text} style={{ color: '#fefefe', fontWeight: '400', fontSize: '16px'}}>{message}</p>
            </div>

            <div className={`${styles.popup} ${styles.window}`} style={{ display: `${showPopup}` }}>
                <img src="/close.png" className={styles.close} onClick={() => setShowPopup('none')} />
                <div className={styles.question_wrapper}>
                <h1 className={styles.h} style={{ fontSize: '28px' }}>DSA</h1>
                <div className={styles.question} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
                    <p>Introduction to C</p>
                    <input type="checkbox" className={styles.checkbox} />
                </div><br/>
                <div className={styles.question} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
                    <p>Data Types & Variables</p>
                    <input type="checkbox" className={styles.checkbox} />
                </div><br/>
                <div className={styles.question} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
                    <p>Data Types & Variables</p>
                    <input type="checkbox" className={styles.checkbox} />
                </div><br/>
                <div className={styles.question} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
                    <p>Data Types & Variables</p>
                    <input type="checkbox" className={styles.checkbox} />
                </div><br/>
                <button className={styles.button} style={{ padding: '10px 18px', borderRadius: '8px' }}>UPDATE</button>
                </div>
            </div>
        </main>
    );
}