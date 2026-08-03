import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

    const navigate = useNavigate();

    const [activePage, setActivePage] = useState("dashboard");
    const [showAgentForm, setShowAgentForm] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [agentEmail, setAgentEmail] = useState("");
    const [agentPassword, setAgentPassword] = useState("");
    const [agents, setAgents] = useState([]);
    const [clients, setClients] = useState([]);
    const [policies, setPolicies] = useState([]);
    const [claims, setClaims] = useState([]);

    const adminName = localStorage.getItem("userName") || "Admin";
    const adminEmail = localStorage.getItem("userEmail") || "admin@insurance.com";



    const fetchAgents = async () => {
        try {
            const response = await fetch(
                "https://insurance-managementsystem-production.up.railway.app/api/user/agents"
            );

            const data = await response.json();

            setAgents(data);

        } catch (error) {
            console.error("Error fetching agents:", error);
        }
    };



    const fetchClients = async () => {
        try {
            const response = await fetch(
                "https://insurance-managementsystem-production.up.railway.app/api/user/clients"
            );

            const data = await response.json();

            setClients(data);

        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    const fetchPolicies = async () => {
        try {
            const response = await fetch(
                "https://insurance-managementsystem-production.up.railway.app/api/policies"
            );

            const data = await response.json();
            setPolicies(data);

        } catch (error) {
            console.error("Error fetching policies:", error);
        }
    };


    const fetchClaims = async () => {
        try {
            const response = await fetch(
                "https://insurance-managementsystem-production.up.railway.app/api/claims"
            );

            const data = await response.json();
            setClaims(data);

        } catch (error) {
            console.error("Error fetching claims:", error);
        }
    };

    useEffect(() => {
        fetchAgents();
        fetchClients();
        fetchPolicies();
        fetchClaims();
    }, []);

    const activePolicies = policies.filter(
        (policy) => policy.status?.toLowerCase() === "active"
    );

    const pendingClaims = claims.filter(
        (claim) => claim.status?.toLowerCase() === "pending"
    );


    // ---------------------------------------------------------
    // CREATE AGENT
    // ---------------------------------------------------------

    const handleCreateAgent = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "https://insurance-managementsystem-production.up.railway.app/api/user/register-staff",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        email: agentEmail,
                        password: agentPassword,
                        role: "AGENT"
                    })
                }
            );

            const result = await response.text();

            if (response.ok) {

                alert("Agent Created Successfully");

                setFirstName("");
                setLastName("");
                setAgentEmail("");
                setAgentPassword("");
                setShowAgentForm(false);
                fetchAgents();

            } else {

                alert(result || "Agent creation failed");

            }

        } catch (error) {

            console.error(error);
            alert("Backend Connection Failed");

        }
    };


    // ---------------------------------------------------------
    // LOGOUT
    // ---------------------------------------------------------

    const handleLogout = () => {

        localStorage.clear();
        navigate("/");

    };


    return (

        <div className="admin-dashboard">


            {/* ================= SIDEBAR ================= */}

            <aside className="admin-sidebar">

                <div className="sidebar-logo">

                    <div className="logo-circle">
                        IA
                    </div>

                    <div>
                        <h2>InsuraA</h2>
                        <p>Admin Portal</p>
                    </div>

                </div>


                <div className="sidebar-menu">

                    <button
                        className={activePage === "dashboard" ? "menu-active" : ""}
                        onClick={() => setActivePage("dashboard")}
                    >
                        <span>▦</span>
                        Dashboard
                    </button>


                    <button
                        className={activePage === "clients" ? "menu-active" : ""}
                        onClick={() => setActivePage("clients")}
                    >
                        <span>👥</span>
                        Manage Clients
                    </button>


                    <button
                        className={activePage === "agents" ? "menu-active" : ""}
                        onClick={() => setActivePage("agents")}
                    >
                        <span>🧑‍💼</span>
                        Manage Agents
                    </button>


                    <button
                        className={activePage === "policies" ? "menu-active" : ""}
                        onClick={() => setActivePage("policies")}
                    >
                        <span>📄</span>
                        Manage Policies
                    </button>


                    <button
                        className={activePage === "claims" ? "menu-active" : ""}
                        onClick={() => setActivePage("claims")}
                    >
                        <span>📋</span>
                        Claims
                    </button>


                    <button
                        className={activePage === "reports" ? "menu-active" : ""}
                        onClick={() => setActivePage("reports")}
                    >
                        <span>📊</span>
                        Reports
                    </button>

                </div>


                <div className="sidebar-bottom">

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        ↪ Logout
                    </button>

                </div>

            </aside>


            {/* ================= MAIN ================= */}

            <main className="admin-main">


                {/* TOP BAR */}

                <header className="admin-topbar">

                    <div>

                        <h1>
                            {activePage === "dashboard" && "Dashboard"}
                            {activePage === "clients" && "Manage Clients"}
                            {activePage === "agents" && "Manage Agents"}
                            {activePage === "policies" && "Manage Policies"}
                            {activePage === "claims" && "Insurance Claims"}
                            {activePage === "reports" && "Reports & Analytics"}
                        </h1>

                        <p>Insurance Management System</p>

                    </div>


                    <div className="admin-profile">

                        <div className="notification">
                            🔔
                        </div>

                        <div className="profile-avatar">
                            A
                        </div>

                        <div className="profile-details">
                            <strong>{adminName}</strong>
                            <span>{adminEmail}</span>
                        </div>

                    </div>

                </header>


                {/* =====================================================
                    DASHBOARD HOME
                ===================================================== */}

                {activePage === "dashboard" && (

                    <div className="dashboard-content">


                        <div className="welcome-box">

                            <div>

                                <p className="welcome-small">
                                    ADMINISTRATION
                                </p>

                                <h2>
                                    Welcome back, {adminName}
                                </h2>

                                <p>
                                    Monitor your insurance platform and manage
                                    customers, agents, policies and claims.
                                </p>

                            </div>

                            <div className="welcome-icon">
                                🛡️
                            </div>

                        </div>


                        {/* STATS */}

                        <div className="stats-grid">


                            <div className="stat-card">

                                <div className="stat-icon blue-icon">
                                    👥
                                </div>

                                <div>
                                    <p>Total Clients</p>
                                    <h2>{clients.length}</h2>
                                    <span>Registered clients</span>
                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-icon purple-icon">
                                    🧑‍💼
                                </div>

                                <div>
                                    <p>Total Agents</p>
                                    <h2>{agents.length}</h2>
                                    <span>Active agents</span>
                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-icon green-icon">
                                    📄
                                </div>

                                <div>
                                    <p>Active Policies</p>
                                    <h2>{activePolicies.length}</h2>
                                    <span>Insurance policies</span>
                                </div>

                            </div>


                            <div className="stat-card">

                                <div className="stat-icon orange-icon">
                                    📋
                                </div>

                                <div>
                                    <p>Pending Claims</p>
                                    <h2>{pendingClaims.length}</h2>
                                    <span>Need attention</span>
                                </div>

                            </div>

                        </div>


                        {/* LOWER AREA */}

                        <div className="dashboard-lower">


                            <div className="quick-actions">

                                <div className="section-heading">

                                    <div>
                                        <h2>Quick Actions</h2>
                                        <p>Common administration tasks</p>
                                    </div>

                                </div>


                                <div className="quick-grid">


                                    <button
                                        className="quick-card"
                                        onClick={() => {
                                            setActivePage("agents");
                                            setShowAgentForm(true);
                                        }}
                                    >

                                        <span>＋</span>

                                        <div>
                                            <h3>Create Agent</h3>
                                            <p>Add a new insurance agent</p>
                                        </div>

                                    </button>


                                    <button
                                        className="quick-card"
                                        onClick={() => setActivePage("clients")}
                                    >

                                        <span>👥</span>

                                        <div>
                                            <h3>View Clients</h3>
                                            <p>Manage registered clients</p>
                                        </div>

                                    </button>


                                    <button
                                        className="quick-card"
                                        onClick={() => setActivePage("policies")}
                                    >

                                        <span>📄</span>

                                        <div>
                                            <h3>Policies</h3>
                                            <p>Manage insurance plans</p>
                                        </div>

                                    </button>


                                    <button
                                        className="quick-card"
                                        onClick={() => setActivePage("claims")}
                                    >

                                        <span>📋</span>

                                        <div>
                                            <h3>Review Claims</h3>
                                            <p>Check pending claims</p>
                                        </div>

                                    </button>


                                </div>

                            </div>


                            <div className="system-card">

                                <div className="section-heading">
                                    <div>
                                        <h2>System Status</h2>
                                        <p>Current platform status</p>
                                    </div>
                                </div>


                                <div className="status-row">
                                    <span>Backend Server</span>

                                    <div className="status-online">
                                        <i></i>
                                        Online
                                    </div>
                                </div>


                                <div className="status-row">
                                    <span>Database</span>

                                    <div className="status-online">
                                        <i></i>
                                        Connected
                                    </div>
                                </div>


                                <div className="status-row">
                                    <span>Admin Portal</span>

                                    <div className="status-online">
                                        <i></i>
                                        Active
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                )}


                {/* =====================================================
                    MANAGE AGENTS
                ===================================================== */}

                {activePage === "agents" && (

                    <div className="page-content">


                        <div className="page-heading">

                            <div>

                                <h2>Insurance Agents</h2>

                                <p>
                                    Create and manage agent accounts.
                                    Agents cannot create their own accounts.
                                </p>

                            </div>


                            <button
                                className="create-agent-button"
                                onClick={() => setShowAgentForm(true)}
                            >
                                + Create Agent
                            </button>

                        </div>


                        <div className="agent-info-box">

                            <span>🔐</span>

                            <div>
                                <h3>Admin Controlled Accounts</h3>

                                <p>
                                    Only administrators can create agent
                                    login credentials. New agents receive
                                    the AGENT role automatically.
                                </p>
                            </div>

                        </div>


                        <div className="agent-table-card">

                            <div className="table-title">

                                <div>
                                    <h3>Registered Agents</h3>
                                    <p>Agent accounts will appear here.</p>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Search agent..."
                                />

                            </div>


                            {agents.length > 0 ? (
                                <table className="agents-table">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Agent Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {agents.map((agent) => (
                                        <tr key={agent.id}>
                                            <td>{agent.id}</td>

                                            <td>
                                                {agent.firstName} {agent.lastName}
                                            </td>

                                            <td>{agent.email}</td>

                                            <td>
                        <span className="agent-role">
                            {agent.role}
                        </span>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="empty-agents">
                                    <div>🧑‍💼</div>
                                    <h3>No Agents Found</h3>
                                    <p>Create your first agent account.</p>
                                </div>
                            )}

                        </div>

                    </div>

                )}


                {/* =====================================================
                    CLIENTS
                ===================================================== */}

                {activePage === "clients" && (

                    <div className="page-content">

                        <div className="page-heading">
                            <div>
                                <h2>Registered Clients</h2>
                                <p>View all registered insurance clients.</p>
                            </div>
                        </div>

                        <div className="agent-table-card">

                            <div className="table-title">
                                <div>
                                    <h3>Client Accounts</h3>
                                    <p>Total Clients: {clients.length}</p>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Search client..."
                                />
                            </div>

                            {clients.length > 0 ? (

                                <table className="agents-table">

                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Client Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                    </thead>

                                    <tbody>

                                    {clients.map((client) => (

                                        <tr key={client.id}>

                                            <td>{client.id}</td>

                                            <td>
                                                {client.firstName} {client.lastName}
                                            </td>

                                            <td>{client.email}</td>

                                            <td>
                                    <span className="client-role">
                                        {client.role}
                                    </span>
                                            </td>

                                        </tr>

                                    ))}

                                    </tbody>

                                </table>

                            ) : (

                                <div className="empty-agents">
                                    <div>👥</div>
                                    <h3>No Clients Found</h3>
                                    <p>No client has registered yet.</p>
                                </div>

                            )}

                        </div>

                    </div>

                )}


                {/* POLICIES */}

                {/* ================= POLICIES ================= */}

                {activePage === "policies" && (

                    <div className="page-content">

                        <div className="page-heading">
                            <div>
                                <h2>Insurance Policies</h2>
                                <p>View and manage all insurance policies.</p>
                            </div>
                        </div>

                        <div className="agent-table-card">

                            <div className="table-title">
                                <div>
                                    <h3>Policy List</h3>
                                    <p>Total Policies: {policies.length}</p>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Search policy..."
                                />
                            </div>

                            {policies.length > 0 ? (

                                <table className="agents-table">

                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Policy No.</th>
                                        <th>Policy Name</th>
                                        <th>Premium</th>
                                        <th>Coverage</th>
                                        <th>Tenure</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>

                                    <tbody>

                                    {policies.map((policy) => (

                                        <tr key={policy.id}>

                                            <td>{policy.id}</td>

                                            <td>{policy.policyNumber}</td>

                                            <td>{policy.policyName}</td>

                                            <td>
                                                ₹{policy.premiumAmount}
                                            </td>

                                            <td>
                                                ₹{policy.coverageAmount}
                                            </td>

                                            <td>
                                                {policy.tenure} Years
                                            </td>

                                            <td>{policy.startDate}</td>

                                            <td>{policy.endDate}</td>

                                            <td>
                                    <span className="agent-role">
                                        {policy.status}
                                    </span>
                                            </td>

                                        </tr>

                                    ))}

                                    </tbody>

                                </table>

                            ) : (

                                <div className="empty-agents">
                                    <div>📄</div>
                                    <h3>No Policies Found</h3>
                                    <p>No insurance policies are available.</p>
                                </div>

                            )}

                        </div>

                    </div>

                )}


                {/* CLAIMS */}

                {/* ================= CLAIMS ================= */}

                {activePage === "claims" && (

                    <div className="page-content">

                        <div className="page-heading">
                            <div>
                                <h2>Insurance Claims</h2>
                                <p>View all submitted insurance claims.</p>
                            </div>
                        </div>

                        <div className="agent-table-card">

                            <div className="table-title">
                                <div>
                                    <h3>Claim List</h3>
                                    <p>
                                        Total Claims: {claims.length} | Pending: {pendingClaims.length}
                                    </p>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Search claim..."
                                />
                            </div>


                            {claims.length > 0 ? (

                                <table className="agents-table">

                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Claim No.</th>
                                        <th>Client</th>
                                        <th>Policy</th>
                                        <th>Claim Type</th>
                                        <th>Incident Date</th>
                                        <th>Claimed Amount</th>
                                        <th>Status</th>
                                        <th>Verification</th>
                                        <th>Agent</th>
                                        <th>Payment</th>
                                    </tr>
                                    </thead>

                                    <tbody>

                                    {claims.map((claim) => (

                                        <tr key={claim.id}>

                                            <td>{claim.id}</td>

                                            <td>
                                                {claim.claimNumber}
                                            </td>

                                            <td>
                                                {claim.customer?.user
                                                    ? `${claim.customer.user.firstName} ${claim.customer.user.lastName}`
                                                    : "N/A"}
                                            </td>

                                            <td>
                                                {claim.policyPurchase?.policy?.policyName ||
                                                    claim.policyPurchase?.policy?.policyNumber ||
                                                    "N/A"}
                                            </td>

                                            <td>
                                                {claim.claimType || "N/A"}
                                            </td>

                                            <td>
                                                {claim.incidentDate || "N/A"}
                                            </td>

                                            <td>
                                                ₹{claim.claimedAmount ?? 0}
                                            </td>

                                            <td>
                                    <span className="agent-role">
                                        {claim.status || "Pending"}
                                    </span>
                                            </td>

                                            <td>
                                                {claim.verificationStatus || "Pending"}
                                            </td>

                                            <td>
                                                {claim.assignedAgent || "Not Assigned"}
                                            </td>

                                            <td>
                                                {claim.paymentStatus || "Pending"}
                                            </td>

                                        </tr>

                                    ))}

                                    </tbody>

                                </table>

                            ) : (

                                <div className="empty-agents">

                                    <div>📋</div>

                                    <h3>No Claims Found</h3>

                                    <p>
                                        No insurance claims have been submitted yet.
                                    </p>

                                </div>

                            )}

                        </div>

                    </div>

                )}




                {/* REPORTS */}

                {activePage === "reports" && (

                    <div className="placeholder-page">

                        <div className="placeholder-icon">
                            📊
                        </div>

                        <h2>Reports & Analytics</h2>

                        <p>
                            Insurance reports and analytics will appear here.
                        </p>

                    </div>

                )}


            </main>


            {/* =====================================================
                CREATE AGENT MODAL
            ===================================================== */}

            {showAgentForm && (

                <div
                    className="agent-modal-overlay"
                    onClick={() => setShowAgentForm(false)}
                >

                    <div
                        className="agent-modal"
                        onClick={(e) => e.stopPropagation()}
                    >


                        <div className="modal-header">

                            <div>

                                <span className="modal-label">
                                    ADMIN ACTION
                                </span>

                                <h2>Create New Agent</h2>

                                <p>
                                    Create login credentials for an insurance agent.
                                </p>

                            </div>


                            <button
                                className="modal-close"
                                onClick={() => setShowAgentForm(false)}
                            >
                                ×
                            </button>

                        </div>


                        <form onSubmit={handleCreateAgent}>


                            <div className="form-row">


                                <div className="form-group">

                                    <label>First Name</label>

                                    <input
                                        type="text"
                                        placeholder="Enter first name"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>Last Name</label>

                                    <input
                                        type="text"
                                        placeholder="Enter last name"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        required
                                    />

                                </div>


                            </div>


                            <div className="form-group">

                                <label>Agent Email</label>

                                <input
                                    type="email"
                                    placeholder="agent@insurance.com"
                                    value={agentEmail}
                                    onChange={(e) =>
                                        setAgentEmail(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>Temporary Password</label>

                                <input
                                    type="password"
                                    placeholder="Create agent password"
                                    value={agentPassword}
                                    onChange={(e) =>
                                        setAgentPassword(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="role-display">

                                <div>
                                    <span>Account Role</span>
                                    <strong>AGENT</strong>
                                </div>

                                <p>
                                    Role is automatically assigned by Admin.
                                </p>

                            </div>


                            <div className="modal-buttons">

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() => setShowAgentForm(false)}
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="save-agent-button"
                                >
                                    Create Agent
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


        </div>

    );

}

export default AdminDashboard;