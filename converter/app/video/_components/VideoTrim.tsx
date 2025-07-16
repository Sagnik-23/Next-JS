"use client";

import { VideoInputSettings } from "@/utils/types";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

type VideoTrimProps = {
  videoSettings: VideoInputSettings & { duration: number }; // you need duration to set slider max
  onVideoSettingsChange: (value: VideoInputSettings) => void;
  disabled: boolean;
};

export const VideoTrim = ({
  videoSettings,
  onVideoSettingsChange,
  disabled,
}: VideoTrimProps) => {
  const { customStartTime, customEndTime, duration } = videoSettings;

  const handleChange = (value: number[]) => {
    if (value.length === 2) {
      onVideoSettingsChange({
        ...videoSettings,
        customStartTime: Math.min(...value),
        customEndTime: Math.max(...value),
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative col-span-1 lg:col-span-3 rounded-xl border border-gray-800 bg-slate-800 backdrop-blur-md shadow-md p-4"
    >
      <div className="mb-2">
        <p className="text-white text-sm font-medium">Trim Video</p>
        <div className="flex justify-between text-gray-400 text-xs mt-1">
          <span>Start: {customStartTime.toFixed(1)}s</span>
          <span>End: {customEndTime.toFixed(1)}s</span>
        </div>
      </div>

      <Slider
        min={0}
        max={duration}
        step={0.1}
        value={[customStartTime, customEndTime]}
        onValueChange={handleChange}
        disabled={disabled}
        className=""
      />
    </motion.div>
  );
};
