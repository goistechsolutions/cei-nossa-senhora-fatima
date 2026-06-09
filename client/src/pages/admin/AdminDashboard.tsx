import { useAuth } from '@/_core/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { useLocation } from 'wouter'
import { FileText, Newspaper, Settings, Users, LogOut, Image, FolderOpen, Shield, ArrowRight } from 'lucide-react'

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
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      accentColor: 'text-blue-600',
    },
    {
      title: 'Gerenciar Notícias',
      description: 'Crie, edite e delete notícias e eventos',
      icon: Newspaper,
      link: '/admin/news',
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      accentColor: 'text-green-600',
    },
    {
      title: 'Gerenciar Documentos',
      description: 'Editais, regulamentos e documentos de transparência',
      icon: FolderOpen,
      link: '/admin/documents',
      color: 'bg-gradient-to-br from-turquoise to-turquoise/80',
      accentColor: 'text-turquoise',
    },
    {
      title: 'Galeria de Imagens',
      description: 'Upload e gerenciamento de imagens do site',
      icon: Image,
      link: '/admin/gallery',
      color: 'bg-gradient-to-br from-rose to-rose/80',
      accentColor: 'text-rose',
    },
    {
      title: 'Gerenciar Usuários',
      description: 'Controle permissões e acesso de usuários',
      icon: Users,
      link: '/admin/users',
      color: 'bg-gradient-to-br from-purple-fatima to-purple-fatima/80',
      accentColor: 'text-purple-fatima',
    },
    {
      title: 'Configurações',
      description: 'Configurações gerais do site',
      icon: Settings,
      link: '/admin/settings',
      color: 'bg-gradient-to-br from-orange-400 to-orange-600',
      accentColor: 'text-orange-600',
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-light-gray via-white to-gradient-soft-turquoise">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-gradient-institutional">
        <div className="container relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 backdrop-filter backdrop-blur-sm rounded-premium">
                  <Shield size={28} className="text-white" />
                </div>
                <h1 className="font-fredoka text-4xl md:text-5xl text-white font-bold">
                  Painel Administrativo
                </h1>
              </div>
              <p className="text-white/90 font-inter text-lg">
                Bem-vindo, <span className="font-semibold">{user?.name || 'Administrador'}</span>
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-premium font-inter font-semibold transition-all duration-300 backdrop-filter backdrop-blur-sm border border-white/20"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container max-w-6xl">
          {/* Section Title */}
          <div className="mb-12">
            <h2 className="font-fredoka text-3xl md:text-4xl text-turquoise mb-2 font-bold">
              Módulos Disponíveis
            </h2>
            <p className="font-inter text-gray-600">
              Acesse os módulos abaixo para gerenciar diferentes aspectos do site
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {adminModules.map((module) => {
              const Icon = module.icon
              return (
                <div
                  key={module.link}
                  className="card-premium bg-white/50 backdrop-filter backdrop-blur-sm border border-white/20 rounded-premium overflow-hidden hover:shadow-lg-premium transition-all duration-300 group cursor-pointer"
                  onClick={() => setLocation(module.link)}
                >
                  {/* Icon Header */}
                  <div className={`${module.color} p-8 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <Icon size={48} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-fredoka text-xl text-gray-900 mb-2 font-semibold">
                      {module.title}
                    </h3>
                    <p className="font-inter text-gray-600 text-sm mb-4 line-clamp-2">
                      {module.description}
                    </p>
                    <div className="flex items-center gap-2 text-turquoise font-inter font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                      Acessar
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Account Information */}
          <div className="card-premium bg-white/50 backdrop-filter backdrop-blur-sm border border-white/20 rounded-premium p-8 shadow-soft mb-8">
            <h2 className="font-fredoka text-2xl text-turquoise mb-6 font-bold">
              Informações da Conta
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gradient-soft-turquoise rounded-lg border-l-4 border-turquoise">
                <p className="font-inter text-sm text-gray-600 mb-1">Nome</p>
                <p className="font-fredoka text-lg font-semibold text-gray-900">{user?.name || 'N/A'}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <p className="font-inter text-sm text-gray-600 mb-1">Email</p>
                <p className="font-fredoka text-lg font-semibold text-gray-900 truncate">{user?.email || 'N/A'}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-fatima">
                <p className="font-inter text-sm text-gray-600 mb-1">Função</p>
                <p className="font-fredoka text-lg font-semibold text-purple-fatima capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="card-premium bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-premium p-8 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-600 text-white rounded-lg flex-shrink-0">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-fredoka text-lg text-blue-900 mb-2 font-semibold">
                  Como usar o Painel Administrativo?
                </h3>
                <p className="font-inter text-blue-800 text-sm leading-relaxed">
                  Cada módulo acima oferece funcionalidades específicas para gerenciar diferentes aspectos do site. Clique em qualquer módulo para começar a editar conteúdo, gerenciar permissões ou configurar o site. Todas as alterações são salvas automaticamente e aparecem no site em tempo real.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
