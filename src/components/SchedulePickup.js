import { useState } from "react";

const ScheduledPickup = () => {
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [callbackNumber, setCallbackNumber] = useState("");
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const NGROK_URL = "https://1d76-2601-803-407f-b9b0-b9be-70a6-1797-a6a3.ngrok-free.app";

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(""); 
      setMessage("");
  
      const pickupData = {
          last_name: lastName,
          email: email,
          pickup_date: pickupDate,
          callback_number: callbackNumber,
          items: items,
      };
  
      try {
          const response = await fetch(`${NGROK_URL}/api/pickups`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(pickupData),
          });
  
          const data = await response.json();
  
          if (response.ok) {
              setMessage("Pickup scheduled successfully!");
              setLastName("");
              setEmail("");
              setPickupDate("");
              setCallbackNumber("");
              setItems([]);
          } else {
              setError(data.error || "Failed to schedule pickup.");
          }
      } catch (err) {
          setError("Could not connect to server.");
          console.error("Error:", err);
      }
  };

    return (
        <div className="scheduled-pickup-container">
            <h2>Schedule Your Pickup</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="pickup-form">
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="datetime-local" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} required />
                <input type="text" placeholder="Callback Number" value={callbackNumber} onChange={(e) => setCallbackNumber(e.target.value)} required />
                
                <textarea placeholder="Items (comma-separated)" value={items.join(", ")} onChange={(e) => setItems(e.target.value.split(","))} required />

                <button type="submit" className="pickup-btn">Schedule Pickup</button>
            </form>
        </div>
    );
};

export default ScheduledPickup;
