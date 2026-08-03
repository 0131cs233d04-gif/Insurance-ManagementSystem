import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AgentLogin.css";

function AgentLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAgentLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:8080/api/user/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password,
                        role: "AGENT"
                    })
                }
            );

            if (!response.ok) {
                alert("Invalid Agent Email or Password");
                return;
            }

            const result = await response.json();

            if (result && result.role === "AGENT") {

                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userRole", result.role);
                localStorage.setItem("userId", result.id);

                localStorage.setItem(
                    "userName",
                    result.firstName + " " + result.lastName
                );

                localStorage.setItem("userEmail", result.email);

                navigate("/agent-dashboard");

            } else {

                alert("This account is not an Agent account");

            }

        } catch (error) {

            console.error("Agent login error:", error);
            alert("Backend Connection Failed");

        }
    };
    return (
        <div className="agent-page">

            <button
                className="agent-back"
                onClick={() => navigate("/")}
            >
                ← Back
            </button>

            <div className="agent-wrapper">

                <div className="agent-info">

                    <div className="agent-logo">
                        IA
                    </div>

                    <h1>InsuraA</h1>

                    <h2>Agent Portal</h2>

                    <p>
                        Manage customers, policies and claims
                        from one secure workspace.
                    </p>

                    <div className="agent-features">
                        <p>✓ Manage Customer Policies</p>
                        <p>✓ Track Insurance Claims</p>
                        <p>✓ View Customer Information</p>
                        <p>✓ Secure Agent Access</p>
                    </div>

                </div>


                <div className="agent-login-card">

                    <div className="agent-icon">
                        👤
                    </div>

                    <h1>Agent Login</h1>

                    <p className="agent-subtitle">
                        Sign in to your agent account
                    </p>

                    <form onSubmit={handleAgentLogin}>

                        <label>Email Address</label>

                        <div className="agent-input">
                            <span>✉</span>

                            <input
                                type="email"
                                placeholder="agent@insuraa.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>


                        <label>Password</label>

                        <div className="agent-input">
                            <span>🔒</span>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>


                        <div className="agent-options">

                            <label className="remember-agent">
                                <input type="checkbox"/>
                                Remember me
                            </label>

                            <button
                                type="button"
                                className="forgot-agent"
                            >
                                Forgot Password?
                            </button>

                        </div>


                        <button
                            type="submit"
                            className="agent-submit"
                        >
                            Login to Agent Portal →
                        </button>

                    </form>


                    <div className="agent-security">
                        🔒 Secure Agent Portal
                    </div>

                </div>

            </div>

        </div>
    );
}

export default AgentLogin;