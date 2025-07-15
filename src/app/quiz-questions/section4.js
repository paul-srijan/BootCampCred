'use client';

import styles from "../../styles/quiz-question/section4.module.css";
import { useState, useEffect } from "react";
import _debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export default function Section4() {
    const router = useRouter();

    const [parsed, setParsed] = useState({});
    const [question, setQuestion] = useState([]); // holds all questions
    const [userAnswers, setUserAnswers] = useState({}); // answers by question ID
    const [active, setActive] = useState(0); // current question index

        useEffect(() => {
            if(getCookie('userRole')) {
            const role = getCookie('userRole');
        
            if (role != 'student') {
              router.push('/');
            } 
          } else {
            router.push('/');
          }
        }, []);
    
      useEffect(() => {
        const storedData = sessionStorage.getItem('userData');
    
        if (storedData) {
          // console.log(storedData);
            const parsedData = JSON.parse(storedData);
    
            console.log(parsedData.bootcamps);
            setParsed(parsedData);
            getData(parsedData.bootcamps);
        }
      }, []);

    const handleAnswerSelect = (questionId, selectedOption) => {
    setUserAnswers(prev => ({
        ...prev,
        [questionId]: selectedOption
    }));
    };

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const submitScore = async () => {
  let score = 0;

  question.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctAnswer) {
      score += 1;
    }
  });

  const date = getCurrentDate();
  const userId = parsed?.user_id || 'guest';

  console.log("Final Score:", score);
  console.log("User ID:", userId);
  console.log("Date:", date);

  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/put?action=result_update&id=${userId}&date=${date}&result=${score}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    router.push('/points');
  } catch (error) {
    console.error("Error submitting score:", error);
  }
};

    const handleNext = (e) => {
  e.preventDefault();

  if (!userAnswers[active]) {
    alert("Please select an answer before proceeding.");
    return;
  }

  if (active < question.length - 1) {
    setActive(prev => prev + 1);
  } else {
    submitScore();
  }
};

    const getData = async (id) => {
        console.log(id);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get?action=fetch_questions&id=${id}`);
            const result = await response.json();

            console.log(result.questions);
            setQuestion(result.questions);
        } catch(error) {
            console.log("an error occured : " + error);
        }
    };

    return (
        <main className={styles.main}>
        <img src="/group.png" alt="404" className={styles.blob} />

        <div className={styles.form_wrapper}>
            {/* <div className={styles.number_div}>
                {question.map((item, idx) => (
                    <div key={idx} className={`${styles.circle} ${idx === active ? styles.circle_active : ""}`} onClick={() => handleChange(idx)}>{idx + 1}</div>
                ))}
            </div> */}
{question.length > 0 && (
  <>
    <h1 className={styles.question}>{question[active].question}</h1>

    <form className={styles.form} onSubmit={handleNext}>
      {question[active].options.map((option, idx) => {
        const optionId = `q${active}-opt${idx}`;
        return (
          <div className={styles.input_wrapper} key={optionId}>
            <input
              className={styles.radio}
              type="radio"
              id={optionId}
              name={`mcq-${active}`}
              value={option}
              checked={userAnswers[active] === option}
              onChange={() => handleAnswerSelect(active, option)}
            />
            <label className={styles.label} htmlFor={optionId}>
              <p className={styles.option}>{option}</p>
            </label>
            <br />
          </div>
        );
      })}

      <br /><br />
      <button type="submit" className={styles.btn}>
        {active < question.length - 1 ? "NEXT" : "SUBMIT"}
      </button>
    </form>
  </>
)}

        </div>
        </main>
    );
}