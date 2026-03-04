"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DialogTitle } from "@radix-ui/react-dialog";

type ImageLightboxProps = {
  images: string[];
  initialIndex?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ImageLightbox({
  images,
  initialIndex = 0,
  open,
  onOpenChange,
}: ImageLightboxProps) {
  const [index, setIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    if (open) setIndex(initialIndex);
  }, [open, initialIndex]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogOverlay className="bg-black/80" />
      <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-5xl">
        <div className="relative w-full bg-black rounded-lg overflow-hidden">
          <Carousel>
            <CarouselContent>
              {images.map((src, idx) => (
                <CarouselItem key={idx}>
                  <img
                    src={src || "/placeholder.svg"}
                    alt={`Property image ${idx + 1} of ${images.length}`}
                    className="h-full w-full object-contain bg-black"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/60 hover:text-white"
            />
            <CarouselNext
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/60 hover:text-white"
            />
          </Carousel>
        </div>
        <DialogTitle className="sr-only">Project Image Gallery</DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
