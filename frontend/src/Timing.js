import React, { useState } from "react";

function Timing() {
  const [flightNumber, setFlightNumber] = useState("");
  const [flightTime, setFlightTime] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!flightNumber) {
      setError("Please enter a flight number.");
      return;
    }

    setError("");
    setFlightTime(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/get-flight-time", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flight_id: flightNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setFlightTime(`Flight ${data.flight_id} departs at ${data.time}`);
      } else {
        setError(data.error || "Error fetching flight time.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="timing-container">
      <h2>Check Flight Timings</h2>
      <input
        type="text"
        placeholder="Enter Flight Number"
        value={flightNumber}
        onChange={(e) => setFlightNumber(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {flightTime && <h3>{flightTime}</h3>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Timing;
