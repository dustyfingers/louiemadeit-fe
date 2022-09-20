// import libs/other
import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ToastsStore } from 'react-toasts';

import {
    setPackName,
    setPackDescription,
    setPackZipFile,
    setPackCoverArt,
} from '../redux/admin/pack/pack-actions';
import s3Helper from '../helpers/s3Upload';
import { apiLink } from '../env';

const PackUploadForm = ({ name, description, coverArt, zipFile, dispatch }) => {
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async evt => {
        evt.preventDefault();
        setUploading(true);

        const s3GenPutUrl = `${apiLink}/s3/generate-put-url`;
        let zipFileName, coverArtFileName;

        try {
            if (name && coverArt && zipFile) {
                await s3Helper.handleUploadToS3(coverArt[0], s3GenPutUrl);
                coverArtFileName = coverArt[0].name;
                ToastsStore.success('Cover art uploaded.');

                await s3Helper.handleUploadToS3(zipFile[0], s3GenPutUrl);
                zipFileName = zipFile[0].name;
                ToastsStore.success('Zip file uploaded.');
            } else {
                if (!name) ToastsStore.error('Name is required to create a pack!');
                if (!coverArt)
                    ToastsStore.error('Cover art is required to create a pack!');
                if (!zipFile) ToastsStore.error('Zip file is required to create a pack!');
            }
        } catch (error) {
            ToastsStore.error('There was an error while uploading your pack.');
            return;
        }

        try {
            await axios.post(`${apiLink}/packs/new`, {
                packName: name,
                coverArt: coverArtFileName,
                zip: zipFileName,
                meta: { description },
            });
            ToastsStore.success('Pack created successfully!');
        } catch (error) {
            ToastsStore.error('There was an error while creating your pack.');
            return;
        }

        setUploading(false);
    };

    return (
        <form
            method="post"
            id="uploadPackForm"
            className="d-flex flex-column align-items-center"
            onSubmit={handleSubmit}
        >
            <div>
                <div id="textSection" className="mt-2 mb-4">
                    <div className="mb-2">
                        <label htmlFor="packName" className="form-label">
                            Pack Name:
                        </label>
                        <input
                            type="text"
                            name="packName"
                            className="form-control form-control-lg"
                            id="packName"
                            aria-describedby="packName"
                            onChange={evt => dispatch(setPackName(evt.target.value))}
                            disabled={uploading ? true : false}
                        />
                    </div>
                    <div>
                        <label htmlFor="packDescription" className="form-label">
                            Description:
                        </label>
                        <input
                            type="text"
                            name="packDescription"
                            className="form-control form-control-lg"
                            id="packDescription"
                            aria-describedby="packDescription"
                            onChange={evt =>
                                dispatch(setPackDescription(evt.target.value))
                            }
                            disabled={uploading ? true : false}
                        />
                    </div>
                </div>
                <div id="filesSection" className="mb-4">
                    <div className="mb-2">
                        <label htmlFor="coverArt" className="form-label">
                            Cover Art:
                        </label>
                        <input
                            className="form-control"
                            type="file"
                            id="coverArt"
                            name="coverArt"
                            accept="image/*"
                            onChange={evt => dispatch(setPackCoverArt(evt.target.files))}
                            disabled={uploading ? true : false}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="packZipFile" className="form-label">
                            Zip File:
                        </label>
                        <input
                            className="form-control"
                            type="file"
                            id="packZipFile"
                            name="packZipFile"
                            accept=".zip,.rar,.7zip"
                            onChange={evt => dispatch(setPackZipFile(evt.target.files))}
                            disabled={uploading ? true : false}
                        />
                    </div>
                </div>
            </div>

            <input
                type="submit"
                className={`btn btn-primary ${uploading ? 'disabled' : ''}`}
                value={`${uploading ? 'Uploading Pack...' : 'Publish Pack'}`}
            />
        </form>
    );
};

const mapStateToProps = state => ({
    name: state.pack.name,
    description: state.pack.description,
    coverArt: state.pack.coverArt,
    zipFile: state.pack.zipFile,
});

export default connect(mapStateToProps)(PackUploadForm);
