// src/LoginPage.js
import { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterPage.css";

export default function LoginPage() {
    const [errors, setErrors] = useState({
        email: { required: false },
        password: { required: false },
        custom_error: null
    });

    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        let hasError = false;
        const newErrors = {
            email: { required: false },
            password: { required: false },
            custom_error: null
        };

        // if (inputs.email.trim() === "") newErrors.email.required = true, hasError = true;
        // if (inputs.password.trim() === "") newErrors.password.required = true, hasError = true;
        if (inputs.email.trim() === "") {
            newErrors.email.required = true;
            hasError = true;
        }
        if (inputs.password.trim() === "") {
            newErrors.password.required = true;
            hasError = true;
        }
        

        setErrors(newErrors);

        if (!hasError) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                console.log("Logged in successfully", inputs);
            }, 2000);
        }
    };

    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    return (
        <section className="register-block">
            <div className="container">
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <input type="email" name="email" placeholder="Email" onChange={handleInput} />
                    {errors.email.required && <span className="text-danger">Email is required.</span>}
                    
                    <input type="password" name="password" placeholder="Password" onChange={handleInput} />
                    {errors.password.required && <span className="text-danger">Password is required.</span>}
                    
                    <button type="submit" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
                </form>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </section>
    );
}
