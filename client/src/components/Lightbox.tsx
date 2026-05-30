import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LightboxProps {
  images: { url: string; alt?: string; title?: string }[];
  initialIndex?: number;
  onClose?: () => void;
}

export function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(100);
  const [isLoading, setIsLoading] = useState(true);

  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, images.length]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length);
    setZoom(100);
    setIsLoading(true);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    setZoom(100);
    setIsLoading(true);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <div className="flex-1">
          <p className="text-white font-medium">
            {currentImage?.title ||
              `Imagem ${currentIndex + 1} de ${images.length}`}
          </p>
          <p className="text-gray-400 text-sm">{currentImage?.alt}</p>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-gray-800"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Main Image */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-4">
        <div className="relative w-full h-full flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin">
                <div className="h-12 w-12 border-4 border-teal-600 border-t-transparent rounded-full" />
              </div>
            </div>
          )}
          <img
            src={currentImage?.url}
            alt={currentImage?.alt || "Imagem"}
            onLoad={() => setIsLoading(false)}
            style={{
              transform: `scale(${zoom / 100})`,
              transition: "transform 0.2s ease-out",
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
            className="cursor-move"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center p-4 border-t border-gray-700 bg-black/50">
        {/* Navigation */}
        <div className="flex gap-2">
          <Button
            onClick={handlePrev}
            variant="outline"
            size="sm"
            className="text-white border-gray-600 hover:bg-gray-800"
            disabled={images.length <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-white text-sm flex items-center px-3">
            {currentIndex + 1} / {images.length}
          </span>
          <Button
            onClick={handleNext}
            variant="outline"
            size="sm"
            className="text-white border-gray-600 hover:bg-gray-800"
            disabled={images.length <= 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Zoom Controls */}
        <div className="flex gap-2 items-center">
          <Button
            onClick={handleZoomOut}
            variant="outline"
            size="sm"
            className="text-white border-gray-600 hover:bg-gray-800"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-white text-sm w-12 text-center">{zoom}%</span>
          <Button
            onClick={handleZoomIn}
            variant="outline"
            size="sm"
            className="text-white border-gray-600 hover:bg-gray-800"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        {/* Info */}
        <div className="text-gray-400 text-xs">
          Use ← → para navegar, ESC para fechar
        </div>
      </div>
    </div>
  );
}
