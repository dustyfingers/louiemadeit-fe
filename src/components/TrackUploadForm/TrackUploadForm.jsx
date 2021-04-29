// import libs/other
import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import { 
    setTrackName, 
    setTrackDescription,
    setTrackTaggedVersion,
    setTrackUntaggedVersion,
    setTrackCoverArt,
    setTrackStems
} from '../../redux/admin/upload/upload-actions';
import { apiLink } from '../../env';

const TrackUploadForm = ({name, description, sellType, exclusivePrice, leaseStemsPrice, leaseMasterOnlyPrice, taggedVersion, untaggedVersion, coverArt, trackStems, dispatch}) => {
    const handleSubmit = async evt => {
        evt.preventDefault();
        const formData = { name, description, sellType, exclusivePrice, leaseStemsPrice, leaseMasterOnlyPrice, taggedVersion, untaggedVersion, coverArt, trackStems };
        const s3GenPutUrl = `${apiLink}/s3/generate-put-url`;

        let taggedVersionFileName = '',
            untaggedVersionFileName = '',
            coverArtFileName = '',
            stemsFileName = '';

        console.log('uploading files to aws s3...!');

        // try file upload
        try {
            // TODO: this file upload stuff can be pulled out and put into a single function to call
            // * connect to s3 bucket, upload all rich media
            // if success, upload all file names to mongo
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
                console.log('uploading tagged version to aws s3...!');
                await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
                taggedVersionFileName = file.name;
                console.log("tagged version upload to s3 successful");
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
                console.log('uploading untagged version to aws s3...!');
                await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
                untaggedVersionFileName = file.name;
                console.log("untagged version upload to s3 successful");
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
                console.log('uploading cover art to aws s3...!');
                await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
                coverArtFileName = file.name;
                console.log("cover art upload to s3 successful");
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

                console.log('uploading stems to aws s3...!');
                await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
                stemsFileName = file.name;
                console.log("track stems upload to s3 successful");
            }
            
        } catch (err) {
            console.log('error when uploading files to aws s3', err)
        }

        // if all uploads are successful call 'create track' endpoint and handle response
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
            const res = await axios.post(createTrackUrl, options);
            console.log(res);
        } catch (err) {
            console.log('error creating track', err)
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
