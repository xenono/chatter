import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";
import Signup from "./Signup";

import 'bootstrap/dist/css/bootstrap.css';
import PageNotFound from "./PageNotFound";


const Root = props => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/chat" element={<Chat {...props}/>}/>
                <Route path="/" element={<Login {...props}/>}/>
                <Route path="/signup" element={<Signup {...props}/>}/>
                <Route path="*" element={<PageNotFound {...props}/>}/>
            </Routes>
        </BrowserRouter>

    );
};

Root.propTypes = {};

export default Root;