import React, { useState } from 'react';
import EpisodeList from './EpisodeList';

/**
 * Podcast Component
 * 
 * This component represents a single podcast. It displays the podcast title and 
 * provides a list of episodes. If there are more than 5 episodes, it allows the user
 * to toggle between seeing the first 5 episodes and seeing all episodes.
 * 
 * @param {Object} props - The component's props.
 * @param {string} props.title - The title of the podcast.
 * @param {Array} props.episodes - A list of episode details.
 * @returns {JSX.Element} The rendered component.
 */
const Podcast = ({ title, episodes }) => {
    const [showAll, setShowAll] = useState(false);

    // Styles for the title. Ideally, these should be moved to a CSS/SCSS file.
    const titleStyle = {
        textAlign: 'center'
    };

    return (
        <div>
            <h3 style={titleStyle}>{title}</h3>
            <EpisodeList episodes={showAll ? episodes : episodes.slice(0, 5)} />
            {episodes.length > 5 && (
                <button className="see-all" onClick={() => setShowAll(prevState => !prevState)}>
                    {showAll ? "See Less" : "See All"}
                </button>
            )}
        </div>
    );
};

export default Podcast;
