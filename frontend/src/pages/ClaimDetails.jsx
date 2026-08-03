import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ClaimDetails.css";

function ClaimDetails() {

    const { id } = useParams();
    const [claim, setClaim] = useState(null);

    useEffect(() => {
        fetch(`https://insurance-managementsystem-production.up.railway.app/api/claims/${id}`)
            .then((res) => res.json())
            .then((data) => setClaim(data))
            .catch((err) => console.error("Error:", err));
    }, [id]);

    if (!claim) {
        return (
            <div className="loading">
                <h2>Loading Claim Details...</h2>
            </div>
        );
    }


    return (
        <div className="claim-details-container">

            <div className="claim-card">

                <h2>Claim Details</h2>

                <div className="details-grid">

                    <div className="detail-item">
                        <span>Claim Number</span>
                        <p>{claim.claimNumber}</p>
                    </div>

                    <div className="detail-item">
                        <span>Customer</span>
                        <p>
                            {claim.customer.user.firstName}{" "}
                            {claim.customer.user.lastName}
                        </p>
                    </div>

                    <div className="detail-item">
                        <span>Email</span>
                        <p>{claim.customer.user.email}</p>
                    </div>

                    <div className="detail-item">
                        <span>Phone</span>
                        <p>{claim.customer.phone}</p>
                    </div>

                    <div className="detail-item">
                        <span>Policy</span>
                        <p>{claim.policyPurchase.policy.policyName}</p>
                    </div>

                    <div className="detail-item">
                        <span>Policy Number</span>
                        <p>{claim.policyPurchase.policy.policyNumber}</p>
                    </div>

                    <div className="detail-item">
                        <span>Claim Type</span>
                        <p>{claim.claimType}</p>
                    </div>

                    <div className="detail-item">
                        <span>Incident Date</span>
                        <p>{claim.incidentDate}</p>
                    </div>

                    <div className="detail-item">
                        <span>Claim Date</span>
                        <p>{claim.claimDate}</p>
                    </div>

                    <div className="detail-item">
                        <span>Claim Amount</span>
                        <p>₹{claim.claimedAmount}</p>
                    </div>

                    <div className="detail-item">
                        <span>Approved Amount</span>
                        <p>₹{claim.approvedAmount}</p>
                    </div>

                    <div className="detail-item">
                        <span>Status</span>
                        <p className="status">{claim.status}</p>
                    </div>

                    <div className="detail-item">
                        <span>Verification</span>
                        <p>{claim.verificationStatus}</p>
                    </div>

                    <div className="detail-item">
                        <span>Assigned Agent</span>
                        <p>{claim.assignedAgent}</p>
                    </div>

                    <div className="detail-item">
                        <span>Payment Status</span>
                        <p>{claim.paymentStatus}</p>
                    </div>

                    <div className="detail-item">
                        <span>Settlement Date</span>
                        <p>{claim.settlementDate}</p>
                    </div>

                    <div className="detail-item full-width">
                        <span>Remarks</span>
                        <p>{claim.remarks}</p>
                    </div>

                </div>

                <div className="btn-area">
                    <Link to="/claims">
                        <button className="back-btna">
                            ← Back to Claims
                        </button>
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default ClaimDetails;