import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header";
import { Homepage } from "./Pages/Homepage";
import { CoinPage } from "./Pages/CoinPage";

function App() {
  return (
    <BrowserRouter>
      <div className="main_layout">
        <Header />
        <Routes>
          <Route path="/" Component={Homepage} exact />
          <Route path="/coins/:id" Component={CoinPage} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
