import { GoogleGenerativeAI } from '@google/generative-ai';
    import { PredictionResponse } from './types';

    const genAI = new GoogleGenerativeAI('AIzaSyAGIPnMhy9VFh069KCggV-iT4axekv9ZzU');

    export async function getPrediction(topic: string): Promise<PredictionResponse> {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `As an AI technology expert, provide a detailed structured prediction about the future of the technology or field: "${topic}" in the next 5-10 years. Format the response in JSON with the following structure:

    {
      "summary": "2-3 sentence executive summary",
      "developments": [
        {
          "id": 1,
          "title": "Brief title",
          "description": "Detailed description"
        }
      ],
      "timeline": [
        {
          "year": "Next 2-3 years",
          "description": "Expected developments"
        },
        {
          "year": "5-7 years",
          "description": "Expected developments"
        },
        {
          "year": "8-10 years",
          "description": "Expected developments"
        }
      ],
      "impact": {
        "benefits": ["List of positive societal impacts"],
        "risks": ["List of potential risks"]
      },
      "challenges": ["List of key challenges and considerations"]
    }

    Ensure the response is detailed, well-structured, and backed by current technological trends. If the topic is not a specific technology, provide a prediction about the future of that field.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        // Parse the JSON response
        const parsedResponse = JSON.parse(text);
        return parsedResponse;
      } catch (error) {
        console.error('Error parsing Gemini response:', error);
        // Fallback to basic structure if JSON parsing fails
        return {
          summary: text.split('\n')[0],
          developments: [],
          timeline: [],
          impact: {
            benefits: [],
            risks: []
          },
          challenges: []
        };
      }
    }
