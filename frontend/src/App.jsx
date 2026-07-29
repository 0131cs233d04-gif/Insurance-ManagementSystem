import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ClientRegister from "./pages/ClientRegister.jsx";
import PurchasePolicy from "./pages/PurchasePolicy";
import Profile from "./pages/Profile";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ClientRegister" element={<ClientRegister />} />
            <Route path="/purchase-policy/:policyId" element={<PurchasePolicy />} />
            <Route path="/profile" element={<Profile />} />

        </Routes>
    );
}

export default App;