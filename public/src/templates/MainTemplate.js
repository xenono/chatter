import React from 'react';
import PropTypes from 'prop-types';
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const MainTemplate = ({children}) => {
    return (
        <>
            <Navigation />
            { children }
            <Footer />
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