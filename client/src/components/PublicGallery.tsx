import { useState } from "react";
import { Lightbox } from "@/components/Lightbox";
import { trpc } from "@/lib/trpc";

interface PublicGalleryProps {
  sectionKey?: string;
  columns?: number;
  showTitle?: boolean;
}

export function PublicGallery({
  sectionKey = "galeria",
  columns = 3,
  showTitle = true,
}: PublicGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  // Fetch gallery images
  const { data: images = [], isLoading } = trpc.gallery.list.useQuery({
    sectionKey,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin">
          <div className="h-12 w-12 border-4 border-teal-600 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Nenhuma imagem disponível na galeria</p>
      </div>
    );
  }

  const gridColsClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    }[columns] || "grid-cols-3";

  const formattedImages = images.map((img: any) => ({
    url: img.storageUrl,
    alt: img.alt || "Imagem da galeria",
    title: img.filename,
  }));

  return (
    <div className="w-full">
      {showTitle && (
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-fredoka-one text-teal-600 mb-2">
            Nossa Galeria
          </h2>
          <p className="text-gray-600">
            Clique em qualquer imagem para ampliar
          </p>
        </div>
      )}

      {/* Gallery Grid */}
      <div className={`grid ${gridColsClass} gap-4 md:gap-6`}>
        {images.map((image: any, index: number) => (
          <div
            key={image.id}
            onClick={() => setSelectedImageIndex(index)}
            className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group"
          >
            <img
              src={image.storageUrl}
              alt={image.alt || "Imagem"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 rounded-full p-3">
                  <svg
                    className="w-6 h-6 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Image Info */}
            {image.alt && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm font-medium truncate">
                  {image.alt}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <Lightbox
          images={formattedImages}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </div>
  );
}
