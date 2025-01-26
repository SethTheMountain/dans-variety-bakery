import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminAuth = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5015/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                onLogin();
                navigate("/admin/create");
            } else {
                setError(data.error || "Invalid username or password.");
            }
        } catch (err) {
            setError("Could not connect to the server. Ensure the backend is running.");
            console.error("Login Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-auth-container">
            <h2>Admin Login</h2>
            {error && <p className="error-message">{error}</p>}

            <div className="auth-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button disabled={loading} onClick={handleLogin} className="login-btn">
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    );
};

export default AdminAuth;
