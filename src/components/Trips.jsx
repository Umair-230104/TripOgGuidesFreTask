import { useEffect, useState } from "react";
import facade from "../util/apiFacade";

function Trips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    facade.fetchData("/api/trips").then((data) => setTrips(data));
  }, []);

  return (
    <div>
      <h2>All Trips</h2>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            {trip.name} - {trip.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trips;