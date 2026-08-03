import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PurchasePolicy.css";
import bgVideo from "../assets/190037-887039342.mp4";


function PurchasePolicy() {

    const { policyId } = useParams();
    const navigate = useNavigate();

    const [policy, setPolicy] = useState(null);
    const [customerId, setCustomerId] = useState(null);

    const [purchaseDate, setPurchaseDate] = useState("");
    const [policyStartDate, setPolicyStartDate] = useState("");
    const [policyEndDate, setPolicyEndDate] = useState("");
    const [paymentFrequency, setPaymentFrequency] = useState("MONTHLY");
    const [paymentStatus, setPaymentStatus] = useState("PAID");

    useEffect(() => {


        fetch(`https://insurance-managementsystem-production.up.railway.app/api/policies/${policyId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch policy");
                }
                return res.json();
            })
            .then((data) => {
                setPolicy(data);
            })
            .catch((err) => {
                console.error(err);
            });
        const userId = localStorage.getItem("userId");

        fetch(`https://insurance-managementsystem-production.up.railway.app/api/profile/${userId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Customer profile not found");
                }
                return res.json();
            })
            .then((data) => {
                console.log("CUSTOMER PROFILE:", data);
                setCustomerId(data.id);
            })
            .catch((err) => console.error(err));

    }, [policyId]);

    const handlePurchase = async () => {

        if (!purchaseDate || !policyStartDate || !policyEndDate) {
            alert("Please select all dates.");
            return;
        }

        try {
            if (!customerId) {
                alert("Please complete your profile first.");
                return;
            }

            const purchaseData = {

                customerId: customerId, // Testing
                policyId: policy.id,

                purchaseDate: purchaseDate,
                policyStartDate: policyStartDate,
                policyEndDate: policyEndDate,

                premiumAmount: policy.premiumAmount,

                paymentFrequency: paymentFrequency,
                paymentStatus: paymentStatus,

                policyStatus: "ACTIVE"

            };

            const response = await fetch(
                "https://insurance-managementsystem-production.up.railway.app/api/policy-purchases",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(purchaseData)
                }
            );

            if (!response.ok) {
                throw new Error("Purchase Failed");
            }

            const result = await response.json();

            console.log("Purchase Success:", result);

            alert("Policy Purchased Successfully!");

            // Reset Form
            setPurchaseDate("");
            setPolicyStartDate("");
            setPolicyEndDate("");
            setPaymentFrequency("MONTHLY");
            setPaymentStatus("PAID");

            // Redirect (Optional)
            navigate("/dashboard");

        } catch (error) {

            console.error(error);
            alert("Purchase Failed");

        }

    };

    if (!policy) {
        return <h2>Loading...</h2>;
    }

    const handlePurchasePolicy = async () => {

        const userId = localStorage.getItem("userId");

        try {

            const response = await fetch(
                `https://insurance-managementsystem-production.up.railway.app/api/profile/${userId}`
            );

            if (!response.ok) {
                alert("Please complete your profile first.");
                navigate("/complete-profile");
                return;
            }

            navigate("/");

        } catch (error) {

            console.error(error);
            alert("Unable to check profile.");

        }
    };

    return (
        <div className="purchase-container">
            <video
                className="bg-video"
                autoPlay
                loop
                muted
                playsInline
                src={bgVideo}
            />

            <button
                className="back-btn"
                onClick={() => navigate("/")}
            >
                ← Back
            </button>

            <button
                className="dashboard-btn"
                onClick={() => navigate("/dashboard")}
            >
                Dashboard
            </button>

            <h1>Purchase Policy</h1>



            <div className="policy-card">

                <h2>{policy.policyName}</h2>

                <p><b>Policy Number :</b> {policy.policyNumber}</p>

                <p><b>Premium :</b> ₹{policy.premiumAmount}</p>

                <p><b>Coverage :</b> ₹{policy.coverageAmount}</p>

                <p><b>Tenure :</b> {policy.tenure} Year</p>

                <p><b>Status :</b> {policy.status}</p>

            </div>

            <div className="purchase-form">

                <label>Purchase Date</label>
                <input
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                />

                <label>Policy Start Date</label>
                <input
                    type="date"
                    value={policyStartDate}
                    onChange={(e) => setPolicyStartDate(e.target.value)}
                />

                <label>Policy End Date</label>
                <input
                    type="date"
                    value={policyEndDate}
                    onChange={(e) => setPolicyEndDate(e.target.value)}
                />

                <label>Payment Frequency</label>
                <select
                    value={paymentFrequency}
                    onChange={(e) => setPaymentFrequency(e.target.value)}
                >
                    <option value="MONTHLY">MONTHLY</option>
                    <option value="QUARTERLY">QUARTERLY</option>
                    <option value="YEARLY">YEARLY</option>
                </select>

                <label>Payment Status</label>
                <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                >
                    <option value="PAID">PAID</option>
                    <option value="PENDING">PENDING</option>
                </select>

                <button onClick={handlePurchasePolicy}>
                    Purchase Policy
                </button>

            </div>

        </div>
    );
}

export default PurchasePolicy;