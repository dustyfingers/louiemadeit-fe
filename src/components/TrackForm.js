// import libs/other
import React, { useState } from "react";

const TrackForm = () => {

    return (
        <div id="upload-form-container">
            <form action="localhost:5000/track/new" method="post">
                <label>
                    Name:
                    <input type="text" name="track name" />
                </label>
                <br />


                <label>
                    Description:
                    <input type="text" name="track description" />
                </label>
                <br />


                <label>
                    Upload Tagged Version:
                    <input
                        type="file"
                        id="tagged-version"
                        name="tagged version"
                        accept="audio/*" />
                </label>
                <br />


                <label>
                    Upload Untagged Version:
                    <input
                        type="file"
                        id="untagged-version"
                        name="untagged version"
                        accept="audio/*" />
                </label>
                <br />


                <label>
                    Upload Cover Art:
                    <input
                        type="file"
                        id="untagged-version"
                        name="untagged version"
                        accept="image/*" />
                </label>
                <br />


                <label>
                    Upload Track Stems:
                    <input
                        type="file"
                        id="track-stems"
                        name="track stems"
                        accept="audio/*" multiple />
                </label>
                <br />


                <div>
                    Determine Sell Type:
                    <br />

                    <input type="checkbox" id="exclusive" name="exclusive" checked></input>
                    <label for="exclusive">Exclusive</label>
                    <br />

                    <input type="checkbox" id="lease" name="lease" checked></input>
                    <label for="lease">Lease</label>
                    <br />
                </div>
                <br />

                {/* submit button */}
                <input type="submit" value="Create Track" />
            </form>
        </div>
    );
};

export default TrackForm;
