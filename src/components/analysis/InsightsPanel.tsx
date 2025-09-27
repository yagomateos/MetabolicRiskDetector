import React from 'react';
import { Brain } from 'lucide-react';
import { Insight } from '../../types';
import { Card, CardHeader, CardTitle } from '../ui/Card.tsx';

interface InsightsPanelProps {
  insights: Insight[];
}

export const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-4 w-4 mr-1" />
          Insights IA
        </CardTitle>
      </CardHeader>
      <div className="space-y-3">
        {insights.map((insight, idx) => (
          <div key={idx} className={`p-3 rounded-lg ${
            insight.severity === 'high' ? 'bg-red-50 border-l-4 border-red-500' :
            insight.severity === 'medium' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
            'bg-blue-50 border-l-4 border-blue-500'
          }`}>
            <h4 className="font-semibold text-sm">{insight.title}</h4>
            <p className="text-xs text-gray-700 mt-1">{insight.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};