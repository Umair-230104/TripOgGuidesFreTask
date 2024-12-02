import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import facade from "../util/apiFacade";

function TripDetails() {
  const { id } = useParams();
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Tjek adgang ved komponentens start
    if (!facade.hasUserAccess("USER", facade.loggedIn())) {
      setError("You must be logged in as a USER to view this page.");
      return;
    }

    // Fetch all trips
    facade.fetchData("/api/trips").then((data) => setTrips(data));
  }, []);

  useEffect(() => {
    if (!id) return;

    // Fetch details for a specific trip
    facade.fetchData(`/api/trips/${id}`).then((data) => setSelectedTrip(data));
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>All Trips</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            <Link to={`/trip/${trip.id}`}>{trip.name}</Link>
          </li>
        ))}
      </ul>

      {selectedTrip && (
        <div>
          <h2>Trip Details</h2>
          <p><strong>Name:</strong> {selectedTrip.name}</p>
          <p><strong>Category:</strong> {selectedTrip.category}</p>
          <p><strong>Price:</strong> ${selectedTrip.price}</p>
          <p><strong>Start Time:</strong> {new Date(selectedTrip.starttime).toLocaleString()}</p>
          <p><strong>End Time:</strong> {new Date(selectedTrip.endtime).toLocaleString()}</p>
          <p><strong>Location:</strong> ({selectedTrip.latitude}, {selectedTrip.longitude})</p>
          
          {selectedTrip.guide && (
            <div>
              <h3>Guide Details</h3>
              <p><strong>Name:</strong> {selectedTrip.guide.firstname} {selectedTrip.guide.lastname}</p>
              <p><strong>Email:</strong> {selectedTrip.guide.email}</p>
              <p><strong>Phone:</strong> {selectedTrip.guide.phone}</p>
              <p><strong>Years of Experience:</strong> {selectedTrip.guide.yearsOfExperience}</p>
              <p><strong>Trips:</strong></p>
              <ul>
                {selectedTrip.guide.trips.map((tripName, index) => (
                  <li key={index}>{tripName}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TripDetails;
