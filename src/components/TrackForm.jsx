// import libs/other
import React, { useState } from "react";
import axios from "axios";

const TrackForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [sellType, setSellType] = useState("");
    const [exclusivePrice, setExclusivePrice] = useState("");
    const [leaseStemsPrice, setLeaseStemsPrice] = useState("");
    const [leaseMasterOnlyPrice, setLeaseMasterOnlyPrice] = useState("");
    const [taggedVersion, setTaggedVersion] = useState("");
    const [untaggedVersion, setUntaggedVersion] = useState("");
    const [coverArt, setCoverArt] = useState("");
    const [trackStems, setTrackStems] = useState("");


    const handleSubmit = async evt => {
        evt.preventDefault();
        const formData = { name, description, sellType, exclusivePrice, leaseStemsPrice, leaseMasterOnlyPrice, taggedVersion, untaggedVersion, coverArt, trackStems };
        const url = 'http://localhost:5000/s3/generate-put-url';

        // * connect to s3 bucket, and upload all rich media
        // tagged version
        if (formData.taggedVersion) {
            let file = formData.taggedVersion[0];
            const options = {
                params: {
                    Key: file.name,
                    ContentType: file.type
                }
            }
            // url the tagged version is stored at
            const urlResponse = await axios.get(url, options);
            const { putUrl } = urlResponse.data;

            // save this url in the db
            const uploadResponse = await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
            console.log(uploadResponse.config.url);
            console.log("tagged version upload successful");
        }


        // untagged version
        if (formData.untaggedVersion) {
            let file = formData.untaggedVersion[0];
            const options = {
                params: {
                    Key: file.name,
                    ContentType: file.type
                }
            }
            // url the tagged version is stored at
            const urlResponse = await axios.get(url, options);
            const { putUrl } = urlResponse.data;

            // save this url in the db
            const uploadResponse = await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
            console.log(uploadResponse.config.url);
            console.log("untagged version upload successful");
        }

        // cover art
        if (formData.coverArt) {
            let file = formData.coverArt[0];
            const options = {
                params: {
                    Key: file.name,
                    ContentType: file.type
                }
            }
            // url the tagged version is stored at
            const urlResponse = await axios.get(url, options);
            const { putUrl } = urlResponse.data;

            // save this url in the db
            const uploadResponse = await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
            console.log(uploadResponse.config.url);
            console.log("cover art upload successful");
        }

        // track stems
        let stemsUrls = [];
        for (const [key, file] of Object.entries(formData.trackStems)) {
            console.log(file);
            const options = {
                params: {
                    Key: file.name,
                    ContentType: file.type
                }
            }
            const urlResponse = await axios.get(url, options);
            const { putUrl } = urlResponse.data;

            const uploadResponse = await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
            console.log(uploadResponse.config.url);
            stemsUrls.push(uploadResponse.config.url);
        }
        console.log("track stems upload successful");

        // TODO: if all uploads are successful call create track endpoint
    }

    return (
        <div id="uploadTrackFormContainer">
            <form method="post" id="uploadTrackForm" onSubmit={handleSubmit}>

                {/* name */}
                <div className="mb-3">
                    <label htmlFor="trackName" className="form-label">Track Name:</label>
                    <input
                        type="text"
                        name="trackName"
                        className="form-control form-control-lg"
                        id="trackName"
                        aria-describedby="trackName"
                        onChange={evt => setName(evt.target.value)} />
                </div>

                {/* description */}
                <div className="mb-3">
                    <label htmlFor="trackDescription" className="form-label">Description:</label>
                    <input
                        type="text"
                        name="trackDescription"
                        className="form-control form-control-lg"
                        id="trackDescription"
                        aria-describedby="trackDescription"
                        onChange={evt => setDescription(evt.target.value)} />
                    <div id="trackDescriptionHelp" className="form-text">A short description of the track.</div>
                </div>


                {/* filesSection */}
                <div id="filesSection" className="mb-3">
                    Files:

                    {/* taggedVersion */}
                    <div className="form-file form-file-lg mb-2">
                        <input
                            type="file"
                            className="form-file-input"
                            id="taggedVersion"
                            name="taggedVersion"
                            accept="audio/*"
                            onChange={evt => setTaggedVersion(evt.target.files)} />
                        <label className="form-file-label" htmlFor="taggedVersion">
                            <span className="form-file-text">Upload Tagged Version...</span>
                            <span className="form-file-button">Browse</span>
                        </label>
                    </div>


                    {/* untaggedVersion */}
                    <div className="form-file form-file-lg mb-2">
                        <input
                            type="file"
                            className="form-file-input"
                            id="untaggedVersion"
                            name="untaggedVersion"
                            accep="audio/*"
                            onChange={evt => setUntaggedVersion(evt.target.files)} />
                        <label className="form-file-label" htmlFor="untaggedVersion">
                            <span className="form-file-text">Upload Untagged Version...</span>
                            <span className="form-file-button">Browse</span>
                        </label>
                    </div>


                    {/* coverArt */}
                    <div className="form-file form-file-lg mb-2">
                        <input
                            type="file"
                            className="form-file-input"
                            id="coverArt"
                            name="coverArt"
                            accep="image/*"
                            onChange={evt => setCoverArt(evt.target.files)} />
                        <label className="form-file-label" htmlFor="coverArt">
                            <span className="form-file-text">Upload Cover Art...</span>
                            <span className="form-file-button">Browse</span>
                        </label>
                    </div>


                    {/* trackStems */}
                    <div className="form-file form-file-lg mb-2">
                        <input
                            type="file"
                            className="form-file-input"
                            id="trackStems"
                            name="trackStems[]"
                            accep="audio/*"
                            onChange={evt => setTrackStems(evt.target.files)}
                            multiple />
                        <label className="form-file-label" htmlFor="trackStems">
                            <span className="form-file-text">Upload Track Stems...</span>
                            <span className="form-file-button">Browse</span>
                        </label>
                    </div>
                </div>


                {/* sell type */}
                <div className="mb-3">
                    Sell Type:

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exclusive" id="exclusive" name="exclusive" defaultChecked />
                        <label className="form-check-label" htmlFor="exclusive">Exclusive</label>
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="lease" id="lease" name="lease" defaultChecked />
                        <label className="form-check-label" htmlFor="lease">Lease</label>
                    </div>
                </div>

                {/* prices */}
                <div className="mb-3">
                    Prices:
                    <br />

                    <label>
                        Exclusive Price:
                        <input
                            type="number"
                            name="exclusivePrice"
                            id="exclusivePrice"
                            onChange={evt => setExclusivePrice(evt.target.value)} />
                    </label>
                    <br />

                    <label>
                        Lease Price - Stems:
                        <input
                            type="number"
                            name="leaseStemsPrice"
                            id="leaseStemsPrice"
                            onChange={evt => setLeaseStemsPrice(evt.target.value)} />
                    </label>
                    <br />

                    <label>
                        Lease Price - Master:
                        <input
                            type="number"
                            name="leaseMasterOnlyPrice"
                            id="leaseMasterOnlyPrice"
                            onChange={evt => setLeaseMasterOnlyPrice(evt.target.value)} />
                    </label>
                    <br />
                </div>
                <br />

                {/* submit button */}
                <input type="submit" className="btn btn-primary" value="Publish Track" />
            </form>
            <form>

            </form>
        </div>
    );
};

export default TrackForm;
