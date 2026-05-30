import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface ImageUploadProps {
  onUploadSuccess?: (url: string, storageKey: string) => void;
  sectionKey?: string;
  maxSizeMB?: number;
}

export function ImageUpload({
  onUploadSuccess,
  sectionKey,
  maxSizeMB = 10,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.gallery.upload.useMutation({
    onSuccess: data => {
      toast.success("Imagem enviada com sucesso!");
      setSelectedFile(null);
      setPreview(null);
      onUploadSuccess?.(data.url, data.storageKey);
    },
    onError: error => {
      toast.error(error.message || "Erro ao enviar imagem");
    },
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (!file.type.startsWith("image/")) {
      toast.error("Por favor, selecione uma imagem válida");
      return;
    }

    if (file.size > maxSizeBytes) {
      toast.error(`Arquivo muito grande. Máximo: ${maxSizeMB}MB`);
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = e => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Selecione uma imagem");
      return;
    }

    const reader = new FileReader();
    reader.onload = async e => {
      const base64 = (e.target?.result as string).split(",")[1];
      await uploadMutation.mutateAsync({
        filename: selectedFile.name,
        fileData: base64,
        mimeType: selectedFile.type,
        sectionKey,
      });
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? "border-teal-600 bg-teal-50"
            : "border-gray-300 bg-gray-50 hover:border-teal-600"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />

        {!preview ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer"
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p className="text-sm font-medium text-gray-900 mb-1">
              Arraste uma imagem aqui ou clique para selecionar
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF até {maxSizeMB}MB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Preview"
                className="max-h-48 rounded-lg shadow-md"
              />
              <button
                onClick={handleClear}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium">{selectedFile?.name}</p>
              <p className="text-xs">
                {(selectedFile?.size ?? 0 / 1024 / 1024).toFixed(2)}MB
              </p>
            </div>
          </div>
        )}
      </div>

      {preview && (
        <div className="mt-4 flex gap-2">
          <Button
            onClick={handleUpload}
            disabled={uploadMutation.isPending}
            className="flex-1"
          >
            {uploadMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Imagem"
            )}
          </Button>
          <Button
            onClick={handleClear}
            variant="outline"
            disabled={uploadMutation.isPending}
          >
            Cancelar
          </Button>
        </div>
      )}
    </div>
  );
}
