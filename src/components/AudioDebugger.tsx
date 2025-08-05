import React, { useState, useEffect } from 'react';

interface AudioDebuggerProps {
  onBack?: () => void;
}

const AudioDebugger: React.FC<AudioDebuggerProps> = ({ onBack }) => {
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<{[key: string]: string}>({});

  const addLog = (message: string) => {
    setDebugLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    console.log(message);
  };

  const testAudioFiles = async () => {
    const audioFiles = [
      '/audio/music/theme-birthday.mp3',
      '/audio/music/celebration.mp3',
      '/audio/music/gentle-piano.mp3',
      '/audio/music/ambient-magical.mp3',
      '/audio/sounds/balloon-pop.mp3',
      '/audio/sounds/word-hover.mp3',
      '/audio/sounds/sparkle.mp3',
      '/audio/sounds/cake-cut.mp3',
      '/audio/sounds/happy-birthday.mp3',
      '/audio/sounds/confetti.mp3',
      '/audio/sounds/countdown-tick.mp3',
      '/audio/sounds/countdown-complete.mp3',
      '/audio/sounds/button-click.mp3',
      '/audio/sounds/page-transition.mp3'
    ];

    addLog('Starting audio file tests...');
    
    for (const file of audioFiles) {
      try {
        addLog(`Testing fetch for: ${file}`);
        const response = await fetch(file);
        if (response.ok) {
          setTestResults(prev => ({...prev, [file]: `✅ Fetch OK: ${response.status}`}));
          addLog(`✅ Fetch successful for ${file}: ${response.status}`);
          
          // Test audio loading
          addLog(`Testing audio loading for: ${file}`);
          const audio = new Audio();
          
          const loadPromise = new Promise<string>((resolve) => {
            const timeout = setTimeout(() => {
              resolve('❌ Timeout after 5s');
            }, 5000);
            
            audio.addEventListener('canplaythrough', () => {
              clearTimeout(timeout);
              resolve(`✅ Audio loaded: duration ${audio.duration}s`);
            }, { once: true });
            
            audio.addEventListener('error', (e) => {
              clearTimeout(timeout);
              const error = (e.target as HTMLAudioElement)?.error;
              resolve(`❌ Audio error: ${error?.code} - ${error?.message}`);
            }, { once: true });
            
            audio.src = file;
            audio.load();
          });
          
          const audioResult = await loadPromise;
          setTestResults(prev => ({...prev, [`${file}_audio`]: audioResult}));
          addLog(`Audio test result for ${file}: ${audioResult}`);
          
        } else {
          setTestResults(prev => ({...prev, [file]: `❌ Fetch failed: ${response.status} ${response.statusText}`}));
          addLog(`❌ Fetch failed for ${file}: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        const errorMsg = `❌ Exception: ${error instanceof Error ? error.message : String(error)}`;
        setTestResults(prev => ({...prev, [file]: errorMsg}));
        addLog(`Exception testing ${file}: ${errorMsg}`);
      }
    }
    
    addLog('Audio file tests completed!');
  };

  useEffect(() => {
    testAudioFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Audio Debug Information</h1>
        {onBack && (
          <button
            onClick={onBack}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            Back to App
          </button>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="space-y-2 text-sm">
            {Object.entries(testResults).map(([file, result]) => (
              <div key={file} className="bg-gray-800 p-2 rounded">
                <div className="font-mono text-xs text-gray-400">{file}</div>
                <div className={result.includes('✅') ? 'text-green-400' : 'text-red-400'}>
                  {result}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Debug Logs</h2>
          <div className="bg-gray-800 p-4 rounded h-96 overflow-y-auto">
            {debugLogs.map((log, index) => (
              <div key={index} className="text-xs text-gray-300 mb-1 font-mono">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
        <div className="bg-gray-800 p-4 rounded text-sm">
          <div>User Agent: {navigator.userAgent}</div>
          <div>Current URL: {window.location.href}</div>
          <div>Protocol: {window.location.protocol}</div>
          <div>Host: {window.location.host}</div>
        </div>
      </div>
    </div>
  );
};

export default AudioDebugger;
