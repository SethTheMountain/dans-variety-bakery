import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // ✅ Load Scheduled Pickups & Announcements from Backend
    useEffect(() => {
        fetchOrders();
        fetchAnnouncements();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch("http://localhost:5015/api/pickups");
            const data = await response.json();
            if (response.ok) {
                setOrders(data);
            } else {
                setError("Failed to load scheduled pickups.");
            }
        } catch (err) {
            setError("Could not connect to the server.");
            console.error("Fetch Orders Error:", err);
        }
    };

    const fetchAnnouncements = async () => {
        try {
            const response = await fetch("http://localhost:5015/api/announcements");
            const data = await response.json();
            if (response.ok) {
                setAnnouncements(data);
            } else {
                setError("Failed to load announcements.");
            }
        } catch (err) {
            setError("Could not connect to the server.");
            console.error("Fetch Announcements Error:", err);
        }
    };

    // ✅ Delete a Scheduled Pickup from MySQL
    const handleDeleteOrder = async (id) => {
        try {
            const response = await fetch(`http://localhost:5015/api/pickups/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setOrders(orders.filter(order => order.id !== id));
            } else {
                const data = await response.json();
                alert(data.error || "Failed to delete the pickup order.");
            }
        } catch (err) {
            console.error("Delete Order Error:", err);
            alert("Could not connect to the server.");
        }
    };

    // ✅ Submit a New Announcement to MySQL
    const handleSubmitAnnouncement = async () => {
        if (!title || !body) {
            alert("Please enter both a title and body.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5015/api/announcements", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, body }),
            });

            const data = await response.json();
            if (response.ok) {
                setAnnouncements([...announcements, { id: data.id, title, body, created_at: new Date().toISOString() }]);
                setTitle("");
                setBody("");
                navigate("/");
            } else {
                alert("Error posting announcement.");
            }
        } catch (err) {
            console.error("Submit Announcement Error:", err);
        }
    };

    // ✅ Delete an Announcement from MySQL
    const handleDeleteAnnouncement = async (id) => {
        try {
            const response = await fetch(`http://localhost:5015/api/announcements/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setAnnouncements(announcements.filter(announcement => announcement.id !== id));
            } else {
                const data = await response.json();
                alert(data.error || "Failed to delete the announcement.");
            }
        } catch (err) {
            console.error("Delete Announcement Error:", err);
            alert("Could not connect to the server.");
        }
    };

    // ✅ Format Pickup Date & Time
    const formatPickupDate = (dateTime) => {
        const date = new Date(dateTime);
        return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
    };

    const formatPickupTime = (dateTime) => {
        const date = new Date(dateTime);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes} ${ampm}`;
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            {/* Scheduled Pickups */}
            <h3>Scheduled Pickups</h3>
            {error && <p className="error">{error}</p>}
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order.id} className="order-item">
                        <p><strong>Name:</strong> {order.last_name}</p>
                        <p><strong>Email:</strong> {order.email}</p>
                        <p><strong>Pickup Date:</strong> {formatPickupDate(order.pickup_date)}</p>
                        <p><strong>Pickup Time:</strong> {formatPickupTime(order.pickup_date)}</p>
                        <p><strong>Callback Number:</strong> {order.callback_number}</p>
                        <p><strong>Menu Items:</strong> {JSON.parse(order.items).join(", ") || "No items selected"}</p>
                        <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No scheduled pickups.</p>
            )}

            {/* Announcements Section */}
            <h3>Manage Announcements</h3>
            {announcements.length > 0 ? (
                announcements.map((announcement) => (
                    <div key={announcement.id} className="announcement-item">
                        <h4>{announcement.title}</h4>
                        <p>{announcement.body}</p>
                        <small>Posted on: {new Date(announcement.created_at).toLocaleString()}</small>
                        <button className="delete-btn" onClick={() => handleDeleteAnnouncement(announcement.id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No announcements yet.</p>
            )}

            {/* Create Announcement */}
            <h3>Create Announcement</h3>
            <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
            />
            <textarea 
                placeholder="Announcement Body" 
                value={body} 
                onChange={(e) => setBody(e.target.value)} 
            />
            <button onClick={handleSubmitAnnouncement}>Upload Announcement</button>
        </div>
    );
};

export default AdminDashboard;
