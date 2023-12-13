import styled from 'styled-components';

export const StyledUploadZone = styled.div`
  width: 100%; 
  max-width: 400px; 
  margin: 0 auto;
  height: 150px;
  border: 4px dashed #6c63ff;
  background-color: #f3f4f6;
  border-radius: 15px;
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  color: #6c63ff;
  animation: pulse 1s infinite alternate;

  &:hover {
    border-color: #4a47a3;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      background-color: #f3f4f6;
    }
    50% {
      transform: scale(1.05);
      background-color: #e0e1e3;
    }
    100% {
      transform: scale(1);
      background-color: #f3f4f6;
    }
  }
`;

export const StyledDownloadButton = styled.button`
  background: transparent;
  border: none;
  margin-top: 10px; 
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 12px; 
  color: #6c63ff;

  &:hover {
    color: #4a47a3;
  }

  &:disabled {
    cursor: not-allowed;
    color: #ccc;
  }

  i {
    margin-right: 5px;
  }
`;

export const StyledSpinner = styled.div`
  border: 4px solid rgba(108, 99, 255, 0.1);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border-top: 4px solid #6c63ff;
  margin-left: 5px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
