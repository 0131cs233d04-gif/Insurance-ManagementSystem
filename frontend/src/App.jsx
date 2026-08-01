import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ClientRegister from "./pages/ClientRegister.jsx";
import PurchasePolicy from "./pages/PurchasePolicy";
import Profile from "./pages/Profile";
import MyPolicies from "./pages/MyPolicies";
import PolicyDetails from "./pages/PolicyDetails";
import MyClaims from "./pages/MyClaims";
import ClaimDetails from "./pages/ClaimDetails";
import SubmitClaim from "./pages/SubmitClaims";
import CompleteProfile from "./pages/CompleteProfile";




function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ClientRegister" element={<ClientRegister />} />
            <Route path="/purchase-policy/:policyId" element={<PurchasePolicy />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-policies" element={<MyPolicies />} />
            <Route path="/policy/:id" element={<PolicyDetails />} />
            <Route path="/claims" element={<MyClaims/>} />

            <Route path="/claim-details/:id" element={<ClaimDetails />} />
            <Route path="/submit-claim" element={<SubmitClaim />} />
            <Route
                path="/complete-profile"
                element={<CompleteProfile />}
            />




        </Routes>
    );
}

export default App;