import React from 'react';
import PropTypes from 'prop-types';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {theme}from  "../theme/theme"
import {ThemeProvider} from "styled-components";

const MainTemplate = ({children}) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Navigation />
                { children }
                <Footer />
            </ThemeProvider>

        </>
    );
};

MainTemplate.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
};

export default MainTemplate;