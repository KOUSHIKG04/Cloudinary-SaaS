"use client";

import { getCldVideoUrl } from "next-cloudinary";
import { FileDown, FileUp, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Video } from "@/types";
import Link from "next/link";
import { filesize } from "filesize";

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const formatDuration = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${min}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Link href={`/video/${video.id}`} className="block">
      <div className="group relative bg-card rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 hover:border-primary/20 hover:-translate-y-1">
        <figure className="relative aspect-video overflow-hidden rounded-t-2xl">
          <img
            src={getCldVideoUrl({
              src: video.publicId,
              width: 1920,
              height: 1080,
              format: "jpg",
            })}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 font-medium transform transition-transform duration-300 group-hover:translate-x-1">
            <Play className="w-3.5 h-3.5" />
            {formatDuration(video.duration)}
          </div>
          <div className="absolute top-3 left-3 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1.5 font-medium transform transition-transform duration-300 group-hover:translate-x-1">
            <span className="text-green-400">●</span>
            {Math.round(
              (1 - Number(video.compressedSize) / Number(video.originalSize)) *
                100
            )}
            % Smaller
          </div>
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
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-muted/50 space-y-2 transform transition-all duration-300 group-hover:bg-muted/70">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileUp className="w-4 h-4" />
                <span>Original Size</span>
              </div>
              <p className="font-medium text-lg">
                {filesize(Number(video.originalSize))}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50 space-y-2 transform transition-all duration-300 group-hover:bg-muted/70">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileDown className="w-4 h-4" />
                <span>Compressed Size</span>
              </div>
              <p className="font-medium text-lg text-primary">
                {filesize(Number(video.compressedSize))}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Saved:</span>
              <span className="font-medium text-green-500">
                {filesize(
                  Number(video.originalSize) - Number(video.compressedSize)
                )}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  getCldVideoUrl({
                    src: video.publicId,
                    width: 1920,
                    height: 1080,
                  }),
                  "_blank"
                );
              }}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
