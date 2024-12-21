import React, { useState } from 'react';
import { Icons } from './components/icons';
import { PredictionForm } from './components/PredictionForm';
import { PredictionResult } from './components/PredictionResult';
import { getPrediction } from './lib/gemini';

function App() {
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (topic: string) => {
    setIsLoading(true);
    try {
      const result = await getPrediction(topic);
      setPrediction(result);
    } catch (error) {
      console.error('Error getting prediction:', error);
      setPrediction('Sorry, there was an error generating the prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Icons.Brain className="w-20 h-20 text-blue-600" />
              <Icons.Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Tech Future Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore the future of technology with AI-powered predictions. Get detailed insights about upcoming trends, breakthroughs, and their impact on society.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="w-full max-w-md bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-lg">
            <PredictionForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
          <PredictionResult prediction={prediction} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App
