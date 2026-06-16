import React, { useState } from 'react';

const FileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);

const CodeInput = ({ onAnalyze, isLoading }) => {
    const [activeTab, setActiveTab] = useState('text');
    const [code, setCode] = useState('');
    const [fileForSubmission, setFileForSubmission] = useState(null);
    const [fileName, setFileName] = useState('');
    const [language, setLanguage] = useState('python');
    const handleFileChange = async (selectedFile) => {
        if (!selectedFile) return;
        setFileForSubmission(selectedFile);
        setFileName(selectedFile.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target.result;
            setCode(fileContent);
        };
        reader.readAsText(selectedFile);
        setActiveTab('text');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleFileChange(e.dataTransfer.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleSubmit = () => {
        if (fileForSubmission) {
            onAnalyze('file', { language, file: fileForSubmission });
        } else if (code) {
            onAnalyze('text', { language, code });
        }
    };

    const handleTabSwitch = (tabName) => {
        setActiveTab(tabName);
        setCode('');
        setFileForSubmission(null);
        setFileName('');
    }

    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-xl h-full flex flex-col">
            <div className="flex-shrink-0 flex justify-between items-center border-b border-gray-700 mb-4">
                <div>
                    <button onClick={() => handleTabSwitch('text')} className={`py-2 px-4 font-semibold transition-colors ${activeTab === 'text' ? 'border-b-2 border-teal-400 text-white' : 'text-gray-400 hover:text-white'}`}>
                        Paste Code
                    </button>
                    <button onClick={() => handleTabSwitch('file')} className={`py-2 px-4 font-semibold transition-colors ${activeTab === 'file' ? 'border-b-2 border-teal-400 text-white' : 'text-gray-400 hover:text-white'}`}>
                        Upload File
                    </button>
                </div>
                <div>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-md focus:ring-teal-500 focus:border-teal-500 block w-full px-3 py-1"
                    >
                        <option value="python">Python</option>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                    </select>
                </div>
            </div>

            <div className="flex-grow min-h-0">
                {activeTab === 'text' ? (
                    <textarea
                        className="w-full h-full p-4 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-300 font-mono text-sm resize-none"
                        placeholder={`Paste your ${language.toUpperCase()} code here...`}
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value);
                            setFileForSubmission(null);
                            setFileName('');
                        }}
                        readOnly={!!fileForSubmission}
                    />
                ) : (
                    <div
                        className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-teal-400 transition-colors h-full flex flex-col justify-center items-center"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => document.getElementById('file-input').click()}
                    >
                        <input type="file" id="file-input" className="hidden" accept=".py,.cpp,.java" onChange={(e) => handleFileChange(e.target.files[0])} />                        <p className="text-gray-400">Drag & drop a file here, or click to select</p>
                        <p className="text-xs text-gray-500 mt-2">File content will be shown in the 'Paste Code' tab.</p>
                    </div>
                )}
            </div>
            {fileName && activeTab === 'text' && (
                <div className="flex-shrink-0 mt-4 text-sm text-gray-400 flex items-center justify-center bg-gray-700/50 p-2 rounded-md">
                    <FileIcon />
                    <span className="font-semibold">Loaded from: {fileName}</span>
                </div>
            )}
            <div className="flex-shrink-0 mt-4 text-center">
                <button
                    onClick={handleSubmit}
                    disabled={isLoading || !code}
                    className="w-full bg-teal-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-600 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Analyzing...' : 'Analyze Code'}
                </button>
            </div>
        </div>
    );
};

export default CodeInput;