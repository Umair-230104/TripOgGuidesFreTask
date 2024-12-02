import { Outlet } from "react-router-dom";
import Header from "./layouts/Header";
import './App.css';


function App() {
  return (
    <div>
      <Header />
      <main>
        <Outlet /> {/* Subruter renderes her */}
      </main>
    </div>
  );
}

export default App;
