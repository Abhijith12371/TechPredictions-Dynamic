// Define types for the prediction data
export interface Development {
  id: number;
  title: string;
  description: string;
}

export interface TimelineEvent {
  year: string;
  description: string;
}

export interface PredictionResponse {
  summary: string;
  developments: Development[];
  timeline: TimelineEvent[];
  impact: {
    benefits: string[];
    risks: string[];
  };
  challenges: string[];
}
