import { useState } from 'react'
import { useAuth } from '@/_core/hooks/useAuth'
import { trpc } from '@/lib/trpc'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Trash2, Edit2, Plus } from 'lucide-react'
import { useLocation } from 'wouter'

export default function AdminNews() {
  const { user } = useAuth()
  const [, setLocation] = useLocation()
  
  // Verificar se é admin
  if (user?.role !== 'admin') {
    setLocation('/')
    return null
  }

  const [isCreating, setIsCreating] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Evento' as const,
    icon: '📰',
    imageUrl: '',
    isPublished: 1,
  })

  // Queries
  const { data: newsList = [], refetch: refetchNews, isLoading } = trpc.news.list.useQuery()
  
  // Mutations
  const createMutation = trpc.news.create.useMutation({
    onSuccess: () => {
      toast.success('Notícia criada com sucesso!')
      resetForm()
      refetchNews()
    },
    onError: (error) => {
      toast.error(`Erro ao criar: ${error.message}`)
    },
  })

  const updateMutation = trpc.news.update.useMutation({
    onSuccess: () => {
      toast.success('Notícia atualizada com sucesso!')
      resetForm()
      refetchNews()
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar: ${error.message}`)
    },
  })

  const deleteMutation = trpc.news.delete.useMutation({
    onSuccess: () => {
      toast.success('Notícia deletada com sucesso!')
      refetchNews()
    },
    onError: (error) => {
      toast.error(`Erro ao deletar: ${error.message}`)
    },
  })

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Evento',
      icon: '📰',
      imageUrl: '',
      isPublished: 1,
    })
    setIsCreating(false)
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Preencha título e descrição')
      return
    }

    if (editingId) {
      await updateMutation.mutateAsync({
        id: editingId,
        ...formData,
      })
    } else {
      await createMutation.mutateAsync(formData)
    }
  }

  const handleEdit = (news: any) => {
    setFormData({
      title: news.title,
      description: news.description,
      category: news.category,
      icon: news.icon,
      imageUrl: news.imageUrl || '',
      isPublished: news.isPublished,
    })
    setEditingId(news.id)
    setIsCreating(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja deletar esta notícia?')) {
      deleteMutation.mutate({ id })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-fredoka-one text-teal-600 mb-2">
            Gerenciar Notícias
          </h1>
          <p className="text-gray-600">Crie, edite e delete notícias e eventos</p>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-fredoka-one text-gray-900 mb-4">
            {editingId ? 'Editar Notícia' : 'Nova Notícia'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Título *
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Festa Junina 2026"
                maxLength={255}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descrição *
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva a notícia ou evento"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoria *
                </label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value as any })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Evento">Evento</SelectItem>
                    <SelectItem value="Projeto">Projeto</SelectItem>
                    <SelectItem value="Institucional">Institucional</SelectItem>
                    <SelectItem value="Desenvolvimento">Desenvolvimento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ícone (emoji)
                </label>
                <Input
                  type="text"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="📰"
                  maxLength={10}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL da Imagem (opcional)
              </label>
              <Input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isPublished === 1}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked ? 1 : 0 })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-semibold text-gray-700">Publicar agora</span>
              </label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {editingId ? 'Atualizar' : 'Criar'} Notícia
              </Button>
              {editingId && (
                <Button
                  type="button"
                  onClick={resetForm}
                  variant="outline"
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de Notícias */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-fredoka-one text-gray-900 mb-4">
            Notícias Publicadas ({newsList.length})
          </h2>

          {isLoading ? (
            <p className="text-gray-500">Carregando...</p>
          ) : newsList.length === 0 ? (
            <p className="text-gray-500">Nenhuma notícia criada ainda.</p>
          ) : (
            <div className="space-y-4">
              {newsList.map((news) => (
                <div
                  key={news.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{news.icon}</span>
                        <div>
                          <h3 className="font-fredoka-one text-lg text-gray-900">
                            {news.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">
                              {news.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(news.publishedAt).toLocaleDateString('pt-BR')}
                            </span>
                            {news.isPublished === 0 && (
                              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                                Rascunho
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {news.description}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(news)}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(news.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
