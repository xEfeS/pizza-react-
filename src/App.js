import React from "react";
import './App.css';
import {Header} from "./components";
import {Main, Cart} from "./pages";
import {Route} from "react-router-dom";


function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Route path='/' component={Main} exact/>
                <Route path='/cart' component={Cart} exact/>
            </div>
        </div>
    );
}

export default App;
