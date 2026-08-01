import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PolicyDetails.css";

function PolicyDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [purchase, setPurchase] = useState(null);
    const renewPolicy = async () => {

        try {

            const response = await fetch(
                `http://localhost:8080/api/policy-purchases/${id}/renew`,
                {
                    method: "PUT"
                }
            );

            const result = await response.text();

            alert(result);

            window.location.reload();

        } catch (error) {

            console.error(error);
            alert("Failed to Renew Policy");

        }
    };

    const cancelPolicy = async () => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this policy?"
        );

        if (!confirmCancel) return;

        try {

            const response = await fetch(
                `http://localhost:8080/api/policy-purchases/${id}/cancel`,
                {
                    method: "PUT"
                }
            );

            const result = await response.text();

            alert(result);

            window.location.reload();

        } catch (error) {

            console.error(error);
            alert("Failed to Cancel Policy");
        }
    };


    useEffect(() => {

        fetch(`http://localhost:8080/api/policy-purchases/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPurchase(data);
            })
            .catch((err) => console.error(err));

    }, [id]);

    if (!purchase) {
        return <h2>Loading...</h2>;
    }





    return (

        <div className="policy-details">

            <div className="details-header">

                <h1>Policy Details</h1>

                <button onClick={() => navigate("/my-policies")}>
                    ← Back
                </button>

            </div>

            <div className="details-card">

                <p><strong>Policy Number :</strong> {purchase.policy.policyNumber}</p>

                <p><strong>Policy Name :</strong> {purchase.policy.policyName}</p>

                <p><strong>Premium :</strong> ₹{purchase.policy.premiumAmount}</p>

                <p><strong>Coverage :</strong> ₹{purchase.policy.coverageAmount}</p>

                <p><strong>Tenure :</strong> {purchase.policy.tenure} Year</p>

                <p><strong>Purchase Date :</strong> {purchase.purchaseDate}</p>

                <p><strong>Start Date :</strong> {purchase.policyStartDate}</p>

                <p><strong>End Date :</strong> {purchase.policyEndDate}</p>

                <p><strong>Status :</strong> {purchase.policyStatus}</p>

            </div>

            <div className="action-buttons">

                <button
                    className="renew-btn"
                    onClick={renewPolicy}
                >
                    Renew Policy
                </button>

                <button
                    className="cancel-btn"
                    onClick={cancelPolicy}
                >
                    Cancel Policy
                </button>

            </div>

        </div>

    );
}

export default PolicyDetails;