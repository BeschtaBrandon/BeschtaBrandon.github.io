import React from "react";
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Contact from "../components/Contact/Contact";
import Home from "../components/Home/Home";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import News from "../components/News/News";
import Resources from "../components/Education/Resources";
import Stocks from "../components/Stocks/Stocks";
import Weather from "../components/Weather/Weather";
import Work from "../components/Work/Work";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <div className="content">
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/work" component={Work} />
        <Route path="/contact" component={Contact} />
        <Route path="/stocks" component={Stocks} />
        <Route path="/news" component={News} />
        <Route path="/weather" component={Weather} />
        <Route path="/education" component={Resources} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
