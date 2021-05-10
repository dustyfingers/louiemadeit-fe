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
import './TrackUploadForm.scss';

const TrackUploadForm = ({ name, description, sellType, exclusivePrice, leaseStemsPrice, leaseMasterOnlyPrice, taggedVersion,untaggedVersion, coverArt, trackStems, dispatch }) => {
    const [uploading, setUploading] = useState(false);

    const handleUploadToS3 = async (file, putUrl) => {
        const options = {
            params: {
                Key: file.name,
                ContentType: file.type
            }
        }
        const urlResponse = await axios.get(putUrl, options);

        await axios.put(urlResponse.data.putUrl, file, { headers: { 'Content-Type': file.type } });
    }

    const handleSubmit = async evt => {
        setUploading(true);
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

        ToastsStore.success('Uploading track!');

        try {
            if (formData.taggedVersion) {
                let file = formData.taggedVersion[0];
                await handleUploadToS3(file, s3GenPutUrl);
                taggedVersionFileName = file.name;
                ToastsStore.success('Tagged version uploaded to AWS S3.');
            } else throw 'No tagged version given!';

            if (formData.untaggedVersion) {
                let file = formData.untaggedVersion[0];
                await handleUploadToS3(file, s3GenPutUrl);
                untaggedVersionFileName = file.name;
                ToastsStore.success('Untagged version uploaded to AWS S3.');
            } else throw 'No untagged version given!';

            if (formData.coverArt) {
                let file = formData.coverArt[0];
                await handleUploadToS3(file, s3GenPutUrl);
                coverArtFileName = file.name;
                ToastsStore.success('Cover art uploaded to AWS S3.');
            } else throw 'No cover art given!';

            if (formData.trackStems) {
                let file = formData.trackStems[0];
                await handleUploadToS3(file, s3GenPutUrl);
                stemsFileName = file.name;
                ToastsStore.success('Stems uploaded to s3.');
            } else throw 'No stems given!';
            
        } catch (error) {
            ToastsStore.error('There was an error while uploading your track.');
        }


        try {
            const createTrackUrl = `${apiLink}/track/new`;
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
            ToastsStore.success('Track uploaded successfully!');

        } catch (error) {
            ToastsStore.error('There was an error while uploading your track.');
        }
    
        setUploading(false);
    }

    return (
            <form method="post" id="uploadTrackForm" onSubmit={handleSubmit}>

                <div id="textSection" className="mt-2 mb-4">
                    <div className="mb-2">
                        <label htmlFor="trackName" className="form-label">Track Name:</label>
                        <input
                            type="text"
                            name="trackName"
                            className="form-control form-control-lg"
                            id="trackName"
                            aria-describedby="trackName"
                            onChange={evt => dispatch(setTrackName(evt.target.value))} 
                            disabled={uploading ? true : false} />
                    </div>

                    <div>
                        <label htmlFor="trackDescription" className="form-label">Description:</label>
                        <input
                            type="text"
                            name="trackDescription"
                            className="form-control form-control-lg"
                            id="trackDescription"
                            aria-describedby="trackDescription"
                            onChange={evt => dispatch(setTrackDescription(evt.target.value))}
                            disabled={uploading ? true : false} />
                    </div>
                </div>

                <div id="filesSection" className="mb-4">
                    <div className="mb-2">
                        <label htmlFor="taggedVersion" className="form-label">Tagged Version:</label>
                        <input 
                            className="form-control"
                            type="file"
                            id="taggedVersion"
                            name="taggedVersion"
                            accept="audio/*"
                            onChange={evt => dispatch(setTrackTaggedVersion(evt.target.files))}
                            disabled={uploading ? true : false} />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="untaggedVersion" className="form-label">Untagged Version:</label>
                        <input 
                            className="form-control" 
                            type="file"
                            id="untaggedVersion"
                            name="untaggedVersion"
                            accept="audio/*"
                            onChange={evt => dispatch(setTrackUntaggedVersion(evt.target.files))}
                            disabled={uploading ? true : false} />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="coverArt" className="form-label">Cover Art:</label>
                        <input 
                            className="form-control" 
                            type="file"
                            id="coverArt"
                            name="coverArt"
                            accept="image/*"
                            onChange={evt => dispatch(setTrackCoverArt(evt.target.files))} 
                            disabled={uploading ? true : false} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Stems:</label>
                        <input 
                            className="form-control" 
                            type="file"
                            id="trackStems"
                            name="trackStems"
                            accept=".zip,.rar,.7zip"
                            onChange={evt => dispatch(setTrackStems(evt.target.files))}
                            disabled={uploading ? true : false} />
                    </div>
                </div>

                <input 
                    type="submit" 
                    className={`btn btn-primary ${uploading ? 'disabled' : ''}`} 
                    value={`${uploading ? 'Uploading Track...' : 'Publish Track'}`} />
            </form>
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
