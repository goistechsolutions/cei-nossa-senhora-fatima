import { useState, useRef, useEffect } from "react";
import { Crop, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface ImageEditorProps {
  imageSrc: string;
  onSave?: (croppedImage: string, width: number, height: number) => void;
  onCancel?: () => void;
}

export function ImageEditor({ imageSrc, onSave, onCancel }: ImageEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [cropMode, setCropMode] = useState(false);
  const [cropBox, setCropBox] = useState({
    x: 0,
    y: 0,
    width: 200,
    height: 200,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    drawImage();
  }, [zoom, rotation, cropBox]);

  const drawImage = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 300;

    // Clear canvas
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save context state
    ctx.save();

    // Apply transformations
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom / 100, zoom / 100);
    ctx.translate(-image.width / 2, -image.height / 2);

    // Draw image
    ctx.drawImage(image, 0, 0);

    // Restore context state
    ctx.restore();

    // Draw crop box if in crop mode
    if (cropMode) {
      ctx.strokeStyle = "#06d6a0";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(cropBox.x, cropBox.y, cropBox.width, cropBox.height);
      ctx.setLineDash([]);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cropMode) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !cropMode) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setCropBox(prev => ({
      ...prev,
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const croppedCanvas = document.createElement("canvas");
    const croppedCtx = croppedCanvas.getContext("2d");
    if (!croppedCtx) return;

    croppedCanvas.width = cropBox.width;
    croppedCanvas.height = cropBox.height;

    croppedCtx.drawImage(
      canvas,
      cropBox.x,
      cropBox.y,
      cropBox.width,
      cropBox.height,
      0,
      0,
      cropBox.width,
      cropBox.height
    );

    const croppedImage = croppedCanvas.toDataURL("image/jpeg", 0.95);
    onSave?.(croppedImage, cropBox.width, cropBox.height);
    toast.success("Imagem editada com sucesso!");
  };

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden bg-gray-100">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`w-full ${cropMode ? "cursor-move" : ""}`}
        />
        <img ref={imageRef} src={imageSrc} style={{ display: "none" }} />
      </div>

      <div className="space-y-4">
        {/* Zoom Control */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Zoom: {zoom}%</label>
          <Slider
            value={[zoom]}
            onValueChange={value => setZoom(value[0])}
            min={50}
            max={200}
            step={10}
            className="w-full"
          />
        </div>

        {/* Rotation Control */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Rotação: {rotation}°</label>
          <Slider
            value={[rotation]}
            onValueChange={value => setRotation(value[0])}
            min={0}
            max={360}
            step={15}
            className="w-full"
          />
        </div>

        {/* Crop Size Control */}
        {cropMode && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Largura: {cropBox.width}px
              </label>
              <Slider
                value={[cropBox.width]}
                onValueChange={value =>
                  setCropBox(prev => ({ ...prev, width: value[0] }))
                }
                min={50}
                max={400}
                step={10}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Altura: {cropBox.height}px
              </label>
              <Slider
                value={[cropBox.height]}
                onValueChange={value =>
                  setCropBox(prev => ({ ...prev, height: value[0] }))
                }
                min={50}
                max={300}
                step={10}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={cropMode ? "default" : "outline"}
          onClick={() => setCropMode(!cropMode)}
          size="sm"
        >
          <Crop className="h-4 w-4 mr-2" />
          {cropMode ? "Sair do Corte" : "Modo Corte"}
        </Button>
        <Button
          onClick={() => setRotation(prev => (prev + 90) % 360)}
          variant="outline"
          size="sm"
        >
          <RotateCw className="h-4 w-4 mr-2" />
          Girar
        </Button>
        <Button
          onClick={() => setZoom(prev => Math.min(prev + 10, 200))}
          variant="outline"
          size="sm"
        >
          <ZoomIn className="h-4 w-4 mr-2" />
          Ampliar
        </Button>
        <Button
          onClick={() => setZoom(prev => Math.max(prev - 10, 50))}
          variant="outline"
          size="sm"
        >
          <ZoomOut className="h-4 w-4 mr-2" />
          Reduzir
        </Button>
      </div>

      {/* Save/Cancel Buttons */}
      <div className="flex gap-2 justify-end pt-4 border-t">
        <Button onClick={onCancel} variant="outline">
          Cancelar
        </Button>
        <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
          Salvar Edição
        </Button>
      </div>
    </div>
  );
}
