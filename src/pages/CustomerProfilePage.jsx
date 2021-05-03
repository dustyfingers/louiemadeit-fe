// import libs/other
import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// import components
import { apiLink } from '../env';

const CustomerProfilePage = ({ currentUser }) => {
    console.log({currentUser});
    // useEffect(() => {
    //     if (currentUser) {
    //         let url = `${apiLink}/user/user/${currentUser.id}`;

    //         console.log(url);
    
    //         axios.get(url).then(res => {
    //             console.log(res);
    //         });
    //     }
    // }, []);
    if (currentUser === null) return <Redirect to="/sign-in" />;

    return (
        <div className="d-flex flex-column justify-content-center text-center">
            <h1>CUSTOMER PROFILE</h1>
            <div className="d-flex flex-wrap justify-content-center pb-5">
                CUSTOMER LICENSES HERE
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(CustomerProfilePage);