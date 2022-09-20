import React from 'react';

import CustomPlayer from './CustomPlayer';

const Footer = () => {
    return (
        <footer className="navbar fixed-bottom bg-light" id="FooterMenu">
            <div className="container">
                <span>
                    Built with love by{' '}
                    <a href="https://www.louiewilliford.com/">Louie Williford</a> &copy;
                    2021
                </span>
                <CustomPlayer />
            </div>
        </footer>
    );
};

export default Footer;
