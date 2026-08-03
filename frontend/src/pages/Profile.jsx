import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {

    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [profileNotFound, setProfileNotFound] = useState(false);

    useEffect(() => {

        const userId = localStorage.getItem("userId");

        console.log("PROFILE USER ID:", userId);

        fetch(`https://insurance-managementsystem-production.up.railway.app/api/profile/${userId}`)
            .then((res) => {

                if (!res.ok) {
                    setProfileNotFound(true);
                    return null;
                }

                return res.json();
            })
            .then((data) => {

                if (data) {
                    console.log("PROFILE DATA:", data);
                    setProfile(data);
                }

            })
            .catch((err) => {
                console.error(err);
                setProfileNotFound(true);
            });

    }, []);

    if (profileNotFound) {
        return (
            <div className="profile-container">

                <button
                    className="back"
                    onClick={() => navigate("/dashboard")}
                >
                    ⬅ Back
                </button>

                <h1>My Profile</h1>

                <div className="profile-card">
                    <h2>No Profile Found</h2>

                    <p>You have not completed your profile yet.</p>

                    <button
                        onClick={() => navigate("/complete-profile")}
                    >
                        Complete Profile
                    </button>
                </div>

            </div>
        );
    }

    if (!profile) {
        return <h2>Loading Profile...</h2>;
    }

    return (

        <div className="profile-container">

            <button  class="back"  onClick={() => navigate("/dashboard")}>
                ⬅ Back
            </button>

            <button class="edit">Edit</button>

            <h1>My Profile</h1>

            <div className="profile-card">

                <p><strong>Customer ID:</strong> {profile.id}</p>

                <p><strong>First Name:</strong> {profile.user.firstName}</p>

                <p><strong>Last Name:</strong> {profile.user.lastName}</p>

                <p><strong>Email:</strong> {profile.user.email}</p>

                <p><strong>Phone:</strong> {profile.phone}</p>

                <p><strong>Date of Birth:</strong> {profile.dateOfBirth}</p>

                <p><strong>Gender:</strong> {profile.gender}</p>

                <p><strong>Address:</strong> {profile.address}</p>

                <p><strong>City:</strong> {profile.city}</p>

                <p><strong>State:</strong> {profile.state}</p>

                <p><strong>Country:</strong> {profile.country}</p>

                <p><strong>Occupation:</strong> {profile.occupation}</p>

                <p><strong>Annual Income:</strong> {profile.annualIncome}</p>

                <p><strong>Marital Status:</strong> {profile.maritalStatus}</p>

            </div>

        </div>
    );
}

export default Profile;