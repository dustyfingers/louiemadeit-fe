// import libs/other
import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { ToastsStore } from 'react-toasts';

import { 
    setTrackName, 
    setTrackDescription,
    setTrackTaggedVersion,
    setTrackUntaggedVersion,
    setTrackCoverArt,
    setTrackStems
} from '../../redux/admin/upload/upload-actions';
import { apiLink } from '../../env';

const TrackUploadForm = ({ name, description, sellType, exclusivePrice, leaseStemsPrice, leaseMasterOnlyPrice, taggedVersion,untaggedVersion, coverArt, trackStems, dispatch }) => {
    const [allFilesUploaded, setAllFilesUploaded] = useState(false);
    
    const handleSubmit = async evt => {
        evt.preventDefault();
        const formData = { 
            name, 
            description, 
            sellType, 
            exclusivePrice, 
            leaseStemsPrice, 
            leaseMasterOnlyPrice, 
            taggedVersion, untaggedVersion, 
            coverArt, 
            trackStems 
        };
        const s3GenPutUrl = `${apiLink}/s3/generate-put-url`;

        let taggedVersionFileName = '',
            untaggedVersionFileName = '',
            coverArtFileName = '',
            stemsFileName = '';

        ToastsStore.success('Uploading track files!');

        try {
            // TODO: this file upload stuff can be pulled out and put into a single function to call

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

                await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
                taggedVersionFileName = file.name;
                ToastsStore.success('Tagged version uploaded to AWS S3 successfully.');
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

                await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
                untaggedVersionFileName = file.name;
                ToastsStore.success('Untagged version uploaded to AWS S3 successfully.');
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

                await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
                coverArtFileName = file.name;
                ToastsStore.success('Cover art uploaded to AWS S3 successfully.');
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

                await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
                stemsFileName = file.name;
                ToastsStore.success('Track stems uploaded to s3 successfully.');
                setAllFilesUploaded(true);
            }
            
        } catch (error) {
            console.log({error});
            ToastsStore.error('There was an error while uploading your track.');
        }

        // if all uploads are successful call 'create track' endpoint and handle response
        if (allFilesUploaded) {
            try {
                const createTrackUrl = apiLink + '/track/new';
                const options = {
                    trackName: name,
                    taggedVersion: taggedVersionFileName,
                    untaggedVersion: untaggedVersionFileName,
                    coverArt: coverArtFileName,
                    stems: stemsFileName,
                    meta: {
                        description
                    }
                }
                await axios.post(createTrackUrl, options);
                ToastsStore.success('Track created successfully.');
    
            } catch (error) {
                console.log({error});
                ToastsStore.error('There was an error while uploading your track.');
            }
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
                        onChange={evt => dispatch(setTrackName(evt.target.value))} />
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
                        onChange={evt => dispatch(setTrackDescription(evt.target.value))} />
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
                            onChange={evt => dispatch(setTrackTaggedVersion(evt.target.files))} />
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
                            onChange={evt => dispatch(setTrackUntaggedVersion(evt.target.files))} />
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
                            onChange={evt => dispatch(setTrackCoverArt(evt.target.files))} />
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
                            onChange={evt => dispatch(setTrackStems(evt.target.files))} />
                        <label className="form-file-label" htmlFor="trackStems">
                            <span className="form-file-text">Upload Track Stems...</span>
                            <span className="form-file-button">Browse</span>
                        </label>
                    </div>
                </div>

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

export default connect(mapStateToProps)(TrackUploadForm);
