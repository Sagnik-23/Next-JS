"use client"

import { VideoInputSettings, QualityType, VideoFormats } from "@/utils/types"
import { motion } from "framer-motion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type VideoInputProps = {
  videoSettings: VideoInputSettings
  onVideoSettingsChange: (value: VideoInputSettings) => void
  disabled: boolean
}

export const VideoInput = ({
  videoSettings,
  onVideoSettingsChange,
  disabled,
}: VideoInputProps) => {
  const { twitterCompressionComand, whatsappCompressionComand, quality } = videoSettings

  const currentValue = twitterCompressionComand
    ? "twitter"
    : whatsappCompressionComand
    ? "whatsapp"
    : "none"

  const handleCompressionChange = (value: string) => {
    onVideoSettingsChange({
      ...videoSettings,
      twitterCompressionComand: value === "twitter",
      whatsappCompressionComand: value === "whatsapp",
    })
  }

  const handleQualityChange = (value: QualityType) => {
    onVideoSettingsChange({
      ...videoSettings,
      quality: value,
    })
  }
    const handleFormatChange = (value: VideoFormats) => {
        onVideoSettingsChange({
        ...videoSettings,
        videoType: value,
        })
    }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative col-span-1 lg:col-span-3 rounded-xl border border-gray-800 bg-slate-800 backdrop-blur-md shadow-md p-4 mt-2"
    >
      <p className="text-white text-sm font-medium mb-4">Compression Presets</p>

      <RadioGroup
        value={currentValue}
        onValueChange={handleCompressionChange}
        disabled={disabled}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="none" />
          <Label htmlFor="none" className="text-gray-300">
            No Compression (Use Custom Quality)
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="whatsapp" id="whatsapp" />
          <Label htmlFor="whatsapp" className="text-gray-300">
            WhatsApp Compression
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <RadioGroupItem value="twitter" id="twitter" />
          <Label htmlFor="twitter" className="text-gray-300">
            Twitter Compression
          </Label>
        </div>
      </RadioGroup>

      {/* Show Quality Dropdown Only When No Compression is Selected */}
      {currentValue === "none" && (
        <div className="mt-4">
          <Label className="text-white mb-1 block text-sm">Select Quality</Label>
          <Select
            value={quality}
            onValueChange={(val: QualityType) => handleQualityChange(val)}
            disabled={disabled}
          >
            <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Select Quality" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 text-white border-slate-600">
              <SelectItem value={QualityType.High}>High</SelectItem>
              <SelectItem value={QualityType.Medium}>Mid</SelectItem>
              <SelectItem value={QualityType.Low}>Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      <Label className="text-white mb-1 mt-2 block text-sm">Select Format</Label>
          <Select
            value={videoSettings.videoType}
            onValueChange={(val: VideoFormats) => handleFormatChange(val)}
            disabled={disabled}
          >
            <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Select Quality" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 text-white border-slate-600">
              <SelectItem value={VideoFormats.MP4}>MP4</SelectItem>
              <SelectItem value={VideoFormats.MKV}>MKV</SelectItem>
              <SelectItem value={VideoFormats.WEBM}>WEBM</SelectItem>
            </SelectContent>
          </Select>
    </motion.div>
  )
}

export default VideoInput
