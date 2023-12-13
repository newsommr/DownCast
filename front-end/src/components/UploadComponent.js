import React, { useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadZone from './UploadZone';
import PodcastList from './PodcastList';

// Setting the default base URL for axios.
axios.defaults.baseURL = 'https://fastapi-example-blss.onrender.com';

/**
 * UploadComponent
 * A component responsible for handling the upload, display, and download of podcasts.
 * 
 * @returns {JSX.Element} Rendered component.
 */
const UploadComponent = () => {
    const inputFileRef = useRef(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [podcasts, setPodcasts] = useState({});

    /**
     * Handles changes to the file input, including validation and file submission.
     * @param {Object} event - The triggered event.
     */
    const onFileChange = async (event) => {
        const file = event?.target?.files[0];

        if (!file || !file.name.endsWith('.opml')) {
            return toast.error("Please upload a .opml file from Overcast.", {
                autoClose: 2000
            });
        }

        const formData = new FormData();
        formData.append('opml_file', file);

        try {
            const { data } = await axios.post('/upload/', formData);
            setPodcasts(data);
            setIsUploaded(true);
            toast.success("Successful Upload");
        } catch (error) {
            // More detailed error handling can be implemented based on error responses from the server.
            toast.error("Error parsing file", {
                autoClose: 2000
            });
        }
    };

    /**
     * Handles file drops on the upload zone.
     * @param {Object} event - The drop event.
     */
    const handleDrop = (event) => {
        const files = event?.dataTransfer?.files;

        if (files && files.length) {
            inputFileRef.current.files = files;
            onFileChange({ target: { files } });
        }
    };

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                style={{ fontSize: '14px' }}
            />
            {!isUploaded && (
                <UploadZone 
                    onClick={() => inputFileRef.current.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        handleDrop(e);
                    }}
                >
                    Drag & Drop or Click to Upload
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        onChange={onFileChange}
                        ref={inputFileRef}
                    />
                </UploadZone>
            )}
            {Object.keys(podcasts).length > 0 && <PodcastList podcasts={podcasts} />}
        </div>
    );
};

export default UploadComponent;
