import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyClaims.css";

function MyClaims() {

    const [claims, setClaims] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchClaims();
    }, []);

    const fetchClaims = async () => {
        try {
            const userId = localStorage.getItem("userId");

            const response = await fetch(`http://localhost:8080/api/claims/user/${userId}`);

            const data = await response.json();

            console.log("MY CLAIMS:", data);

            if (Array.isArray(data)) {
                setClaims(data);
            } else if (data) {
                setClaims([data]);
            } else {
                setClaims([]);
            }

        } catch (error) {

            console.error("Error fetching claims:", error);

        }
    };

    const getStatusClass = (status) => {

        switch (status) {
            case "APPROVED":
                return "approved";

            case "REJECTED":
                return "rejected";

            case "PENDING":
                return "pending";

            default:
                return "";
        }

    };



    return (


        <div className="claims-container">

            <button className="back" onClick={() => navigate("/dashboard")}> Back </button>

            <h2>My Claims</h2>

            <table className="claims-table">

                <thead>

                <tr>
                    <th>Claim No</th>
                    <th>Claim Type</th>
                    <th>Claim Date</th>
                    <th>Claim Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>

                </thead>

                <tbody>

                {claims.length > 0 ? (

                    claims.map((claim) => (

                        <tr key={claim.id}>
                            <td>{claim.claimNumber}</td>
                            <td>{claim.claimType}</td>
                            <td>{claim.claimDate}</td>
                            <td>₹ {claim.claimedAmount}</td>
                            <td>
                <span className={getStatusClass(claim.status)}>
                    {claim.status}
                </span>
                            </td>
                            <td>
                                <button
                                    className="view-btn"
                                    onClick={() => navigate(`/claim-details/${claim.id}`)}
                                >
                                    View
                                </button>
                            </td>
                        </tr>

                    ))

                ) : (

                    <tr>
                        <td colSpan="6">No Claims Found</td>
                    </tr>

                )}

                </tbody>





            </table>

        </div>
    );

}

export default MyClaims;