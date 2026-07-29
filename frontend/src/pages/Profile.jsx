import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {

    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/profile/1")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProfile(data);
            })
            .catch((err) => console.error(err));
    }, []);

    if (!profile) {
        return <h2>Loading Profile...</h2>;
    }

    return (
        <div className="profile-container">

            <button onClick={() => navigate("/dashboard")}>
                ⬅ Back
            </button>

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