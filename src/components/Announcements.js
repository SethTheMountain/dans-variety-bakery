import { useEffect, useState } from "react";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch("http://localhost:5015/api/announcements");
                const data = await response.json();

                if (response.ok) {
                    setAnnouncements(data);
                } else {
                    setError("Failed to fetch announcements.");
                }
            } catch (err) {
                setError("Could not connect to the server.");
                console.error("Announcements Fetch Error:", err);
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <div className="announcements">
            <h2>Latest Announcements</h2>
            {error && <p className="error">{error}</p>}
            {announcements.length === 0 ? (
                <p>No announcements yet.</p>
            ) : (
                announcements.map((announcement) => (
                    <div key={announcement.id} className="announcement-card">
                        <h3>{announcement.title}</h3>
                        <p>{announcement.body}</p>
                        <small>Posted on: {new Date(announcement.created_at).toLocaleString()}</small>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
};

export default Announcements;
