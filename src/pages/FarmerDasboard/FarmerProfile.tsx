import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from "react";

const FarmerProfile = () => {
    const [textToCopy, setTextToCopy] = useState(''); // State to manage the text to be copied
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span className="block text-center text-red-500 font-medium">Your browser does not support speech recognition.</span>;
    }

    const handleCopyText = () => {
        navigator.clipboard.writeText(transcript).then(() => {
            alert('Text copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    return (
        <div className="max-w-3xl mx-auto my-10 p-8 bg-white rounded-xl shadow-lg">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Speech to Text Converter</h2>
                <p className="text-gray-600">A React hook that converts speech from the microphone to text and makes it available to your React components.</p>
            </div>

            <div 
                className="min-h-48 p-5 bg-gray-50 rounded-lg border border-gray-200 mb-8 cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-300"
                onClick={handleCopyText}
            >
                {transcript ? (
                    <p className="text-gray-800">{transcript}</p>
                ) : (
                    <p className="text-gray-400 text-center italic">Your speech will appear here. Click to copy.</p>
                )}
            </div>

            <div className="flex justify-center gap-5">
                <button 
                    className="flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-full transition-all hover:bg-green-600 hover:shadow-md hover:-translate-y-1"
                    onClick={startListening}
                >
                    <span className="mr-2">🎤</span>
                    Start Listening
                </button>
                <button 
                    className="flex items-center px-6 py-3 bg-red-500 text-white font-semibold rounded-full transition-all hover:bg-red-600 hover:shadow-md hover:-translate-y-1"
                    onClick={SpeechRecognition.stopListening}
                >
                    <span className="mr-2">⏹️</span>
                    Stop Listening
                </button>
            </div>
        </div>
    );
};

export default FarmerProfile;