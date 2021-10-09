// import libs/other
import React, { useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import TrackPreviewCard from '../components/TrackPreviewCard/TrackPreviewCard'
import PackPreviewCard from '../components/PackPreviewCard'
import { setShopTracks } from '../redux/shop-tracks/shop-tracks-actions'
import { setDisplayedTracks } from '../redux/displayed-tracks/displayed-tracks-actions'
import { setShopPacks } from '../redux/shop-packs/shop-packs-actions'
import { setDisplayedPacks } from '../redux/displayed-packs/displayed-packs-actions'
import { setCurrentTrack } from '../redux/player/player-actions'
import { apiLink } from '../env'

const StorePage = ({ displayedTracks, displayedPacks, currentTrack, dispatch }) => {
    const fetchTracks = async () => {
        const res = await axios.get(`${apiLink}/tracks/all`)
        dispatch(setShopTracks(res.data.tracks))
        dispatch(setDisplayedTracks(res.data.tracks))
    }

    const fetchPacks = async () => {
        const res = await axios.get(`${apiLink}/packs/all`)
        dispatch(setShopPacks(res.data.packs))
        dispatch(setDisplayedPacks(res.data.packs))
    }

    useEffect(() => { 
        if (!displayedTracks) fetchTracks()
        if (!displayedPacks) fetchPacks()
     }, [])

    // equivalent to onComponentDidUnmount()
    useEffect(() => () => dispatch(setCurrentTrack('')), [])

    // change page title dynamically on song change
    // TODO: make the title change to the name of the track, not the link to it
    useEffect(() => {
        if (currentTrack) document.title = currentTrack
        else document.title = "louiemadeit - shop"
    }, [currentTrack])

    return (
        <div className="pb-5">
            <h1 className="text-center">TRACKS</h1>
            <div>
                {displayedTracks ? 
                    (displayedTracks.length ? (
                        <div className="row">
                            {displayedTracks.map(track => <TrackPreviewCard type='track' track={track} key={track._id}/>)}
                        </div>) 
                        : 'No tracks found...')
                    : 'Wakey wakey server...'}
            </div>
            <h1 className="text-center">SAMPLE PACKS</h1>
            <div>
                {displayedPacks ? 
                    (displayedPacks.length ? (
                        <div className="row">
                            {displayedPacks.map(pack => <PackPreviewCard type='pack' pack={pack}/>)}
                        </div>) 
                        : 'No tracks found...')
                    : 'Wakey wakey server...'}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    displayedTracks: state.displayedTracks.displayedTracks,
    displayedPacks: state.displayedPacks.displayedPacks,
    currentTrack: state.player.currentTrack
})

export default connect(mapStateToProps)(StorePage)