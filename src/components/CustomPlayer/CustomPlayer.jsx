// import libs/other
import React from "react";
import ReactPlayer from "react-player";

// takes in url and plays a track - to be used on the main shop page and the single track page
const CustomPlayer = ({track}) => {
    return (
        <div className="player-wrapper">
            <ReactPlayer 
                url="https://beetz.s3.us-east-2.amazonaws.com/export_example.wav?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY7ZEYML4HLTQAQXU%2F20210331%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20210331T160230Z&X-Amz-Expires=120&X-Amz-Signature=4f548ce2a4ce5d803eefd9b86a29023e05fda10bdccb60b779889c6c9523e908&X-Amz-SignedHeaders=host"
                width='100%'
                height='100%' 
                controls />
        </div>
    );
};

export default CustomPlayer;