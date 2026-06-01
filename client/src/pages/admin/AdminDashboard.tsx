import { useAuth } from '@/_core/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { useLocation } from 'wouter'
import { FileText, Newspaper, Settings, Users, LogOut, Image, FolderOpen } from 'lucide-react'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [, setLocation] = useLocation()

  // Verificar se é admin
  if (user?.role !== 'admin') {
    setLocation('/')
    return null
  }

  const handleLogout = async () => {
    await logout()
    setLocation('/')
  }

  const adminModules = [
    {
      title: 'Gerenciar Conteúdo',
      description: 'Edite textos e conteúdo de todas as seções do site',
      icon: FileText,
      link: '/admin/content',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Gerenciar Notícias',
      description: 'Crie, edite e delete notícias e eventos',
      icon: Newspaper,
      link: '/admin/news',
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Gerenciar Documentos',
      description: 'Editais, regulamentos e documentos de transparência',
      icon: FolderOpen,
      link: '/admin/documents',
      color: 'bg-teal-100 text-teal-600',
    },
    {
      title: 'Galeria de Imagens',
      description: 'Upload e gerenciamento de imagens do site',
      icon: Image,
      link: '/admin/gallery',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      title: 'Gerenciar Usuários',
      description: 'Controle permissões e acesso de usuários',
      icon: Users,
      link: '/admin/users',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Configurações',
      description: 'Configurações gerais do site',
      icon: Settings,
      link: '/admin/settings',
      color: 'bg-orange-100 text-orange-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-fredoka-one text-teal-600 mb-2">
                Painel Administrativo
              </h1>
              <p className="text-gray-600">
                Bem-vindo, <span className="font-semibold">{user?.name || 'Administrador'}</span>
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut size={18} />
              Sair
            </Button>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminModules.map((module) => {
            const Icon = module.icon
            return (
              <div
                key={module.link}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden"
              >
                <div className={`${module.color} p-6 flex items-center justify-center`}>
                  <Icon size={48} />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-fredoka-one text-gray-900 mb-2">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {module.description}
                  </p>
                  <Button
                    onClick={() => setLocation(module.link)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Acessar
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-fredoka-one text-gray-900 mb-6">
            Informações da Conta
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-teal-600 pl-4">
              <p className="text-sm text-gray-600">Nome</p>
              <p className="text-lg font-semibold text-gray-900">{user?.name || 'N/A'}</p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-lg font-semibold text-gray-900">{user?.email || 'N/A'}</p>
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <p className="text-sm text-gray-600">Função</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-fredoka-one text-blue-900 mb-3">
            Precisa de ajuda?
          </h3>
          <p className="text-blue-800 text-sm">
            Acesse os módulos acima para gerenciar diferentes aspectos do site. Cada módulo possui funcionalidades específicas para editar conteúdo, gerenciar permissões e configurar o site.
          </p>
        </div>
      </div>
    </div>
  )
}
