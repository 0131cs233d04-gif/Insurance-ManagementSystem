import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAdminLogin = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                role: "ADMIN"
            })
        });

        const result = await response.json();
        if (result && result.role === "ADMIN") {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userRole", result.role);
            localStorage.setItem("userId", result.id);

            localStorage.setItem(
                "userName",
                result.firstName + " " + result.lastName
            );
            localStorage.setItem("userEmail", result.email);
            navigate("/admin-dashboard");

        }
        else {
            alert("Invalid Admin Email or Password");
        }

        // Backend API baad me yahan connect karenge
        console.log("Admin Email:", email);
        console.log("Admin Password:", password);
    };


    return (
        <div className="admin-page">

            <button
                className="admin-back"
                onClick={() => navigate("/")}
            >
                ← Back
            </button>

            <div className="admin-wrapper">

                {/* LEFT SIDE */}

                <div className="admin-info">

                    <div className="admin-logo">
                        IA
                    </div>

                    <h1>InsuraA</h1>

                    <h2>Admin Portal</h2>

                    <p>
                        Control and manage the complete insurance
                        system from one secure dashboard.
                    </p>

                    <div className="admin-features">
                        <p>✓ Manage Customers</p>
                        <p>✓ Manage Insurance Agents</p>
                        <p>✓ Manage Policies</p>
                        <p>✓ Review Insurance Claims</p>
                        <p>✓ View Reports & Analytics</p>
                    </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="admin-login-card">

                    <div className="admin-icon">
                        🛡️
                    </div>

                    <h1>Admin Login</h1>

                    <p className="admin-subtitle">
                        Sign in to access the administration panel
                    </p>

                    <form onSubmit={handleAdminLogin}>

                        <label>Admin Email</label>

                        <div className="admin-input">

                            <span>✉</span>

                            <input
                                type="email"
                                placeholder="admin@insuraa.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                        </div>


                        <label>Password</label>

                        <div className="admin-input">

                            <span>🔒</span>

                            <input
                                type="password"
                                placeholder="Enter admin password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                        </div>


                        <div className="admin-options">

                            <label className="remember-admin">
                                <input type="checkbox"/>
                                Remember me
                            </label>

                            <button
                                type="button"
                                className="forgot-admin"
                            >
                                Forgot Password?
                            </button>

                        </div>


                        <button
                            type="submit"
                            className="admin-submit"
                        >
                            Login to Admin Portal →
                        </button>

                    </form>


                    <div className="admin-security">
                        🔒 Authorized Personnel Only
                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminLogin;