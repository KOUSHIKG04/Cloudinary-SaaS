import React, { useEffect, useState, useCallback } from "react";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import { FileDown, FileUp, Clock, ArrowRight } from "lucide-react";
import dayjs from "dayjs";
import realativeTime from "dayjs/plugin/relativeTime";
import { filesize } from "filesize";
import { Video } from "@prisma/client";
import Link from "next/link";
import { DownloadButton } from "./DownloadButton";

dayjs.extend(realativeTime);

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const getThumbnailUrl = useCallback((publicId: string) => {
    return getCldImageUrl({
      src: publicId,
      width: 400,
      height: 225,
      crop: "fill",
      format: "auto",
      quality: "auto",
      assetType: "video",
    });
  }, []);

  const getFullVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 1928,
      height: 1080,
    });
  }, []);

  const getPreviewVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 400,
      height: 225,
      crop: "fill",
      format: "auto",
      quality: "auto",
      assetType: "video",
      rawTransformations: ["e_preview: duration_15: max_seg_9: min_seg_dur_1"],
    });
  }, []);

  const formatSize = useCallback((size: number) => {
    return filesize(size);
  }, []);

  const formatDuration = useCallback((seconds: number) => {
    const min = Math.floor(seconds / 60);
    const reamaingSeconds = Math.round(seconds % 60);
    return `${min}:${reamaingSeconds.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    setPreviewError(false);
  }, [isHovered]);

  const handlePreviewError = () => {
    setPreviewError(true);
  };

  return (
    <Link href={`/video/${video.id}`} className="block">
      <div
        className="group relative bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 hover:border-primary/20 hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <figure className="relative aspect-video overflow-hidden rounded-t-2xl">
          {isHovered ? (
            previewError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/80 backdrop-blur-sm">
                <p className="text-muted-foreground font-medium">
                  PREVIEW UNAVAILABLE!
                </p>
              </div>
            ) : (
              <video
                key={video.publicId}
                src={getPreviewVideoUrl(video.publicId)}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onError={handlePreviewError}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            )
          ) : (
            <img
              src={getThumbnailUrl(video.publicId)}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 font-medium transform transition-transform duration-300 group-hover:translate-x-1">
            <Clock className="w-3.5 h-3.5" />
            {formatDuration(video.duration)}
          </div>
          {/* <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 font-medium transform transition-transform duration-300 group-hover:translate-x-1">
            <span className="text-green-400">●</span>
            {compressionPercentage}% Smaller
          </div> */}
        </figure>

        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h2 className="font-semibold text-xl line-clamp-1 group-hover:text-primary transition-colors duration-300">
                  {video.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {video.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary transform transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/80">
              Uploaded {dayjs(video.createdAt).fromNow()}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/50 space-y-2 transform transition-all duration-300 group-hover:bg-muted/70">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileUp className="w-4 h-4" />
                <span>Original Size</span>
              </div>
              <p className="font-medium text-lg">
                {formatSize(Number(video.originalSize))}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 space-y-2 transform transition-all duration-300 group-hover:bg-muted/70">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileDown className="w-4 h-4" />
                <span>Compressed Size</span>
              </div>
              <p className="font-medium text-lg text-primary">
                {formatSize(Number(video.compressedSize))}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Saved:</span>
              <span className="font-medium text-green-500">
                {formatSize(
                  Number(video.originalSize) - Number(video.compressedSize)
                )}
              </span>
            </div>
            <DownloadButton
              url={getFullVideoUrl(video.publicId)}
              title={video.title}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
