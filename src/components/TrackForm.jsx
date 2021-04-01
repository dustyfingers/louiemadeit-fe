// import libs/other
import React, { useState } from "react";
import { connect } from "react-redux"
import axios from "axios";

const TrackForm = ({name, description, sellType, exclusivePrice, leaseStemsPrice, leaseMasterOnlyPrice, taggedVersion, untaggedVersion, coverArt, trackStems, dispatch}) => {
    const handleSubmit = async evt => {
        evt.preventDefault();
        const formData = { name, description, sellType, exclusivePrice, leaseStemsPrice, leaseMasterOnlyPrice, taggedVersion, untaggedVersion, coverArt, trackStems };
        const s3GenPutUrl = 'http://localhost:5000/s3/generate-put-url';

        let taggedVersionUrl = '',
            untaggedVersionUrl = '',
            coverArtUrl = '',
            stemsUrl = '';

            console.log('uploading files...!');

        // * connect to s3 bucket, upload all rich media, get back urls
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
            const urlResponse = await axios.get(s3GenPutUrl, options);
            const { putUrl } = urlResponse.data;

            // save this url in the db
            const uploadResponse = await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
            taggedVersionUrl = uploadResponse.config.url;
            console.log(taggedVersionUrl);
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
            const urlResponse = await axios.get(s3GenPutUrl, options);
            const { putUrl } = urlResponse.data;

            // save this url in the db
            const uploadResponse = await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
            untaggedVersionUrl = uploadResponse.config.url;
            console.log(untaggedVersionUrl);
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
            const urlResponse = await axios.get(s3GenPutUrl, options);
            const { putUrl } = urlResponse.data;

            // save this url in the db
            const uploadResponse = await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
            coverArtUrl = uploadResponse.config.url;
            console.log(coverArtUrl);
            console.log("cover art upload successful");
        }

        // track stems
        if (formData.trackStems) {
            let file = formData.trackStems[0];
            const options = {
                params: {
                    Key: file.name,
                    ContentType: file.type
                }
            }
            const urlResponse = await axios.get(s3GenPutUrl, options);
            const { putUrl } = urlResponse.data;

            const uploadResponse = await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
            stemsUrl = uploadResponse.config.url;

            console.log(stemsUrl);
            console.log("track stems upload successful");
        }

        // if all uploads are successful call 'create track' endpoint and handle response
        try {
            const createTrackUrl = 'http://localhost:5000/track/new';
            const options = {
                taggedVersionUrl,
                untaggedVersionUrl,
                coverArtUrl,
                stemsUrl
            }
            const res = await axios.post(createTrackUrl, options);
            console.log(res);
        } catch (err) {
            console.log(err)
        }
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
                        onChange={evt => dispatch({ type: "SET_TRACK_NAME", payload: evt.target.value })} />
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
                        onChange={evt => dispatch({ type: "SET_TRACK_DESCRIPTION", payload: evt.target.value })} />
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
                            onChange={evt => dispatch({ type: "SET_TAGGED_VERSION", payload: evt.target.files })} />
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
                            accept="audio/*"
                            onChange={evt => dispatch({ type: "SET_UNTAGGED_VERSION", payload: evt.target.files })} />
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
                            accept="image/*"
                            onChange={evt => dispatch({ type: "SET_COVER_ART", payload: evt.target.files })} />
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
                            name="trackStems"
                            accept=".zip,.rar,.7zip"
                            onChange={evt => dispatch({ type: "SET_TRACK_STEMS", payload: evt.target.files })} />
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
                            onChange={evt => dispatch({ type: "SET_EXCLUSIVE_PRICE", payload: evt.target.value })} />
                    </label>
                    <br />

                    <label>
                        Lease Price - Stems:
                        <input
                            type="number"
                            name="leaseStemsPrice"
                            id="leaseStemsPrice"
                            onChange={evt => dispatch({ type: "SET_LEASE_STEMS_PRICE", payload: evt.target.value })} />
                    </label>
                    <br />

                    <label>
                        Lease Price - Master:
                        <input
                            type="number"
                            name="leaseMasterOnlyPrice"
                            id="leaseMasterOnlyPrice"
                            onChange={evt => dispatch({ type: "SET_LEASE_MASTER_ONLY_PRICE", payload: evt.target.value })} />
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

const mapStateToProps = state => ({
    name: state.upload.name, 
    description: state.upload.description, 
    sellType: state.upload.sellType,
    exclusivePrice: state.upload.exclusivePrice,
    leaseStemsPrice: state.upload.leaseStemsPrice, 
    leaseMasterOnlyPrice: state.upload.leaseMasterOnlyPrice, 
    taggedVersion: state.upload.taggedVersion,
    untaggedVersion: state.upload.untaggedVersion, 
    coverArt: state.upload.coverArt,
    trackStems: state.upload.trackStems
});

export default connect(mapStateToProps)(TrackForm);
