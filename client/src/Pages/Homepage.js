import React from 'react';
import Navbar from '../Components/Navbar';
import FrontPage from '../Components/FrontPage';

const Homepage = ({newToken, popularity, setPopularity, active, setActive, activeUri, setActiveUri, activeFeatures, setActiveFeatures, playlistArr, setPlaylistArr, activeId, setActiveId, mood, setMood, valence, setValence, key, setKey, danceability, setDanceability, energy, setEnergy, tempo, setTempo, prefPopularity, setPrefPopularity, prefMood, setPrefMood, prefKey, setPrefKey, prefDanceability, setPrefDanceability, prefEnergy, setPrefEnergy, prefTempo, setPrefTempo, loading, setLoading}) => {
    return(
        <div>
            <Navbar />
            <FrontPage
                newToken={newToken}
                active={active}
                setActive={setActive}
                activeUri={activeUri}
                popularity={popularity}
                setPopularity={setPopularity}
                setActiveUri={setActiveUri}
                activeFeatures={activeFeatures}
                setActiveFeatures={setActiveFeatures}
                playlistArr={playlistArr}
                setPlaylistArr={setPlaylistArr}
                activeId={activeId}
                setActiveId={setActiveId}
                mood={mood}
                setMood={setMood}
                valence={valence}
                setValence={setValence}
                key={key}
                setKey={setKey}
                danceability={danceability}
                setDanceability={setDanceability}
                energy={energy}
                setEnergy={setEnergy}
                tempo={tempo}
                setTempo={setTempo}
                prefPopularity={prefPopularity}
                setPrefPopularity={setPrefPopularity}
                prefMood={prefMood}
                setPrefMood={setPrefMood}
                prefKey={prefKey}
                setPrefKey={setPrefKey}
                prefDanceability={prefDanceability}
                setPrefDanceability={setPrefDanceability}
                prefEnergy={prefEnergy}
                setPrefEnergy={setPrefEnergy}
                prefTempo={prefTempo}
                setPrefTempo={setPrefTempo}
                loading={loading}
                setLoading={setLoading}
            />
        </div>
    )
}

export default Homepage