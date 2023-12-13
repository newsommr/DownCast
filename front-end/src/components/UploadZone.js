import React from 'react';
import { StyledUploadZone } from './StyledComponents';

const UploadZone = ({ onClick, onDragOver, onDragEnter, onDrop, children }) => (
    <StyledUploadZone onClick={onClick} onDragOver={onDragOver} onDragEnter={onDragEnter} onDrop={onDrop}>
        {children}
    </StyledUploadZone>
);

export default UploadZone;
