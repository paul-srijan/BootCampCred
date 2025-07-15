"use client";
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
    const [today, setToday] = useState('DAY 01');
    const [students, setStudents] = useState([]);
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
    // const [dataTopic, setDataTopic] = useState('');
    // const [subTopic, setSubTopic] = useState([]);
    const [isChecked, setIsChecked] = useState({});
    const [dsply, setDsply] = useState('none');
    const [bootcampID, setBootcampID] = useState(null);
    const [params, setParams] = useState([]);
    const [popupDelete, setPopupDelete] = useState('none');
    const [idInput, setIdInput] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectOpt, setSelectOpt] = useState('');
    const [showCoor, setShowCoor] = useState('none');
    const [showCoor1, setShowCoor1] = useState('none');

    async function handleAddCore() {
      if(selectOpt != '') {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post?action=coordinator&user_id=${selectOpt}&bootcamp_id=${bootcampID}`, {
          method: "POST"
        });

        if(response.ok) {
          const result = await response.json();
          setSelectOpt('');
          setShowCoor('none');
        } else {
          console.log("error occured.");
        }
      } catch(error) {
        console.log("an unexpected error occured: " + error);
      }
      
      } else {
        console.log("cannot submit form!");
      }
    }

      async function handleAddOutreach() {
      if(selectOpt != '') {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post?action=outreachCoordinator&user_id=${selectOpt}&bootcamp_id=${bootcampID}`, {
          method: "POST"
        });

        if(response.ok) {
          const result = await response.json();
          setSelectOpt('');
          setShowCoor1('none');
        } else {
          console.log("error occured.");
        }
      } catch(error) {
        console.log("an unexpected error occured: " + error);
      }
      
      } else {
        console.log("cannot submit form!");
      }
    }

    const subtopics = [
        {
          topic: "C",
          subtopic: [
            "Features & Applications of C", "Structure of a C Program", "if, else, and switch Statements",
            "Writing & Compiling First C Program", "Setting up C Environment (GCC, VS Code, Code::Blocks)", "Variables & Constants",
            "Data Types (int, float, char, double)", "Operators (Arithmetic, Logical, Relational, Bitwise)", "printf() and scanf() Functions", "printf() and scanf() Functions", "Type Conversions (Implicit & Explicit)",
            "Loops (for, while, do-while)", "break, continue, goto Statements", "Nested Loops", "Function Declaration & Definition"
          ]
        },
        {
          topic: "C++",
          subtopic: [
            "Introduction to C++", "Variables and Data Types", "Operators & Expressions",
            "Input/Output (cin, cout)", "Conditional Statements", "Switch Case",
            "Loops (for, while, do-while)", "Functions", "Function Overloading",
            "Default Arguments", "Recursion", "Arrays & Strings",
            "Pointers & References", "OOP Concepts", "Classes & Objects",
            "Constructors & Destructors", "Inheritance", "Polymorphism",
            "Virtual Functions", "Operator Overloading", "Templates",
            "Exception Handling", "File Handling", "STL (Vectors, Maps, Sets, Queues)"
          ]
        },
        {
          topic: "DSA with C",
          subtopic: [
            "Features & Applications of C", "Structure of a C Program", "if, else, and switch Statements",
            "Writing & Compiling First C Program", "Setting up C Environment (GCC, VS Code, Code::Blocks)", "Variables & Constants",
            "Data Types (int, float, char, double)", "Operators (Arithmetic, Logical, Relational, Bitwise)", "printf() and scanf() Functions", "printf() and scanf() Functions", "Type Conversions (Implicit & Explicit)",
            "Loops (for, while, do-while)", "break, continue, goto Statements", "Nested Loops", "Function Declaration & Definition"
          ]
        },
        {
          topic: "DSA with C++",
          subtopic: [
            "STL for DSA", "Vectors, Pairs & Maps", "Arrays & Strings", "Linked Lists",
            "Stacks & Queues", "Priority Queues & Heaps", "Trees & BST",
            "Trie Data Structure", "Graph Representation", "BFS & DFS",
            "Topological Sort", "Dijkstra & Floyd-Warshall", "Greedy Techniques",
            "Dynamic Programming", "Backtracking", "Sliding Window & Two Pointers",
            "Union Find & Disjoint Set", "Segment Trees", "Binary Search on Answers"
          ]
        },
        {
          topic: "Java",
          subtopic: [
            "Intro to Java & JVM", "Data Types & Variables", "Operators & Expressions",
            "Input/Output", "Conditional Statements", "Loops",
            "Functions & Methods", "Arrays & Strings", "Object-Oriented Programming",
            "Classes & Objects", "Constructors", "Inheritance", "Polymorphism",
            "Abstraction & Interfaces", "Exception Handling", "Multithreading",
            "Collections (List, Set, Map)", "File Handling", "Packages & Access Modifiers",
            "JDBC (Database Connectivity)", "Maven & Project Structure",
            "GUI with Swing/JavaFX"
          ]
        },
        {
          topic: "Python",
          subtopic: [
            "Introduction to Python", "Data Types & Variables", "Operators & Expressions",
            "Input/Output", "Conditional Statements", "Loops (for, while)",
            "Functions", "Recursion", "Strings, Lists, Tuples", "Dictionaries & Sets",
            "List Comprehensions", "Lambda, Map, Filter, Reduce", "Modules & Packages",
            "Exception Handling", "File Handling", "Intro to OOP in Python",
            "Decorators & Generators"
          ]
        },
        {
          topic: "AI and ML",
          subtopic: [
            "Intro to AI and ML", "Types of ML", "Python Libraries (NumPy, Pandas, Matplotlib)",
            "Data Cleaning & Preprocessing", "Exploratory Data Analysis",
            "Supervised Learning", "Unsupervised Learning", "Regression Models",
            "Classification Models", "Clustering Algorithms", "Model Evaluation Metrics",
            "Cross Validation", "Hyperparameter Tuning", "Scikit-learn Pipelines",
            "Intro to Neural Networks", "Deployment with Streamlit/Flask"
          ]
        },
        {
          topic: "Full Stack",
          subtopic: [
            "HTML Basics & Forms", "CSS Layouts & Grid", "Responsive Design",
            "JavaScript Fundamentals", "DOM Manipulation", "JS Functions, Loops, Events",
            "Form Validation", "Intro to PHP", "PHP Syntax & Variables",
            "PHP + MySQL CRUD", "Sessions & Cookies", "Authentication in PHP",
            "Database Schema Design", "File Upload & Handling", "Contact Form & Email",
            "Deployment with cPanel"
          ]
        },
        {
          topic: "MERN Stack",
          subtopic: [
            "MongoDB Basics", "Schema & Modeling", "Mongoose ORM",
            "Express.js Basics", "Routing & Middleware", "RESTful APIs",
            "Node.js Core Modules", "Authentication with JWT", "React Fundamentals",
            "React Hooks & Context", "Form Handling", "React Routing", "Axios & API Integration",
            "Redux Toolkit", "Connecting React with Node APIs", "MERN Project Structure",
            "Deployment with Render/Vercel"
          ]
        },
        {
          topic: "Android Dev",
          subtopic: [
            "Intro to Android & Android Studio", "Activity Lifecycle",
            "UI Design using XML", "RecyclerView & Adapter",
            "Intents & Navigation", "Permissions & Manifest",
            "Data Storage (SharedPrefs, Room DB)", "Retrofit & API Calls",
            "Firebase Integration", "Authentication & Realtime DB",
            "Push Notifications", "Material UI Components",
            "Publishing App to Play Store"
          ]
        },
        {
          topic: "Web and AI",
          subtopic: [
            "HTML/CSS/JS Refresher", "Calling AI APIs from JavaScript",
            "TensorFlow.js for On-Page AI", "Speech-to-Text Integration",
            "Chatbot Integration (Dialogflow, GPT API)", "Face/Emotion Detection",
            "Recommendations Using AI", "Python AI Flask API with Web",
            "Integrating ML Models in Web UI", "Webhooks and Real-Time Feedback"
          ]
        },
        {
          topic: "Django",
          subtopic: [
            "Django Setup & Project Structure", "Creating & Managing Apps",
            "Models & ORM", "Admin Panel Customization", "Forms & Views",
            "URL Configuration", "Static & Media Files", "Authentication System",
            "Django Templates", "Django REST Framework", "Serializers & Viewsets",
            "CORS & JWT Auth", "Deployment on Heroku/Render", "Environment Variables"
          ]
        },
        {
          topic: "Generative AI",
          subtopic: [
            "Intro to Generative AI", "Language Models (GPT, LLaMA, Claude)",
            "Prompt Engineering", "Text Generation", "Image Generation (DALL·E, SD)",
            "Music & Audio Generation", "Video Generation Tools", "Fine-tuning LLMs",
            "Responsible & Ethical AI", "Business Applications of Gen AI"
          ]
        },
        {
          topic: "AI Agents",
          subtopic: [
            "What are AI Agents?", "LangChain Architecture", "Agent Types (Tool-Using, Memory)",
            "LLM + Tools (Code, Browser, Math)", "Building Custom Agents",
            "Action Execution Planning", "Tool Calling in OpenAI API", "Multi-Agent Systems",
            "Chaining Agents", "Security & Limitations"
          ]
        },
        {
          topic: "Cloud Development",
          subtopic: [
            "Cloud Concepts & Models", "IaaS vs PaaS vs SaaS", "Virtualization & Containers",
            "AWS Core Services (EC2, S3, Lambda)", "GCP Core Services", "Azure Basics",
            "Compute & Storage", "Cloud Networking", "Identity & Access Management (IAM)",
            "Cloud Databases", "Monitoring & Logging", "CI/CD in Cloud", "Serverless Architecture",
            "Cloud Security Best Practices", "Cost Optimization", "Deployment & Hosting"
          ]
        }
    ];

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
        }
    // };
    
    const [duration, setDuration] = useState(0);

    async function handlePopup(id) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get?action=bootcamp&id=${id}`);
  
        if (response.ok) {
          const result = await response.json();
          setId(id);
          setDuration(result.duration);

        } else {
          console.log("An error occurred while fetching bootcamp.");
        }
      } catch (error) {
        console.log("Fetch error:", error);
      }
    
      setPopup('block');
    }

    async function handleDayUpdate() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/put?action=update_bootcamp&id=${id}&parameter=today&value=${today}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          const result = await response.json();
          window.location.reload();
        } else {
          console.log("An unexpected ERROR occurred!");
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    }    

    async function handleUpdate(e) {
        try {
         if(entry.value != ""){
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
         }else{
            alert("Value cannot be empty");
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
        } else {
            handleSearch();
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
                router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/get?action=data_to_excel&id=${id}`);
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

    const handleDelete = async () => {
      if(id == idInput) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/delete?action=delete_bootcamp&id=${idInput}`, {
            method: 'DELETE',
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
      } else {
        console.log("ids do not match!");
      }
  }

  const [arr, setArr] = useState([]);
  const [topic, setTopic] = useState('');

async function handleOptionUpdate(topic, id) {
  setTopic(topic);
  setBootcampID(id);

  const matched = subtopics.find(item => item.topic === topic);
  const matchedBootcamp = data.find(item => item.id === id);

  if (matched) {
    const subList = matched.subtopic; // contains `[comma]`
    const selected = matchedBootcamp.subtopics; // contains `[comma]`

    setArr(subList); // we can show as-is for UI
    setParams(selected); // directly store for submission

    const initialChecked = {};

subList.forEach((item, idx) => {
  const sanitizedItem = item.replace(/,/g, '[comma]');
  const checkboxName = `checkbox_${sanitizedItem}_${idx}`;

  // Sanitize both sides to be consistent
  const isSelected = selected.includes(sanitizedItem);

  initialChecked[checkboxName] = isSelected;
});

console.log(initialChecked);

    setIsChecked(initialChecked);
  }

  setShowPopup('block');
}

    async function updateExams(topic, bootcamp_id, params) {
      const id = topic == "DSA with C" ? "c_programming" : "";
      const subtopics = params.join('/');

      console.log(id);
      console.log(bootcamp_id);
      console.log(subtopics);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get?action=questions&bootcamp_id=${bootcamp_id}&topics=${subtopics}&id=${id}`);
            const result = await response.json();

            console.log(result);
            // window.location.reload();
        } catch(error) {
            console.log("an error occured : " + error);
        }
    }

  async function handleTopicUpdate(e) {
  e.preventDefault();
  console.log(topic);

  try {
    // Step 1: Sanitize each subtopic by replacing commas to avoid backend split issues
    const sanitizedParams = params.map(item => item.replace(/,/g, '[comma]'));

    // Step 2: Join using comma (since backend likely does .split(','))
    const dataString = encodeURIComponent(sanitizedParams.join(','));

    // Step 3: Pass it directly in the query (single encoding only)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post?action=subtopics&id=${bootcampID}&data=${dataString}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      updateExams(topic, bootcampID, params); // original array, still intact
    } else {
      console.log("An error occurred!");
    }
  } catch (error) {
    console.log("Error submitting subtopics: " + error);
  }
}


