import { Routes, Route, BrowserRouter } from "react-router-dom";

import Tags from "./Tags";
import "./App.css";
import Headers from "./Header";
import LearnYourPreference from "./LearnYourPreference";
import Items from "./Items";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Headers />
        <main className="app-wrapper">
          <Routes>
            <Route path="/" element={<Tags />}></Route>
            <Route path="/items" element={<Items />}></Route>
            <Route
              path="/learn-your-preference"
              element={<LearnYourPreference />}
            ></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
