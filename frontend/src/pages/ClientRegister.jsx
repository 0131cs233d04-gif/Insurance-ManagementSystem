import {useState} from "react";
import akt from "../assets/akt.png";
import "./ClientRegister.css";


function ClientRegister() {
    const[formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        repeatPassword: "",
        gender: "",
        dateOfBirth: "",
        address: "",
        city:"",
        state:"",
        country:"",
        occupation:"",
        annualIncome:"",
        maritalStatus:"",

    });
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (formData.password !== formData.repeatPassword) {
            alert("Password and Repeat Password do not match");
            return;
        }

        try {
            const response = await fetch("https://insurance-managementsystem-production.up.railway.app/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,

                    gender: formData.gender,
                    dateOfBirth: formData.dateOfBirth,
                    phone:formData.phone,
                    address: formData.address,
                    city:formData.city,
                    state:formData.state,
                    country:formData.country,
                    occupation:formData.occupation,
                    maritalStatus:formData.maritalStatus,
                }),
            });

            const result = await response.text();

            if (response.ok) {
                alert(result);
            } else {
                alert(result);
            }

        } catch (error) {
            console.error(error);
            alert("Server Error");
        }
    };


    return (
        <div className="register">
            <h1>Client Registration</h1><br></br><br></br>
                <form className="register-form" onSubmit={handleSubmit}>

                <div className="row">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        required/>
                </div>
                <div className="row">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="phone"
                        name="phone"
                        placeholder="Phone"
                        onChange={handleChange}
                        required/>
                </div>
                <div className="row">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="repeatPassword"
                        name="repeatPassword"
                        placeholder="Repeat Password"
                        onChange={handleChange}
                        required/>
                </div>

                <div className="row">
                    <select name="gender" onChange={handleChange}>
                        <option value="male">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>

                    <input
                        type="date"
                        name="dateOfBirth"
                        onChange={handleChange}/>
                </div>

                <div className="row">
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        onChange={handleChange}
                    />
                </div>

                <div className="row">
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        onChange={handleChange}
                    />
                </div>

                    <div className="row">
                        <input
                            type="text"
                            name="occupation"
                            placeholder="Occupation"
                            onChange={handleChange}
                        />
                        <select name="maritalStatus" onChange={handleChange}>
                            <option value="status">Select Status</option>
                            <option>Single</option>
                            <option>Marrid</option>
                            <option>Other</option>

                        </select>

                    </div>

                <button type="submit">Register clint</button>
            </form>

            <div className="logo">
                <img src={akt}alt="logo"/>
                <h1>InsuraA</h1>
            </div>

        </div>


    );
}

export default ClientRegister;