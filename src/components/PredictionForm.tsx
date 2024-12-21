import React, { useState, useEffect, useRef } from 'react';
    import { Icons } from './icons';

    interface PredictionFormProps {
      onSubmit: (topic: string) => void;
      isLoading: boolean;
    }

    const suggestions = [
      'Artificial Intelligence',
      'Quantum Computing',
      'Biotechnology',
      'Renewable Energy',
      'Space Exploration',
      'Virtual Reality',
      'Augmented Reality',
      'Blockchain Technology',
      'Nanotechnology',
      'Cybersecurity',
      'Robotics',
      '5G Technology',
      'Internet of Things',
      'Cloud Computing',
      'Machine Learning',
      'Data Science',
      'Edge Computing',
      '3D Printing',
      'Autonomous Vehicles',
      'Genetic Engineering',
    ];

    export function PredictionForm({ onSubmit, isLoading }: PredictionFormProps) {
      const [topic, setTopic] = useState('');
      const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
      const [showSuggestions, setShowSuggestions] = useState(false);
      const [suggestionIndex, setSuggestionIndex] = useState(-1);
      const inputRef = useRef<HTMLInputElement>(null);

      useEffect(() => {
        if (topic) {
          const filtered = suggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(topic.toLowerCase())
          );
          setFilteredSuggestions(filtered);
          setShowSuggestions(true);
          setSuggestionIndex(-1);
        } else {
          setFilteredSuggestions([]);
          setShowSuggestions(false);
          setSuggestionIndex(-1);
        }
      }, [topic]);

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (topic.trim()) {
          onSubmit(topic);
          setShowSuggestions(false);
        }
      };

      const handleSuggestionClick = (suggestion: string) => {
        setTopic(suggestion);
        setShowSuggestions(false);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      };

      const handleKeyDown = (e: React.KeyboardEvent) => {
        if (showSuggestions) {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSuggestionIndex((prevIndex) =>
              prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0
            );
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSuggestionIndex((prevIndex) =>
              prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1
            );
          } else if (e.key === 'Enter') {
            e.preventDefault();
            if (suggestionIndex !== -1) {
              handleSuggestionClick(filteredSuggestions[suggestionIndex]);
            } else if (topic.trim()) {
              handleSubmit(e);
            }
          } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setSuggestionIndex(-1);
          }
        }
      };

      return (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              onFocus={() => topic && setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a technology topic (e.g., Quantum Computing)"
              className="w-full pl-10 pr-12 py-3 rounded-lg bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors duration-200"
            >
              <Icons.Send size={18} />
            </button>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-md z-10">
                {filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      index === suggestionIndex ? 'bg-blue-100' : ''
                    }`}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>
      );
    }
