import React from 'react';
import { TimelineEvent } from '../lib/types';

interface TimelineSectionProps {
  events: TimelineEvent[];
}

export function TimelineSection({ events }: TimelineSectionProps) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="relative pl-8 pb-8 last:pb-0">
          <div className="absolute left-0 top-0 h-full w-px bg-blue-200">
            <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-blue-500" />
          </div>
          <div className="rounded-lg bg-blue-50 p-4">
            <h4 className="font-semibold text-blue-700 mb-2">{event.year}</h4>
            <p className="text-gray-700">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
