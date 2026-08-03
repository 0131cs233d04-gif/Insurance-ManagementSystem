import { useEffect, useState } from "react";
import "./SubmitClaims.css";


function SubmitClaim() {

    const [policies, setPolicies] = useState([]);
    const [customerId, setCustomerId] = useState(null);

    const [formData, setFormData] = useState({
        policyPurchaseId: "",
        claimType: "",
        incidentDate: "",
        claimedAmount: "",
        remarks: ""
    });

    const [files, setFiles] = useState([]);

    useEffect(() => {

        const userId = localStorage.getItem("userId");

        console.log("SUBMIT CLAIM USER ID:", userId);

        // User ki policies
        fetch(`https://insurance-managementsystem-production.up.railway.app/api/policy-purchases/user/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("USER POLICIES:", data);
                setPolicies(data);
            })
            .catch((err) => console.error(err));


        // User ka CustomerProfile
        fetch(`https://insurance-managementsystem-production.up.railway.app/api/profile/${userId}`)
            .then((res) => {

                if (!res.ok) {
                    throw new Error("Profile not found");
                }

                return res.json();
            })
            .then((data) => {

                console.log("CLAIM CUSTOMER PROFILE:", data);

                setCustomerId(data.id);

            })
            .catch((err) => {
                console.error("PROFILE ERROR:", err);
            });

    }, []);



    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {


        e.preventDefault();
        if (!customerId) {
            alert("Please complete your profile first.");
            return;
        }

        const claimData = {

            customerId: customerId,

            policyPurchaseId: Number(formData.policyPurchaseId),

            claimNumber: "CLM" + Date.now(),

            claimType: formData.claimType,

            incidentDate: formData.incidentDate,

            claimDate: new Date().toISOString().split("T")[0],

            claimedAmount: Number(formData.claimedAmount),

            remarks: formData.remarks

        };

        try {

            const response = await fetch("https://insurance-managementsystem-production.up.railway.app/api/claims", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(claimData)

            });

            if (response.ok) {
                const savedClaim = await response.json();


                const form = new FormData();

                form.append("customerId", String(customerId));

                form.append("policyPurchaseId", formData.policyPurchaseId);
                form.append("claimId", savedClaim.id);

                form.append("documentName", "Claim Document");
                form.append("documentType", "CLAIM");


                for (let i = 0; i < files.length; i++) {

                    form.set("file", files[i]);

                    const docResponse = await fetch("https://insurance-managementsystem-production.up.railway.app/api/documents", {
                        method: "POST",
                        body: form
                    });

                    if (!docResponse.ok) {
                        const error = await docResponse.text();
                        console.log(error);
                        alert("Document Upload Failed");
                        return;
                    }

                }

                alert("Claim Submitted Successfully");

                setFormData({

                    policyPurchaseId: "",
                    claimType: "",
                    incidentDate: "",
                    claimedAmount: "",
                    remarks: ""

                });

                setFiles([]);

            } else {

                alert("Failed to Submit Claim");

            }

        } catch (error) {

            console.error(error);

            alert("Server Error");

        }

    };



    return (

        <div className="submit-container">


            <div className="submit-card">

                <h2>Submit Insurance Claim</h2>

                <form onSubmit={handleSubmit}>

                    <label>Policy :</label>

                    <select
                        name="policyPurchaseId"
                        value={formData.policyPurchaseId}
                        onChange={handleChange}
                        required
                    >

                        <option value="">Select Policy :</option>
                        {
                            policies
                                .filter((purchase) => purchase.policyStatus === "ACTIVE")
                                .map((purchase) => (

                                    <option
                                        key={purchase.id}
                                        value={purchase.id}
                                    >
                                        {purchase.policy.policyNumber} - {purchase.policy.policyName}
                                    </option>

                                ))
                        }



                    </select>

                    <label>Claim Type :</label>

                    <select
                        name="claimType"
                        value={formData.claimType}
                        onChange={handleChange}
                        required
                    >

                        <option value="">Select Claim Type</option>

                        <option value="Accident">Accident</option>

                        <option value="Medical">Medical</option>

                        <option value="Fire">Fire</option>

                        <option value="Theft">Theft</option>

                    </select>

                    <label>Incident Date :</label>

                    <input
                        type="date"
                        name="incidentDate"
                        value={formData.incidentDate}
                        onChange={handleChange}
                        required
                    />

                    <label>Claim Amount :</label>

                    <input
                        type="number"
                        name="claimedAmount"
                        value={formData.claimedAmount}
                        onChange={handleChange}
                        placeholder="Enter Claim Amount"
                        required
                    />

                    <label>Remarks :</label>

                    <textarea
                        rows="4"
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        placeholder="Enter Remarks"
                    />

                    <label>Supporting Documents</label>

                    <input
                        type="file"
                        multiple
                        onChange={(e) => setFiles(e.target.files)}
                    />

                    <button type="submit">

                        Submit Claim

                    </button>

                </form>

            </div>

        </div>

    );

}

export default SubmitClaim;