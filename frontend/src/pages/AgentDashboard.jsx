import { useEffect, useState } from "react";
import "./AgentDashboard.css";

function AgentDashboard() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await fetch(
                "https://insurance-managementsystem-production.up.railway.app/api/profile/all"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch clients");
            }

            const data = await response.json();
            setClients(data);

        } catch (error) {
            console.error("Error fetching clients:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredClients = clients.filter((client) => {
        const fullName =
            `${client.user?.firstName || ""} ${client.user?.lastName || ""}`.toLowerCase();

        const email = client.user?.email?.toLowerCase() || "";
        const phone = client.phone?.toLowerCase() || "";

        return (
            fullName.includes(search.toLowerCase()) ||
            email.includes(search.toLowerCase()) ||
            phone.includes(search.toLowerCase())
        );
    });

    return (
        <div className="agent-dashboard">

            {/* SIDEBAR */}
            <aside className="agent-sidebar">

                <div className="agent-logo">
                    <div className="logo-circle">I</div>

                    <div>
                        <h2>INSURE</h2>
                        <span>Agent Portal</span>
                    </div>
                </div>

                <nav className="agent-menu">

                    <button className="menu-item active">
                        <span>▦</span>
                        Dashboard
                    </button>

                    <button className="menu-item">
                        <span>♙</span>
                        My Clients
                    </button>

                    <button className="menu-item">
                        <span>▤</span>
                        Policies
                    </button>

                    <button className="menu-item">
                        <span>✓</span>
                        Claims
                    </button>

                    <button className="menu-item">
                        <span>▣</span>
                        Documents
                    </button>

                </nav>

                <div className="sidebar-bottom">
                    <button className="menu-item">
                        <span>⚙</span>
                        Settings
                    </button>

                    <button className="menu-item logout">
                        <span>↪</span>
                        Logout
                    </button>
                </div>

            </aside>


            {/* MAIN CONTENT */}
            <main className="agent-main">

                {/* HEADER */}
                <header className="agent-header">

                    <div>
                        <h1>Agent Dashboard</h1>
                        <p>Manage your clients and insurance activities</p>
                    </div>

                    <div className="agent-profile">

                        <div className="notification">
                            ♢
                            <span></span>
                        </div>

                        <div className="agent-avatar">
                            AG
                        </div>

                        <div className="agent-info">
                            <strong>Insurance Agent</strong>
                            <small>Agent</small>
                        </div>

                    </div>

                </header>


                {/* STATISTICS */}
                <section className="agent-stats">

                    <div className="stat-card">
                        <div className="stat-icon clients-icon">
                            ♙
                        </div>

                        <div>
                            <p>Total Clients</p>
                            <h2>{clients.length}</h2>
                            <span>Registered customers</span>
                        </div>
                    </div>


                    <div className="stat-card">
                        <div className="stat-icon policies-icon">
                            ▤
                        </div>

                        <div>
                            <p>Active Policies</p>
                            <h2>0</h2>
                            <span>Client policies</span>
                        </div>
                    </div>


                    <div className="stat-card">
                        <div className="stat-icon claims-icon">
                            ✓
                        </div>

                        <div>
                            <p>Claims</p>
                            <h2>0</h2>
                            <span>Total claims</span>
                        </div>
                    </div>


                    <div className="stat-card">
                        <div className="stat-icon documents-icon">
                            ▣
                        </div>

                        <div>
                            <p>Documents</p>
                            <h2>0</h2>
                            <span>Client documents</span>
                        </div>
                    </div>

                </section>


                {/* CLIENT SECTION */}
                <section className="clients-section">

                    <div className="clients-heading">

                        <div>
                            <h2>My Clients</h2>
                            <p>View and manage registered clients</p>
                        </div>

                        <div className="client-search">
                            <span>⌕</span>

                            <input
                                type="text"
                                placeholder="Search client..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                    </div>


                    <div className="client-table-wrapper">

                        {loading ? (

                            <div className="loading">
                                Loading clients...
                            </div>

                        ) : (

                            <table className="client-table">

                                <thead>
                                <tr>
                                    <th>CLIENT</th>
                                    <th>CONTACT</th>
                                    <th>LOCATION</th>
                                    <th>OCCUPATION</th>
                                    <th>STATUS</th>
                                    <th>ACTION</th>
                                </tr>
                                </thead>

                                <tbody>

                                {filteredClients.length > 0 ? (

                                    filteredClients.map((client) => (

                                        <tr key={client.id}>

                                            <td>
                                                <div className="client-name">

                                                    <div className="client-avatar">
                                                        {client.user?.firstName?.charAt(0)}
                                                        {client.user?.lastName?.charAt(0)}
                                                    </div>

                                                    <div>
                                                        <strong>
                                                            {client.user?.firstName}{" "}
                                                            {client.user?.lastName}
                                                        </strong>

                                                        <span>
                                                                Client ID: #{client.id}
                                                            </span>
                                                    </div>

                                                </div>
                                            </td>


                                            <td>
                                                <div className="contact-info">
                                                    <span>{client.user?.email}</span>
                                                    <small>{client.phone}</small>
                                                </div>
                                            </td>


                                            <td>
                                                <div className="location-info">
                                                        <span>
                                                            {client.city || "N/A"}
                                                        </span>

                                                    <small>
                                                        {client.state || "N/A"}
                                                    </small>
                                                </div>
                                            </td>


                                            <td>
                                                {client.occupation || "N/A"}
                                            </td>


                                            <td>
                                                    <span className="status-active">
                                                        Active
                                                    </span>
                                            </td>


                                            <td>
                                                <button
                                                    className="view-client-btn"
                                                    onClick={() =>
                                                        setSelectedClient(client)
                                                    }
                                                >
                                                    View Details
                                                </button>
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="no-clients"
                                        >
                                            No clients found
                                        </td>
                                    </tr>

                                )}

                                </tbody>

                            </table>

                        )}

                    </div>

                </section>

            </main>


            {/* CLIENT DETAILS MODAL */}
            {selectedClient && (

                <div className="client-modal-overlay">

                    <div className="client-modal">

                        <button
                            className="close-modal"
                            onClick={() => setSelectedClient(null)}
                        >
                            ×
                        </button>

                        <div className="modal-header">

                            <div className="modal-avatar">
                                {selectedClient.user?.firstName?.charAt(0)}
                                {selectedClient.user?.lastName?.charAt(0)}
                            </div>

                            <div>
                                <h2>
                                    {selectedClient.user?.firstName}{" "}
                                    {selectedClient.user?.lastName}
                                </h2>

                                <p>
                                    {selectedClient.user?.email}
                                </p>
                            </div>

                        </div>


                        <h3 className="details-title">
                            Personal Information
                        </h3>

                        <div className="details-grid">

                            <Detail
                                label="Phone Number"
                                value={selectedClient.phone}
                            />

                            <Detail
                                label="Date of Birth"
                                value={selectedClient.dateOfBirth}
                            />

                            <Detail
                                label="Gender"
                                value={selectedClient.gender}
                            />

                            <Detail
                                label="Marital Status"
                                value={selectedClient.maritalStatus}
                            />

                            <Detail
                                label="Occupation"
                                value={selectedClient.occupation}
                            />

                            <Detail
                                label="Annual Income"
                                value={
                                    selectedClient.annualIncome
                                        ? `₹ ${selectedClient.annualIncome}`
                                        : "N/A"
                                }
                            />

                            <Detail
                                label="Address"
                                value={selectedClient.address}
                            />

                            <Detail
                                label="City"
                                value={selectedClient.city}
                            />

                            <Detail
                                label="State"
                                value={selectedClient.state}
                            />

                            <Detail
                                label="ZIP Code"
                                value={selectedClient.zip}
                            />

                            <Detail
                                label="Country"
                                value={selectedClient.country}
                            />

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}


function Detail({ label, value }) {
    return (
        <div className="detail-box">
            <span>{label}</span>
            <strong>{value || "N/A"}</strong>
        </div>
    );
}

export default AgentDashboard;