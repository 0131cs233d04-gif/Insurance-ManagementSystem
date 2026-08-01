
import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
    const [policies, setPolicies] = useState([]);
    const [claims, setClaims] = useState([]);
    const [premiums, setPremiums] = useState([]);
    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {

        const userId = localStorage.getItem("userId");

        fetch(`http://localhost:8080/api/policy-purchases/user/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPolicies(data);
            })
            .catch((err) => console.error(err));

        fetch(`http://localhost:8080/api/claims/user/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Claims:", data);
                setClaims(data);
            })
            .catch((err) => console.error(err));

        fetch(`http://localhost:8080/api/premium/user/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Premiums:", data);
                setPremiums(data);
            })
            .catch((err) => console.error(err));

        fetch(`http://localhost:8080/api/documents/user/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Documents:", data);
                setDocuments(data);
            })
            .catch((err) => console.error(err));


    }, []);
    return (
        <div className="dashboard">

            <header className="header">
                <div>
                    <h1>Insurance Dashboard</h1>
                    <p>Welcome Back 👋</p>
                </div>




            </header>
            <div className="buttonpan">
            <button className="profile-btn"  onClick={() => navigate("/profile")} >
                My Profile
            </button>
            <button
                className="policy-btn"
                onClick={() => navigate("/my-policies")}
            >
                My Policies
            </button>

            <button className="profile-btn"
                onClick={()=>navigate("/claims")}>
                My Claims
            </button>

            <Link to="/submit-claim">
                <button class="profile-btn">Submit Claim</button>
            </Link>

            <button
                className="purchase-btn"
                onClick={() => navigate("/")}
            >
                Purchase Policy
            </button>

            </div>


            <div className="cards">

                <div className="card">
                    <h3>Active Policies</h3>
                    <h2>{policies.length}</h2>
                </div>

                <div className="card">
                    <h3>Pending Claims</h3>
                    <h2>{claims.filter(claim => claim.status === "PENDING").length}</h2>
                </div>

                <div className="card">
                    <h3>Premium Due</h3>
                    <h2>{premiums.length}</h2>
                </div>

                <div className="card">
                    <h3>Documents</h3>
                    <h2>{documents.length}</h2>
                </div>

            </div>

            <div className="section">
                <h2>My Policies</h2>

                <table>
                    <thead>
                    <tr>
                        <th>Policy No</th>
                        <th>Policy Name</th>
                        <th>Status</th>
                        <th>Expiry</th>
                    </tr>
                    </thead>

                    <tbody>
                    {policies.map((purchase) => (
                        <tr key={purchase.id}>
                            <td>{purchase.policy.policyNumber}</td>
                            <td>{purchase.policy.policyName}</td>
                            <td>{purchase.policyStatus}</td>
                            <td>{purchase.policyEndDate}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>

            <div className="section1">
                <h2>Recent Claims</h2>

                <table>
                    <thead>
                    <tr>
                        <th>Claim ID</th>
                        <th>Policy</th>
                        <th>Status</th>
                    </tr>
                    </thead>

                    <tbody>
                    {claims.map((claim) => (
                        <tr key={claim.id}>
                            <td>{claim.claimNumber}</td>
                            <td>{claim.policyPurchase.policy.policyName}</td>
                            <td>{claim.status}</td>
                        </tr>
                    ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
}

export default Dashboard;