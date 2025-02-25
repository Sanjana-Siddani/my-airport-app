from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Simulated flight data
flight_data = {
    "AI101": "10:30 AM",
    "BA202": "2:15 PM",
    "DL303": "6:45 PM",
}

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Flight Timing API"})

@app.route('/get-flight-time', methods=['POST'])
def get_flight_time():
    data = request.json
    flight_id = data.get("flight_id", "").upper()

    if flight_id in flight_data:
        return jsonify({"flight_id": flight_id, "time": flight_data[flight_id]})
    else:
        return jsonify({"error": "Flight not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
