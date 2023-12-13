import React from 'react';
import './App.css';
import UploadComponent from './components/UploadComponent';

function App() {
    return (
        <div className="App">
            <header className="App-header">
            <h1><a href="/">DownCast</a></h1>
            <p>a download tool for Overcast users</p>
                <UploadComponent />
            </header>
        </div>
    );
}

export default App;