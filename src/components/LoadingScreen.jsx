import React from 'react';
import '../styles/LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loader">
            <div className="triangle"></div>
            <div className="circle"></div>
            <div className="octagon1"></div>
            <div className="octagon2"></div>
        </div>
    )
};

export default LoadingScreen;