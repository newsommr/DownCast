import React from 'react';
import Podcast from './Podcast';

const PodcastList = ({ podcasts }) => (
    <div>
        {Object.entries(podcasts).map(([podcastName, episodes]) => (
            <Podcast key={podcastName} title={podcastName} episodes={episodes} />
        ))}
    </div>
);

export default PodcastList;
