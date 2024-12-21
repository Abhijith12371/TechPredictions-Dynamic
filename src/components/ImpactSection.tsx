import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ImpactSectionProps {
  benefits: string[];
  risks: string[];
}

export function ImpactSection({ benefits, risks }: ImpactSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h4 className="font-semibold text-green-700 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Benefits
        </h4>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-sm font-medium">
                {index + 1}
              </span>
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-3">
        <h4 className="font-semibold text-red-700 flex items-center gap-2">
          <XCircle className="w-5 h-5" />
          Risks
        </h4>
        <ul className="space-y-2">
          {risks.map((risk, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-sm font-medium">
                {index + 1}
              </span>
              <span className="text-gray-700">{risk}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
