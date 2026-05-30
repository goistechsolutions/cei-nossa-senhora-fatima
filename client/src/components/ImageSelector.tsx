import { useState, useEffect } from "react";
import { Image as ImageIcon, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface ImageSelectorProps {
  onSelect?: (imageUrl: string, imageId: number) => void;
  sectionKey?: string;
  selectedImageUrl?: string;
}

export function ImageSelector({
  onSelect,
  sectionKey,
  selectedImageUrl,
}: ImageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTags, setSearchTags] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Fetch gallery images
  const { data: images = [], isLoading } = trpc.gallery.list.useQuery({
    sectionKey,
  });

  // Filter images based on search
  const filteredImages = images.filter((img: any) => {
    if (!searchTags) return true;
    const tags = img.tags ? JSON.parse(img.tags) : [];
    return tags.some((tag: string) =>
      tag.toLowerCase().includes(searchTags.toLowerCase())
    );
  });

  const handleSelect = (image: any) => {
    setSelectedId(image.id);
    onSelect?.(image.storageUrl, image.id);
    setIsOpen(false);
    toast.success("Imagem selecionada com sucesso!");
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Imagem</label>

      <div className="flex gap-2">
        {selectedImageUrl ? (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-teal-600">
            <img
              src={selectedImageUrl}
              alt="Selected"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => {
                onSelect?.("", 0);
                setSelectedId(null);
              }}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
            <ImageIcon className="h-8 w-8 text-gray-400" />
          </div>
        )}

        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          className="self-center"
        >
          {selectedImageUrl ? "Trocar Imagem" : "Selecionar Imagem"}
        </Button>
      </div>

      {/* Image Selector Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Selecionar Imagem da Galeria</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Search by tags */}
            <div>
              <Input
                placeholder="Buscar por tags..."
                value={searchTags}
                onChange={e => setSearchTags(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Images Grid */}
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">
                Carregando imagens...
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhuma imagem encontrada
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredImages.map((image: any) => (
                  <div
                    key={image.id}
                    onClick={() => handleSelect(image)}
                    className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all hover:border-teal-600 ${
                      selectedId === image.id
                        ? "border-teal-600 ring-2 ring-teal-300"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image.storageUrl}
                      alt={image.alt || "Imagem"}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />

                    {selectedId === image.id && (
                      <div className="absolute inset-0 bg-teal-600/20 flex items-center justify-center">
                        <Check className="h-8 w-8 text-teal-600" />
                      </div>
                    )}

                    {/* Image info on hover */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-xs opacity-0 hover:opacity-100 transition-opacity">
                      <p className="truncate font-medium">{image.filename}</p>
                      <p className="text-gray-300">
                        {(image.fileSize / 1024 / 1024).toFixed(2)}MB
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 justify-end pt-4 border-t">
              <Button onClick={() => setIsOpen(false)} variant="outline">
                Cancelar
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-teal-600 hover:bg-teal-700"
                disabled={selectedId === null}
              >
                Confirmar Seleção
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
