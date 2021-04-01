// import libs/other
import React, { useState, useEffect } from "react";
import axios from "axios";

const SingleTrack = () => {
    // DONE: this component should have a text input and a submit button 

    // upon submit it takes the file name, fetches from s3 and displays it 
    const [name, setName] = useState("");
    const [trackUrl, setTrackUrl] = useState("");

    // updates whenever trackUrl changes
    // useEffect(() => console.log(trackUrl), [trackUrl])

    const handleSubmit = async evt => {
        evt.preventDefault();

        const url = "http://localhost:5000/s3/generate-get-url";

        const options = {
            params: {
                Key: name
            }
        };

        const urlResponse = await axios.get(url, options);

        // ! this works!!! we just need to update the application state with this info to play thje track with the player in the footer
        setTrackUrl(urlResponse.data.getUrl);
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

export default SingleTrack;
