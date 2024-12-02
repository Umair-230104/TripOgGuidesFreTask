import { useEffect, useState } from "react";
import facade from "../util/apiFacade";

function Guides() {
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!facade.hasUserAccess("ADMIN", facade.loggedIn())) {
      setError("You do not have access to view this page.");
      return;
    }
    facade.fetchData("/api/guides").then((data) => setGuides(data));
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Guides</h2>
      <ul>
        {guides.map((guide) => (
          <li key={guide.id}>
            {guide.firstname} {guide.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Guides;