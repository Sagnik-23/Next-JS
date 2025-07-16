import { Loader } from 'lucide-react';
import React from 'react';

export const VideoProgressCondense = ({
  progress,
  seconds,
}: {
  progress: number;
  seconds: number;
}) => {
  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-white font-medium">Processing...<Loader className="inline-block w-4 h-4 animate-spin" /></span>
        <span className="text-sm text-gray-400">{seconds}s</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
        <div
          className="bg-lime-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-right text-xs text-gray-300 mt-1">
        {progress.toFixed(0)}%
      </div>
    </div>
  );
};
