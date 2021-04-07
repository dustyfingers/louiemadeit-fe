// import libs/other
import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { apiLink } from "../env";

const SingleTrack = ({dispatch}) => {
    // DONE: this component should have a text input and a submit button 

    // upon submit it takes the file name, fetches from s3 and displays it 
    const [name, setName] = useState("");

    // updates whenever trackUrl changes
    // useEffect(() => console.log(trackUrl), [trackUrl])

    const handleSubmit = async evt => {
        evt.preventDefault();

        // TODO: this link should change based on env
        const url = apiLink + "/s3/generate-get-url";

        const options = {
            params: {
                Key: name
            }
        };

        const urlResponse = await axios.get(url, options);
        let getUrl = urlResponse.data.getUrl;

        // set app state with given url
        dispatch({ type: 'SET_CURRENT_TRACK', payload: getUrl });
    }

    return (
        <div id="uploadTrackFormContainer">
            <form method="post" id="fetchFromS3" onSubmit={handleSubmit}>

                {/* file name */}
                <div className="mb-3">
                    <label htmlFor="fileName" className="form-label">File Name:</label>
                    <input
                        type="text"
                        name="fileName"
                        className="form-control form-control-lg"
                        id="fileName"
                        aria-describedby="fileName"
                        onChange={evt => setName(evt.target.value)} />
                    <div id="fileNameHelp" className="form-text">The name of a file stored in an S3 bucket.</div>
                </div>

                {/* submit button */}
                <input type="submit" className="btn btn-primary" value="Fetch From S3" />
            </form>
        </div>
    );
};

// passing connect with no props gives us the dispatch function passed in as a prop by default!
export default connect()(SingleTrack);
