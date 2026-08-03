import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPolicies.css";

function MyPolicies() {

    const [policies, setPolicies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        fetch(`https://insurance-managementsystem-production.up.railway.app/api/policy-purchases/user/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPolicies(data);
            })
            .catch((err) => console.error(err));

    }, []);




    return (
        <div className="my-policies">
            <div cl>
                <button
                    className="back-btn1"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>
            </div>

            <div className="header">

                <h1>My Policies</h1>

            </div>


            <table className="policy-table">

                <thead>

                <tr>
                    <th>Policy Number</th>
                    <th>Policy Name</th>
                    <th>Premium</th>
                    <th>Coverage</th>
                    <th>Status</th>
                    <th>Expiry Date</th>
                    <th>Action</th>
                </tr>

                </thead>

                <tbody>

                {policies.length > 0 ? (

                    policies.map((purchase) => (

                        <tr key={purchase.id}>

                            <td>{purchase.policy.policyNumber}</td>

                            <td>{purchase.policy.policyName}</td>

                            <td>₹{purchase.policy.premiumAmount}</td>

                            <td>₹{purchase.policy.coverageAmount}</td>

                            <td
                                className={
                                    purchase.policyStatus === "ACTIVE"
                                        ? "status-active"
                                        : "status-cancelled"
                                }
                            >
                                {purchase.policyStatus}
                            </td>

                            <td>{purchase.policyEndDate}</td>

                            <td>

                                <button
                                    className="view-btn"
                                    onClick={() =>
                                        navigate(`/policy/${purchase.id}`)
                                    }
                                >
                                    View Details
                                </button>

                            </td>

                        </tr>

                    ))

                ) : (

                    <tr>

                        <td colSpan="7">
                            No Policies Found
                        </td>

                    </tr>

                )}

                </tbody>

            </table>

        </div>
    );
}

export default MyPolicies;