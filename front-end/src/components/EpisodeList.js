import React from 'react';
import Episode from './Episode';

const EpisodeList = ({ episodes }) => (
    <div>
        {episodes.map((episode, index) => (
            <Episode key={index} details={episode} />
        ))}
    </div>
);

export default EpisodeList;
