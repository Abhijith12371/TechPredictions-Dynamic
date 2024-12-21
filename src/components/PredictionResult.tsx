import React from 'react';
import { Section } from './Section';
import { Icons } from './icons';
import { TimelineSection } from './TimelineSection';
import { ImpactSection } from './ImpactSection';
import type { PredictionResponse } from '../lib/types';

interface PredictionResultProps {
  prediction: PredictionResponse | null;
  isLoading: boolean;
}

export function PredictionResult({ prediction, isLoading }: PredictionResultProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mt-8 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!prediction) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mt-8 space-y-6">
      <Section
        icon={Icons.Brain}
        title="Executive Summary"
        content={
          <p className="text-gray-700 leading-relaxed">
            {prediction.summary}
          </p>
        }
      />

      <Section
        icon={Icons.Lightbulb}
        title="Key Developments"
        content={
          <ul className="space-y-4">
            {prediction.developments.map((development) => (
              <li key={development.id} className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-700 mb-2">{development.title}</h4>
                <p className="text-gray-700">{development.description}</p>
              </li>
            ))}
          </ul>
        }
      />

      <Section
        icon={Icons.Clock}
        title="Timeline"
        content={<TimelineSection events={prediction.timeline} />}
      />

      <Section
        icon={Icons.Impact}
        title="Societal Impact"
        content={
          <ImpactSection 
            benefits={prediction.impact.benefits}
            risks={prediction.impact.risks}
          />
        }
      />

      <Section
        icon={Icons.AlertTriangle}
        title="Challenges & Considerations"
        content={
          <ul className="space-y-3">
            {prediction.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-gray-700">{challenge}</span>
              </li>
            ))}
          </ul>
        }
        className="border-l-4 border-amber-400"
      />
    </div>
  );
}
