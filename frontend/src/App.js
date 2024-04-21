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
            {/* Page 1 */}
            <Route path="/" element={<Tags />}></Route>
            {/* Page 2 */}
            <Route
              path="/learn-your-preference"
              element={<LearnYourPreference />}
            ></Route>
            {/* Page 3 */}
            <Route path="/items" element={<Items />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
