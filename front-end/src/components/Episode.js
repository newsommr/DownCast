import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { StyledDownloadButton, StyledSpinner } from './StyledComponents';

/**
 * Episode Component
 * 
 * This component represents a single podcast episode. It displays the episode title
 * and provides a button to download the episode.
 * 
 * @param {Object} props - The component's props.
 * @param {Object} props.details - Details about the episode.
 * @returns {JSX.Element} The rendered component.
 */
const Episode = ({ details }) => {
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Handles the download of an episode.
     * 
     * This function will:
     * 1. Set the loading state.
     * 2. Make a network request to fetch the episode file.
     * 3. Trigger a download of the file in the user's browser.
     * 4. Handle any errors that may occur during the process.
     */
    const handleDownload = async () => {
        setIsLoading(true);

        // Extracting the necessary details.
        const { enclosureUrl, title } = details;

        try {
            const response = await axios.post('/download_episode/', null, {
                params: { episode_url: enclosureUrl },
                responseType: 'blob' // Expected response type to handle file downloads.
            });

            // Initiating the download for the user.
            const downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob([response.data]));
            downloadLink.setAttribute('download', `${title}.mp3`);
            document.body.appendChild(downloadLink);
            downloadLink.click();
        } catch (error) {
            toast.error("Error downloading episode", {
                autoClose: 2000
            });
        } finally {
            // Resetting the loading state.
            setIsLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <span>{details.title}</span>
            <StyledDownloadButton onClick={handleDownload} disabled={isLoading}>
                <i className="fas fa-download"></i>
            </StyledDownloadButton>
            {isLoading && <StyledSpinner />}
        </div>
    );
};

export default Episode;