function handleCheck(e) {
  const { name, value, checked } = e.target;

  // Restore actual value by replacing [comma] with ,
  const actualValue = value.replace(/\[comma\]/g, ','); // convert encoded back

  // Update checkbox UI state
  setIsChecked(prev => ({
    ...prev,
    [name]: checked
  }));

  // Update params with restored values
  setParams(prev => {
    const set = new Set(prev);
    if (checked) {
      set.add(actualValue);
    } else {
      set.delete(actualValue);
    }
    return Array.from(set);
  });
}

    const fetchStudentData = async (bootcamp) => {
        try {

          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get?action=user_by_id&id=${bootcamp}`);

          if(response.ok) {
            const result = await response.json();
            setStudents(result.length == 0 ? [] : result);
          } else {
            console.log("an unexpected error occured!");
          }
          } catch (error) {
            console.error("Error fetching student data:", error);
          }
      };

  const roleMap = {
    N: "Participant",
    C: "Core Coordinator",
    O: "Outreach Coordinator",
  };

  const getRolesFromIds = (certificateString) => {
    return Array.from(
      new Set(
        certificateString
          .split(',')
          .map(id => roleMap[id.split('_')[1]])
          .filter(Boolean)
      )
    );
  };

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
                <th className={styles.whitespace}>Data No</th>
                <th className={styles.whitespace}>Bootcamp ID</th>
                <th className={styles.whitespace}>Bootcamp Name</th>
                <th className={styles.whitespace}>Topic</th>
                <th className={styles.whitespace}>Sub Topics</th>
                <th className={styles.whitespace}>Host Name</th>
                <th className={styles.whitespace}>Event Date</th>
                <th className={styles.whitespace}>Current Day</th>
                <th className={styles.whitespace}>Bootcamp Status</th>
                <th className={styles.whitespace}>Update</th>
                <th className={styles.whitespace}>Certification</th>
            </tr>
            </thead>
            <tbody>
            {renderData.map((item, index) => (
            <tr key={index}>
                <td className={styles.whitespace}>{index + 1}</td>
                <td style={{ textAlign: "left" }}><img className={styles.trash} onClick={() => {setPopupDelete("block"); setId(item.id);}} src="/trash.png" /> {item.id}</td>
                <td className={styles.whitespace} onClick={() => {setDsply('block'); setBootcampID(item.id); fetchStudentData(item.id); }}>{item.name} <img src="/open-eye.png" className={styles.dropdown} style={{ width: '20px', height: '20px', marginBottom: '-4px', cursor: 'pointer' }} /></td>
                <td className={styles.whitespace}>{item.topic}</td>
                <td className={styles.whitespace}>
                    <button className={styles.view} onClick={() => handleOptionUpdate(item.topic, item.id)}>VIEW</button>
                </td>
                <td className={styles.whitespace}>{item.host_name}</td>
                <td className={styles.whitespace}>{item.date_from}</td>
                <td onClick={() => handlePopup(item.id)} style={{ cursor: "pointer" }}>{item.today && (
                  <>
                  <span>{item.today}</span>
                  <img src="/down-icon.png" className={styles.dropdown} />
                  </>
                )}</td>
                <td className={styles.whitespace}>
                    <div className={styles.text_wrapper}>
                        <p style={{ cursor: 'pointer' }} onClick={() => {setShowSts('block'); setId(item.id);}}>{item.bootcamp_status && (
                          <>
                          <span>{item.bootcamp_status}</span>
                          <img src="/down-icon.png" className={styles.dropdown} />
                        </>
                      )}</p>
                    </div>
                </td>
                <td className={styles.whitespace}>
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
                <td className={styles.whitespace}>
                    <button className={`${styles.button}`} style={{ padding: '8px 12px', backgroundColor: '#449e48', borderRadius: '6px', color: '#fefefe' }} onClick={(e) => handleSuccess(e, item.id)}>Generate</button>
                </td>
            </tr>
            ))}
            </tbody>
            </table>
            </div>

            {/* popup to update value of multiple parameters at a time */}
            <div className={styles.popup} style={{ display: `${show}` }}>
                <img src="/close.png" className={styles.close} onClick={() => setShow('none')} />
                <label className={styles.label}>Bootcamp Id:</label><br/><br/>
                <input type="text" className={styles.input} name="id" value={id} onChange={(e) => setId(e.target.value)} /><br/><br/>
                <label className={styles.label}>Parameter:</label><br/><br/>
                <select className={`${styles.select} ${styles.custom_select}`} onChange={handleParamChange} id="parameter" name="parameter">
                    <option value="today" >Bootcamp Day</option>
                    <option value="host_name">Host Name</option>
                    <option value="name">Name</option>
                    <option value="topic">Topic</option>
                </select><br/><br/>
                <label className={styles.label}>Value:</label><br/><br/>
                <input type="text" className={styles.input} name="value" onChange={handleChange1} /><br/><br/>
                <button className={`${styles.btn} ${styles.button}`} onClick={() => handleUpdate()}>UPDATE</button>
            </div>
            {/* popup to update value of multiple parameters at a time */}

            {/* popup to update bootcamp status */}
            <div className={styles.popup} style={{ display: `${showSts}` }}>
                <img src="/close.png" className={styles.close} onClick={() => setShowSts('none')} />
                <label className={styles.label}>Update Status:</label><br/><br/>
                <select className={`${styles.select} ${styles.custom_select}`} onChange={(e) => setStatus(e.target.value)} id="parameter" name="parameter">
                    <option value=""  defaultValue>Select An Option</option>
                    <option value="Pending">Pending</option>
                    <option value="On Going">On Going</option>
                    <option value="Done">Done</option>
                </select><br/><br/>
                <button className={`${styles.btn} ${styles.button}`} onClick={() => handleStsUpdate(id)}>UPDATE</button>
            </div>
            {/* popup to update bootcamp status */}

            {/* popup to update Bootcamp Day */}
            <div className={`${styles.popup}`} style={{ display: `${popup}` }}>
                <img src="/close.png" className={styles.close} onClick={() => setPopup('none')} />
                <label className={styles.label}>Select Bootcamp Day:</label><br/><br/>
                <select
                  className={`${styles.select} ${styles.custom_select}`}
                  onChange={(e) => setToday(e.target.value)}
                  id="today"
                  name="today"
                >
                  {[...Array(duration)].map((_, index) => {
                    const dayNumber = String(index + 1).padStart(2, '0');
                    return (
                      <option key={index} value={`DAY ${dayNumber}`}>
                        DAY {dayNumber}
                      </option>
                    );
                  })}
                </select><br/><br/>
                <button className={`${styles.btn} ${styles.button}`} onClick={() => handleDayUpdate(today)}>UPDATE</button>
            </div>
            {/* popup to update Bootcamp Day */}

            <div className={`${styles.popup}`} style={{ display: `${success}`, justifyContent: 'center', alignItems: 'center' }}>
                <img src="/close.png" className={styles.close} onClick={() => setSuccess('none')} />
                { loading == true && (<img className={`${styles.gif} ${styles.tick_small}`} src="/checkmark-unscreen.gif" alt="gif" />) }
                <p className={styles.text} style={{ color: '#fefefe', fontWeight: '400', fontSize: '16px'}}>{message}</p>
            </div>

            {/* Popup for Deleting Bootcamp */}
            <div className={`${styles.popup}`} style={{ display: `${popupDelete}`, justifyContent: 'center', alignItems: 'center' }}>
              <img src="/close.png" className={styles.close} onClick={() => {setPopupDelete('none'); setShowForm(false); setIdInput('');}} />
              <br/>
              { showForm == false ? (
              <>
              <label className={styles.label}>Are you sure you want to delete this bootcamp?</label><br/><br/>
              <div className={styles.btn_container}>
              <button className={`${styles.btn_new} ${styles.confirm}`} onClick={() => setShowForm(true)}>Yes</button>
              <button className={`${styles.btn_new} ${styles.delete}`} onClick={() => setPopupDelete("none")}>No</button>
              </div>
              </>
              ) : (
                <>
                <label className={styles.label}>Bootcamp ID:</label><br/><br/>
                <input type="text" className={styles.input} onChange={(e) => setIdInput(e.target.value)} value={idInput} name="bootcamp_id" id="bootcamp_id" /><br/><br/>
                <button className={`${styles.btn} ${styles.button}`} style={{ opacity: (id == idInput ? "1" : "0.45" ), backgroundColor: "#BA0E42", color: "#fefefe", cursor: (id == idInput ? "pointer" : "context-menu" ) }} onClick={handleDelete} disabled={ id == idInput ? false : true }>DELETE</button>
                </>
              ) }
            </div>
            {/* Popup for Deleting Bootcamp */}

            <div className={`${styles.popup} ${styles.window}`} style={{ display: `${showPopup}` }}>
                <img src="/close.png" className={styles.close} onClick={() => setShowPopup('none')} />
                <div className={styles.question_wrapper}>
                <h1 className={styles.h} style={{ fontSize: '28px' }}>{topic}</h1>
                <form className={styles.popupForm} method="POST">
                {arr.map((item, idx) => {
                  // const checkboxName = `checkbox_${item}_${idx}`;
                    const sanitizedItem = item.replace(/,/g, '[comma]');
                    const checkboxName = `checkbox_${sanitizedItem}_${idx}`;

                  return (
                    <div
                      key={checkboxName}
                      className={styles.question}
                    >
                    <p>{item.replace(/\[comma\]/g, ',')}</p>
                    <input
                        type="checkbox"
                        name={checkboxName}
                        value={sanitizedItem}
                        className={styles.checkbox}
                        checked={isChecked[checkboxName] || false}
                        onChange={handleCheck}
                      />
                      <br/>
                    </div>
                  );
                })}
                <br/>
                <button className={styles.button} style={{ padding: '10px 18px', borderRadius: '8px' }} onClick={handleTopicUpdate}>UPDATE</button><br/><br/>
                </form>
                </div>
            </div>

            {/* popup for displaying students */}
            <div className={`${styles.popup} ${styles.table}`} style={{ display: `${dsply}` }}>
              <img src="/close.png" className={styles.close} style={{ width: "28px", height: "28px" }} onClick={() => {setDsply('none'); setStudents([]);}} />
              <div className={styles.btn_wrapper}>
                <p className={styles.heading} style={{ color: "#fefefe", fontSize: "20px", marginRight: "16px" }}>View Students</p>
                <button className={`${styles.add_btn} ${styles.coor}`} onClick={() => setShowCoor('block')}>Add Coordinator</button>
                <button className={`${styles.add_btn} ${styles.outreach}`} onClick={() => setShowCoor1('block')}>Add Outreach Coordinator</button>
              </div><br/>
            <div className={`${styles.container} ${styles.table_wrapper}`}>
            <table>
            <thead>
            <tr>
                <th className={styles.th}>Sl No.</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Bootcamp ID</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Phone Number</th>
                <th className={styles.th}>Roles</th>
            </tr>
            </thead>
            <tbody>
            {students.length !== 0 ? (
              students.map((item, index) => {
                const roles = getRolesFromIds(item.certificate_id);

                return (
                  <tr key={index}>
                    <td className={styles.td}>{index+1}</td>
                    <td className={styles.td}>{item.full_name}</td>
                    <td className={styles.td}>{item.bootcamp_id}</td>
                    <td className={styles.td}>{item.email}</td>
                    <td className={styles.td}>{item.phone_number}</td>
                    <td className={styles.td}>
                      <div className={styles.role_div}>
                        {roles.join(', ')}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6">No User Data Found!</td>
              </tr>
            )}
            </tbody>
            </table>
            </div>
            </div>

            {/* popup to update core coordinators */}
            <div className={`${styles.popup} ${styles.popup_new}`} style={{ display: `${showCoor}` }}>
                <img src="/close.png" className={styles.close} onClick={() => {setShowCoor('none'); fetchStudentData(bootcampID);}} />
                <label className={styles.label}>Add New Coordinator :</label><br/><br/>
                <select className={styles.select_} onChange={(e) => setSelectOpt(e.target.value)}>
                  <option disable="true">Choose Student</option>
                  {students.map((item, idx) => (
                    <option key={idx} value={item.user_id}>{item.full_name}</option>
                  ))}
                </select><br/><br/>
                <button className={`${styles.btn} ${styles.button}`} onClick={handleAddCore}>ADD</button>
            </div>
            {/* popup to update core coordinators */}

            {/* popup to update outreach coordinators */}
            <div className={`${styles.popup} ${styles.popup_new}`} style={{ display: `${showCoor1}` }}>
                <img src="/close.png" className={styles.close} onClick={() => {setShowCoor1('none')}} />
                <label className={styles.label}>Add Outreach Coordinator :</label><br/><br/>
                <select className={styles.select_} onChange={(e) => setSelectOpt(e.target.value)}>
                  <option disable="true">Choose Student</option>
                  {students.map((item, idx) => (
                    <option key={idx} value={item.user_id}>{item.full_name}</option>
                  ))}
                </select><br/><br/>
                <button className={`${styles.btn} ${styles.button}`} onClick={handleAddOutreach}>ADD</button>
            </div>
            {/* popup to update outreach coordinators */}              
        </main>
    );
}