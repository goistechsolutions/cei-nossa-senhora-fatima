import { useState } from 'react'
import { Trash2, Edit2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/ImageUpload'
import { ImageEditor } from '@/components/ImageEditor'
import { toast } from 'sonner'
import { trpc } from '@/lib/trpc'

const SECTIONS = [
  { key: 'hero', label: 'Hero' },
  { key: 'diferenciais', label: 'Diferenciais' },
  { key: 'galeria', label: 'Galeria' },
  { key: 'noticias', label: 'Notícias' },
  { key: 'cta_final', label: 'CTA Final' },
  { key: 'footer', label: 'Footer' },
]

export default function AdminGallery() {
  const [selectedSection, setSelectedSection] = useState('hero')
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showEditorDialog, setShowEditorDialog] = useState(false)
  const [editingImage, setEditingImage] = useState<any>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [editingAlt, setEditingAlt] = useState('')
  const [editingTags, setEditingTags] = useState('')

  // Queries
  const { data: images = [], isLoading, refetch } = trpc.gallery.list.useQuery({
    sectionKey: selectedSection,
  })

  // Mutations
  const deleteMutation = trpc.gallery.delete.useMutation({
    onSuccess: () => {
      toast.success('Imagem deletada com sucesso')
      refetch()
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao deletar imagem')
    },
  })

  const updateMutation = trpc.gallery.update.useMutation({
    onSuccess: () => {
      toast.success('Imagem atualizada com sucesso')
      setEditingImage(null)
      setEditingAlt('')
      setEditingTags('')
      refetch()
    },
    onError: (error) => {
      toast.error(error.message || 'Erro ao atualizar imagem')
    },
  })

  const handleUploadSuccess = (url: string, storageKey: string) => {
    setUploadedImageUrl(url)
    setShowUploadDialog(false)
    setShowEditorDialog(true)
    refetch()
  }

  const handleSaveEdit = async () => {
    if (!editingImage) return
    await updateMutation.mutateAsync({
      id: editingImage.id,
      alt: editingAlt,
      tags: editingTags,
    })
  }

  const handleDeleteImage = async (id: number) => {
    if (confirm('Tem certeza que deseja deletar esta imagem?')) {
      await deleteMutation.mutateAsync({ id })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gerenciador de Imagens</h1>
        <p className="text-gray-600 mt-2">
          Faça upload, edite e organize imagens para as seções do site
        </p>
      </div>

      {/* Section Filter */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Seção</label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {SECTIONS.map((section) => (
            <button
              key={section.key}
              onClick={() => setSelectedSection(section.key)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedSection === section.key
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Upload Button */}
      <Button
        onClick={() => setShowUploadDialog(true)}
        className="bg-teal-600 hover:bg-teal-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Nova Imagem
      </Button>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Carregando imagens...
          </div>
        ) : images.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Nenhuma imagem nesta seção
          </div>
        ) : (
          images.map((image: any) => (
            <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={image.storageUrl}
                  alt={image.alt || 'Imagem'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {image.filename}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(image.fileSize / 1024 / 1024).toFixed(2)}MB
                  </p>
                </div>
                {image.alt && (
                  <p className="text-sm text-gray-600 line-clamp-2">{image.alt}</p>
                )}
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setEditingImage(image)
                      setEditingAlt(image.alt || '')
                      setEditingTags(image.tags || '')
                    }}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDeleteImage(image.id)}
                    variant="destructive"
                    size="sm"
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enviar Nova Imagem</DialogTitle>
          </DialogHeader>
          <ImageUpload
            sectionKey={selectedSection}
            onUploadSuccess={handleUploadSuccess}
          />
        </DialogContent>
      </Dialog>

      {/* Editor Dialog */}
      <Dialog open={showEditorDialog} onOpenChange={setShowEditorDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Editar Imagem</DialogTitle>
          </DialogHeader>
          {uploadedImageUrl && (
            <ImageEditor
              imageSrc={uploadedImageUrl}
              onCancel={() => setShowEditorDialog(false)}
              onSave={() => setShowEditorDialog(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Metadata Dialog */}
      <Dialog
        open={!!editingImage}
        onOpenChange={() => {
          setEditingImage(null)
          setEditingAlt('')
          setEditingTags('')
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Metadados da Imagem</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Texto Alternativo (Alt)</label>
              <Input
                value={editingAlt}
                onChange={(e) => setEditingAlt(e.target.value)}
                placeholder="Descrição da imagem para acessibilidade"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Tags</label>
              <Textarea
                value={editingTags}
                onChange={(e) => setEditingTags(e.target.value)}
                placeholder="Tags separadas por vírgula"
                className="mt-1"
                rows={3}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                onClick={() => {
                  setEditingImage(null)
                  setEditingAlt('')
                  setEditingTags('')
                }}
                variant="outline"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveEdit}
                disabled={updateMutation.isPending}
                className="bg-teal-600 hover:bg-teal-700"
              >
                Salvar Alterações
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
