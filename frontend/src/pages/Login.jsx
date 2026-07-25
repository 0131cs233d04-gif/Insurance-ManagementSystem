import { useState} from "react";
import akt from "../assets/akt.png";
import health from "../assets/health.png";
import life from "../assets/life.png";
import car from "../assets/car.png";
import bike from "../assets/bike.png";
import home from "../assets/home.png";
import business from "../assets/business.png";
import personal from "../assets/personal.png";
import travel from "../assets/travel.png";
import term from "../assets/term.png";

import "./Login.css";
import {Link, useNavigate} from "react-router-dom";


     {/*--------------------------------------------------------------------------------------------------------*/}

function Login() {

    const [showLogin, setShowLogin] = useState(false);
    const [showPlan, setShowPlan] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    {/*--------------------------------------------------------------------------------------------------------*/}

    const handleLogin = async () => {
        console.log("Button Clicked");
        try {
            const response = await fetch("http://localhost:8080/api/user/login", {method: "POST", headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            });

            console.log("Status:", response.status);
            const result = await response.text();
            if (result === "Login Successful") {
                navigate("/dashboard");
            } else {
                alert(result);
            }
        } catch (error) {
            console.error(error);
            alert("Backend Connection Failed");
        }
    };


    {/*--------------------------------------------------------------------------------------------------------*/}



    const plans = [
        {
            id:1,
            title:"Health Insurance",
            premium:"₹500/month",
            description:"Cashless hospitalization"
        },
        {
            id:2,
            title:"Life Insurance",
            premium:"₹800/month",
            description:"Accident and theft cover"
        },
        {
            id:3,
            title:"Car Insurance",
            premium:"₹700/month",
            description:"Family financial protection"
        },
        {
            id:4,
            title:"Bike Insurance",
            premium: "₹400/month",
            description:"Two wheeler protection"
        },
        {
            id:5,
            title:"Home Insurance",
            premium: "₹900/month",
            description:"House and Property protection"
        },
        {
            id:6,
            title:"Business Insurance",
            premium: "₹1000/month",
            description:"Shop,Office And Business Assets Cove"
        },
        {
            id:7,
            title:"Personal Accident Insurance",
            premium: "₹500/month",
            description:"Accident,Disability,Injury cover"
        },
        {
            id:8,
            title:"Travel Insurance",
            premium: "₹500-2000/month",
            description:"Domestic and International Travel Cover "
        },
        {
            id:9,
            title:"Term Insurance",
            premium: "₹600/month",
            description:"Find Term Like Cover"
        },

    ];
    const [selectedPlan, setSelectedPlan] = useState(null);

    {/*--------------------------------------------------------------------------------------------------------*/}

    return (
        <div className="page" onClick={() => setShowLogin(false)}>
            <div  className="info-box1" onClick={(e) => e.stopPropagation()}>
                <h1>InsuraA</h1>
                <h2>Insurance is not just about protecting what you have,<br></br> it’s about securing the future you dream of.</h2>
            </div>

            <img id="img1" src={akt} alt="Image" />

            {/*--------------------------------------------------------------------------------------------------------*/}

            <div className="slider">

                <div className="slide">
                    <div className="panel" onMouseEnter={() => setSelectedPlan(plans[0])}>
                        <img src={health} alt="Health Insurance" className="panel-img" />
                    </div>

                    <div className="panel"  onMouseEnter={() => setSelectedPlan(plans[1])}>
                        <img src={life} alt="Life Insurance" className="panel-img" />
                    </div>

                    <div className="panel" onMouseEnter={() => setSelectedPlan(plans[2])}>
                        <img src={car} alt="Car Insurance" className="panel-img" />
                    </div>
                </div>

                <div className="slide">

                    <div className="panel" onMouseEnter={() => setSelectedPlan(plans[3])}>
                        <img src={bike} alt="Bike Insurance" className="panel-img" />
                    </div>

                    <div className="panel" onMouseEnter={() => setSelectedPlan(plans[4])}>
                        <img src={home} alt="Home Insurance" className="panel-img" />
                    </div>

                    <div className="panel" onMouseEnter={() => setSelectedPlan(plans[5])}>
                        <img src={business} alt="Business Insurance" className="panel-img" />
                    </div>

                </div>

                <div className="slide">

                    <div className="panel" onMouseEnter={() => setSelectedPlan(plans[6])}>
                        <img src={personal} alt="Personal Insurance" className="panel-img" />
                    </div>

                    <div className="panel" onMouseEnter={() => setSelectedPlan(plans[7])}>
                        <img src={travel} alt="Travel Insurance" className="panel-img" />
                    </div>
                    <div className="panel" onMouseEnter={() => setSelectedPlan(plans[8])}>
                        <img src={term} alt="Term Insurance" className="panel-img" />
                    </div>
                </div>

            </div>



            {/*--------------------------------------------------------------------------------------------------------*/}

            <div className="plan-details">

                {selectedPlan ? (
                    <>
                        <h1>{selectedPlan.title}</h1>
                        <h2>{selectedPlan.premium}</h2>
                        <p>{selectedPlan.description}</p>
                    </>
                ) : (
                    <h2>Hover any insurance plan</h2>
                )}

            </div>




            {/*--------------------------------------------------------------------------------------------------------*/}


            <button className="open-btn"
                onClick={(e) => {
                    e.stopPropagation();
                    setShowLogin(true);
                }}
            >
                Open Login
            </button>


            {/*--------------------------------------------------------------------------------------------------------*/}

            {showLogin && (
                <>
                    <div  className="info-box"
                          onClick={(e) => e.stopPropagation()}>
                        <h1>welcome</h1>
                        <h2>Client</h2>
                    </div>
                    
                    <div className="login-container" onClick={(e) => e.stopPropagation()}>
                    <h1>InsuraA</h1>
                    <h2>Insurance Management System</h2>

                    <label>Email</label>
                    <br />
                    <input type="email" placeholder="Enter Your Email"  value={email}
                           onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <label>Password</label>
                    <br />
                    <input type="password" placeholder="Enter Your Password"  value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <br />

                        {/*--------------------------------------------------------------------------------------------------------*/}

                    <button onClick={handleLogin}>Login</button>
                    <p>Don't have an account?
                        <Link to="/ClientRegister"> Register</Link>
                    </p>
                </div></>
            )}


            {/*--------------------------------------------------------------------------------------------------------*/}

            <div className="pan">
                <div className="panel1">Panel 10</div>
            </div>

            <div className="pan1">
                <div className="panel2">Panel 11</div>
            </div>



            {/*--------------------------------------------------------------------------------------------------------*/}


            <div className="plan-header">
                <h2>Plan</h2>
                <button
                    className="arrow-btn"
                    onClick={() => setShowPlan(!showPlan)}>
                    {showPlan ? "▲" : "▼"}
                </button>
            </div>

            {/*--------------------------------------------------------------------------------------------------------*/}
            <div className={`plan-panel ${showPlan ? "active" : ""}`}>
                <h2>Premium Plan</h2>
                <p>₹999 / Month</p>
                <p>Unlimited Insurance Support</p>
            </div>

            {/*--------------------------------------------------------------------------------------------------------*/}

        </div>
    );
}

export default Login;