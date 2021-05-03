// import libs/other
import React, { useEffect } from 'react';
import axios from 'axios';
import { connect } from "react-redux";

// import components
import { apiLink } from '../env';

// TODO: get this route working properly
const CustomerProfilePage = ({ currentUser, history }) => {
    console.log({currentUser});
    useEffect(() => {
        if (currentUser) {
            let url = `${apiLink}/user/user/${currentUser.id}`;

            console.log(url);
    
            axios.get(url).then(res => {
                console.log(res);
            });
        } else history.push('/sign-in');
    }, []);

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