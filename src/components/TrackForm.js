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

        // tagged version
        if (formData.taggedVersion) {
            let file = formData.taggedVersion[0];
            const options = {
                params: {
                    Key: `${file.name}-${Date.now()}`,
                    ContentType: file.type
                }
            }
            const urlResponse = await axios.get(url, options);
            const { putUrl } = urlResponse.data;

            console.log(putUrl);

            const uploadResponse = await axios.put(putUrl, file, { headers: { 'Content-Type': file.type } });
            console.log(uploadResponse);
        }

        // TODO: rest of this
        // // untagged version
        // if (formData.untaggedVersion) {

        // }
        // // cover art
        // if (formData.coverArt) {

        // }
        // // track stems
        // for (const [key, value] of Object.entries(formData.trackStems)) {
        //     console.log(value);
        //     const options = {
        //         params: {
        //             Key: value.name,
        //             ContentType: value.type
        //         }
        //     }
        //     const res = await axios.get(url, formData, options);
        //     console.log(res);
        // }
    }

    return (
        <div id="uploadTrackFormContainer">
            <form method="post" id="uploadTrackForm" onSubmit={handleSubmit}>

                {/* name */}
                <label>
                    Name:
                    <input
                        type="text"
                        name="trackName"
                        id="trackName"
                        onChange={evt => setName(evt.target.value)} />
                </label>
                <br />


                {/* description */}
                <label>
                    Description:
                    <input
                        type="text"
                        name="trackDescription"
                        id="trackDescription"
                        onChange={evt => setDescription(evt.target.value)} />
                </label>
                <br />


                {/* sell type */}
                <div>
                    Sell Type:
                    <br />

                    <input
                        type="checkbox"
                        id="exclusive"
                        name="exclusive"
                        defaultChecked />
                    <label htmlFor="exclusive">Exclusive</label>
                    <br />

                    <input
                        type="checkbox"
                        id="lease"
                        name="lease"
                        defaultChecked />
                    <label htmlFor="lease">Lease</label>
                    <br />
                </div>
                <br />


                {/* prices */}
                <div>
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


                {/* taggedVersion */}
                <label>
                    Upload Tagged Version:
                    <input
                        type="file"
                        id="taggedVersion"
                        name="taggedVersion"
                        accept="audio/*"
                        onChange={evt => setTaggedVersion(evt.target.files)} />
                </label>
                <br />


                {/* untaggedVersion */}
                <label>
                    Upload Untagged Version:
                    <input
                        type="file"
                        id="untaggedVersion"
                        name="untaggedVersion"
                        accept="audio/*"
                        onChange={evt => setUntaggedVersion(evt.target.files)} />
                </label>
                <br />


                {/* coverArt */}
                <label>
                    Upload Cover Art:
                    <input
                        type="file"
                        id="coverArt"
                        name="coverArt"
                        accept="image/*"
                        onChange={evt => setCoverArt(evt.target.files)} />
                </label>
                <br />


                {/* trackStems */}
                <label>
                    Upload Track Stems:
                    <input
                        type="file"
                        id="trackStems"
                        name="trackStems[]"
                        accept="audio/*"
                        onChange={evt => setTrackStems(evt.target.files)}
                        multiple />
                </label>
                <br />


                {/* submit button */}
                <input type="submit" value="Publish Track" />
            </form>
        </div>
    );
};

export default TrackForm;
