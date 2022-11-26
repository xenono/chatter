import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Chat from "./Chat";
import Login from "./Login";
import Signup from "./Signup";

import 'bootstrap/dist/css/bootstrap.css';
import PageNotFound from "./PageNotFound";
import {Provider} from "react-redux";
import store from "../store/store";
import {CookiesProvider, withCookies} from "react-cookie";


const Root = props => {
    return (
        <CookiesProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/chat" element={<Chat {...props} cookies={props.cookies}/>} />
                        <Route path="/" element={<Login {...props}/>}/>
                        <Route path="/signup" element={<Signup {...props}/>}/>
                        <Route path="*" element={<PageNotFound {...props}/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        </CookiesProvider>
    );
};

Root.propTypes = {};

export default withCookies(Root);