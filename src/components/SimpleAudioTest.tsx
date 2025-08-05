import React, { useState, useEffect } from 'react';

const SimpleAudioTest: React.FC = () => {
  const [results, setResults] = useState<{[key: string]: string}>({});

  useEffect(() => {
    const testSingleFile = async () => {
      const testFile = '/audio/music/theme-birthday.mp3';
      
      try {
        console.log('Testing fetch...');
        const response = await fetch(testFile);
        console.log('Fetch response:', response);
        
        if (response.ok) {
          const blob = await response.blob();
          console.log('Blob info:', blob.type, blob.size);
          setResults(prev => ({...prev, fetch: `✅ Fetch OK: ${response.status}, Type: ${blob.type}, Size: ${blob.size}`}));
          
          // Test if blob can be converted to audio URL
          const audioUrl = URL.createObjectURL(blob);
          console.log('Blob URL created:', audioUrl);
          
          // Test audio element with blob URL
          const audio = new Audio();
          audio.src = audioUrl;
          
          const audioTest = new Promise<string>((resolve) => {
            const timeout = setTimeout(() => resolve('❌ Audio timeout'), 5000);
            
            audio.addEventListener('loadeddata', () => {
              clearTimeout(timeout);
              resolve(`✅ Audio loaded from blob: ${audio.duration}s`);
            });
            
            audio.addEventListener('error', (e) => {
              clearTimeout(timeout);
              const error = (e.target as HTMLAudioElement)?.error;
              resolve(`❌ Audio error: ${error?.code} - ${error?.message}`);
            });
            
            audio.load();
          });
          
          const audioResult = await audioTest;
          setResults(prev => ({...prev, audio: audioResult}));
          
          // Cleanup
          URL.revokeObjectURL(audioUrl);
          
        } else {
          setResults(prev => ({...prev, fetch: `❌ Fetch failed: ${response.status}`}));
        }
      } catch (error) {
        setResults(prev => ({...prev, fetch: `❌ Exception: ${error}`}));
      }
    };

    testSingleFile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Audio Test</h1>
      <div className="space-y-2">
        {Object.entries(results).map(([test, result]) => (
          <div key={test} className="bg-gray-800 p-3 rounded">
            <strong>{test}:</strong> {result}
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <p className="text-sm text-gray-400">
          Testing: /audio/music/theme-birthday.mp3
        </p>
        <p className="text-sm text-gray-400">
          Current URL: {window.location.href}
        </p>
      </div>
    </div>
  );
};

export default SimpleAudioTest;
