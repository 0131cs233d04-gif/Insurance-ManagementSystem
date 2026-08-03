import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompleteProfile.css";

function CompleteProfile() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        phone: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        country: "",
        occupation: "",
        annualIncome: "",
        maritalStatus: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSaveProfile = async () => {

        const userId = localStorage.getItem("userId");

        const profileData = {
            user_id: Number(userId),
            ...formData
        };

        console.log("PROFILE SAVE DATA:", profileData);

        try {

            const response = await fetch("https://insurance-managementsystem-production.up.railway.app/api/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profileData)
            });

            if (response.ok) {

                alert("Profile Saved Successfully");

                navigate("/profile");

            } else {

                alert("Profile Save Failed");

            }

        } catch (error) {

            console.error(error);
            alert("Server Error");

        }
    };

    return (

        <div className="complete-profile-container">

            <div className="complete-profile-card">


            <h1>Complete Profile</h1>

            <input
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
            />

            <input
                type="date"
                name="dateOfBirth"
                onChange={handleChange}
            />

            <select name="gender" onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>

            <input
                name="address"
                placeholder="Address"
                onChange={handleChange}
            />

            <input
                name="city"
                placeholder="City"
                onChange={handleChange}
            />

            <input
                name="state"
                placeholder="State"
                onChange={handleChange}
            />

            <input
                name="country"
                placeholder="Country"
                onChange={handleChange}
            />

            <input
                name="occupation"
                placeholder="Occupation"
                onChange={handleChange}
            />

            <input
                type="number"
                name="annualIncome"
                placeholder="Annual Income"
                onChange={handleChange}
            />

            <select name="maritalStatus" onChange={handleChange}>
                <option value="">Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
            </select>
                <div className="profile-buttons">

                    <button
                        className="profile-back-btn"
                        onClick={() => navigate("/profile")}
                    >
                        Back
                    </button>

                    <button className="profile-save-btn" onClick={handleSaveProfile}>
                        Save Profile
                    </button>

                </div>

            </div>




        </div>
    );
}

export default CompleteProfile;