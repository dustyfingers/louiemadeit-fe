import React, {useState} from 'react';
import axios from 'axios';

import { apiLink } from '../env';

const FetchCurrentUser = () => {
    const [sessionUser, setSessionUser] = useState();

    // for testing sessions
    const fetchCurrentUser = async () => {
        let res = await axios.get(`${apiLink}/current-user`, {}, {withCredentials: true});
        console.log({ data: res.data})
        await setSessionUser(res.data.user);
    }

    return (
        <div>
            <p>{sessionUser}</p>
            <button className="btn btn-primary" onClick={fetchCurrentUser}>Fetch Current User</button>
        </div>);
};

export default FetchCurrentUser;