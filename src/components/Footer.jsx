import React from "react";

import CustomPlayer from "./CustomPlayer/CustomPlayer";

const Footer = () => {
    return (
        <footer className="navbar fixed-bottom m-0 p-0 bg-light" id="FooterMenu">
            <div className="w-100">
                <CustomPlayer />
            </div>
        </footer>
    );
}

export default Footer;