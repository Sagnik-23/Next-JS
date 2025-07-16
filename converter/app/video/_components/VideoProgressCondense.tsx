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
        <span className="text-sm text-white font-medium">
          Processing...
          <Loader className="inline-block w-4 h-4 animate-spin ml-1" />
        </span>
        <span className="text-sm text-gray-400">{seconds}s</span>
      </div>

      {/* Custom Progress Bar */}
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
