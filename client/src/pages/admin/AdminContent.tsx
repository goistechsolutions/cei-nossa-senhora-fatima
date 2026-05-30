import { useState, useEffect } from 'react'
import { useAuth } from '@/_core/hooks/useAuth'
import { trpc } from '@/lib/trpc'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageSelector } from '@/components/ImageSelector'
import { toast } from 'sonner'
import { Save, AlertCircle } from 'lucide-react'
import { useLocation } from 'wouter'

const SECTIONS = [
  { key: 'hero', name: 'Hero Banner', description: 'Seção principal com título e CTA' },
  { key: 'diferenciais', name: 'Diferenciais Pedagógicos', description: 'Seção de destaques' },
  { key: 'galeria', name: 'Galeria de Fotos', description: 'Seção de imagens' },
  { key: 'noticias', name: 'Notícias e Eventos', description: 'Seção de notícias' },
  { key: 'cta_final', name: 'Call-to-Action Final', description: 'Seção final com CTA' },
  { key: 'footer', name: 'Rodapé', description: 'Informações do rodapé' },
]

export default function AdminContent() {
  const { user } = useAuth()
  const [, setLocation] = useLocation()
  
  // Verificar se é admin
  if (user?.role !== 'admin') {
    setLocation('/')
    return null
  }

  const [selectedSection, setSelectedSection] = useState<string>('hero')
  const [formData, setFormData] = useState({
    sectionName: '',
    content: '',
    subtitle: '',
    description: '',
    cta: '',
    ctaLink: '',
    imageUrl: '',
    metadata: '',
  })

  // Queries
  const { data: allSections = [], refetch: refetchSections, isLoading } = trpc.content.getAllSections.useQuery()
  
  // Mutations
  const updateMutation = trpc.content.updateSection.useMutation({
    onSuccess: () => {
      toast.success('Seção atualizada com sucesso!')
      refetchSections()
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar: ${error.message}`)
    },
  })

  // Load section data when selected section changes
  useEffect(() => {
    const section = allSections.find(s => s.sectionKey === selectedSection)
    if (section) {
      setFormData({
        sectionName: section.sectionName,
        content: section.content,
        subtitle: section.subtitle || '',
        description: section.description || '',
        cta: section.cta || '',
        ctaLink: section.ctaLink || '',
        imageUrl: section.imageUrl || '',
        metadata: section.metadata || '',
      })
    } else {
      // Initialize with default section info
      const sectionInfo = SECTIONS.find(s => s.key === selectedSection)
      setFormData({
        sectionName: sectionInfo?.name || '',
        content: '',
        subtitle: '',
        description: sectionInfo?.description || '',
        cta: '',
        ctaLink: '',
        imageUrl: '',
        metadata: '',
      })
    }
  }, [selectedSection, allSections])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.content.trim()) {
      toast.error('Preencha o conteúdo principal')
      return
    }

    await updateMutation.mutateAsync({
      sectionKey: selectedSection,
      sectionName: formData.sectionName,
      content: formData.content,
      subtitle: formData.subtitle || undefined,
      description: formData.description || undefined,
      cta: formData.cta || undefined,
      ctaLink: formData.ctaLink || undefined,
      imageUrl: formData.imageUrl || undefined,
      metadata: formData.metadata || undefined,
    })
  }

  const currentSectionInfo = SECTIONS.find(s => s.key === selectedSection)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-fredoka-one text-teal-600 mb-2">
            Gerenciar Conteúdo do Site
          </h1>
          <p className="text-gray-600">Edite os textos e conteúdo de cada seção do site</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Seções */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h2 className="text-lg font-fredoka-one text-gray-900 mb-4">Seções</h2>
              <div className="space-y-2">
                {SECTIONS.map((section) => (
                  <button
                    key={section.key}
                    onClick={() => setSelectedSection(section.key)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedSection === section.key
                        ? 'bg-teal-600 text-white font-semibold'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-semibold">{section.name}</div>
                    <div className={`text-xs ${selectedSection === section.key ? 'text-teal-100' : 'text-gray-600'}`}>
                      {section.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-fredoka-one text-gray-900 mb-2">
                  {currentSectionInfo?.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  {currentSectionInfo?.description}
                </p>
              </div>

              {isLoading ? (
                <p className="text-gray-500">Carregando...</p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nome da Seção */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nome da Seção
                    </label>
                    <Input
                      type="text"
                      value={formData.sectionName}
                      onChange={(e) => setFormData({ ...formData, sectionName: e.target.value })}
                      placeholder="Ex: Hero Banner"
                      maxLength={255}
                    />
                  </div>

                  {/* Conteúdo Principal */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Conteúdo Principal *
                    </label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Texto principal da seção"
                      rows={6}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.content.length} caracteres
                    </p>
                  </div>

                  {/* Subtítulo */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subtítulo (opcional)
                    </label>
                    <Input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="Subtítulo da seção"
                    />
                  </div>

                  {/* Descrição */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descrição (opcional)
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descrição adicional"
                      rows={3}
                    />
                  </div>

                  {/* CTA */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Texto do Botão (opcional)
                      </label>
                      <Input
                        type="text"
                        value={formData.cta}
                        onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                        placeholder="Ex: Saiba Mais"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Link do Botão (opcional)
                      </label>
                      <Input
                        type="text"
                        value={formData.ctaLink}
                        onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                        placeholder="Ex: /sobre"
                      />
                    </div>
                  </div>

                  {/* Imagem */}
                  <ImageSelector
                    sectionKey={selectedSection}
                    selectedImageUrl={formData.imageUrl}
                    onSelect={(url) => setFormData({ ...formData, imageUrl: url })}
                  />

                  {/* Metadados */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Metadados (JSON - opcional)
                    </label>
                    <Textarea
                      value={formData.metadata}
                      onChange={(e) => setFormData({ ...formData, metadata: e.target.value })}
                      placeholder='{"key": "value"}'
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Para dados adicionais em formato JSON
                    </p>
                  </div>

                  {/* Info Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="text-blue-600 flex-shrink-0" size={20} />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Dica:</p>
                      <p>Todas as alterações serão aplicadas imediatamente no site. Faça backup antes de fazer mudanças importantes.</p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-2 pt-4">
                    <Button
                      type="submit"
                      disabled={updateMutation.isPending}
                      className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
                    >
                      <Save size={18} />
                      Salvar Alterações
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
