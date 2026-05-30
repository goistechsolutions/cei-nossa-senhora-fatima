import { Download, FileText, BarChart3, Shield, MessageCircle, ChevronRight, Lock } from 'lucide-react'

export default function Transparencia() {
  const documentosInstitucionais = [
    {
      titulo: 'Estatuto da Instituição',
      descricao: 'Documento fundador que rege nossa operação, missão e valores',
      icone: '📋',
      acao: 'Download'
    },
    {
      titulo: 'Proposta Pedagógica 2026',
      descricao: 'Detalhamento de nossa abordagem educacional e metodologia',
      icone: '🎓',
      acao: 'Download'
    },
    {
      titulo: 'Regimento Interno',
      descricao: 'Normas e procedimentos que regulam o funcionamento do CEI',
      icone: '📖',
      acao: 'Download'
    },
    {
      titulo: 'Plano de Desenvolvimento Institucional',
      descricao: 'Objetivos estratégicos e metas para os próximos anos',
      icone: '🎯',
      acao: 'Download'
    }
  ]

  const documentosFinanceiros = [
    {
      titulo: 'Balanço Patrimonial 2025',
      descricao: 'Demonstração financeira completa do exercício anterior',
      icone: '💰',
      acao: 'Download'
    },
    {
      titulo: 'Demonstração de Resultado do Exercício',
      descricao: 'Receitas, despesas e resultado do período',
      icone: '📊',
      acao: 'Download'
    },
    {
      titulo: 'Relatório de Execução Orçamentária',
      descricao: 'Comparativo entre orçado e realizado',
      icone: '📈',
      acao: 'Download'
    }
  ]

  const documentosAdministrativos = [
    {
      titulo: 'Regulamento de Contratação',
      descricao: 'Procedimentos para contratação de fornecedores e serviços',
      icone: '🤝',
      acao: 'Ler'
    },
    {
      titulo: 'Regulamento de Compras',
      descricao: 'Normas para aquisição de materiais e equipamentos',
      icone: '🛒',
      acao: 'Ler'
    },
    {
      titulo: 'Editais de Licitação',
      descricao: 'Processos licitatórios em andamento',
      icone: '📢',
      acao: 'Acessar'
    },
    {
      titulo: 'Atas de Reuniões do Conselho Gestor',
      descricao: 'Decisões e deliberações dos últimos 12 meses',
      icone: '📝',
      acao: 'Acessar'
    }
  ]

  const politicas = [
    {
      titulo: 'Política de Privacidade',
      descricao: 'Como protegemos os dados das crianças e famílias',
      icone: '🔒',
      acao: 'Ler'
    },
    {
      titulo: 'Código de Ética',
      descricao: 'Princípios éticos que guiam nossas ações',
      icone: '⚖️',
      acao: 'Ler'
    },
    {
      titulo: 'Política de Inclusão',
      descricao: 'Compromisso com a inclusão e acessibilidade',
      icone: '🤲',
      acao: 'Ler'
    }
  ]

  const DocumentCard = ({ titulo, descricao, icone, acao }: any) => (
    <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-red-500 hover:border-orange-500 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{icone}</div>
          <h3 className="font-fredoka-one text-lg mb-2 text-gray-900 group-hover:text-red-600 transition-colors">{titulo}</h3>
          <p className="font-poppins text-sm text-gray-600">{descricao}</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-sm font-fredoka font-semibold hover:shadow-lg transition-all whitespace-nowrap flex items-center gap-2 group-hover:scale-105">
          {acao}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )

  const CategorySection = ({ title, icon: Icon, items, color }: any) => (
    <div className="mb-20">
      <div className="flex items-center gap-4 mb-10">
        <div className={`p-3 rounded-full bg-gradient-to-br from-${color}-100 to-${color}-50`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <h2 className="font-fredoka-one text-3xl text-gray-900">{title}</h2>
      </div>
      <div className="space-y-4">
        {items.map((doc: any, idx: number) => (
          <DocumentCard key={idx} {...doc} />
        ))}
      </div>
    </div>
  )

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-rainbow opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 opacity-5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <span className="bg-purple-600 text-white font-fredoka font-semibold px-4 py-2 rounded-full text-sm">
                📋 PORTAL DA TRANSPARÊNCIA
              </span>
            </div>
            
            <h1 className="font-fredoka-one text-5xl md:text-6xl mb-6 leading-tight text-gray-900">
              Transparência como área nobre
            </h1>
            
            <p className="font-poppins text-lg text-gray-700 mb-8 leading-relaxed max-w-lg">
              Documentos, relatórios e informações sobre a gestão do CEI Nossa Senhora de Fátima. Nosso compromisso com a transparência garante que você tenha acesso a todas as informações sobre nossa instituição.
            </p>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="font-fredoka text-sm text-gray-700">Documentos Institucionais</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="font-fredoka text-sm text-gray-700">Políticas e Procedimentos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            {/* Documentos Institucionais */}
            <CategorySection
              title="Documentos Institucionais"
              icon={FileText}
              items={documentosInstitucionais}
              color="red"
            />

            {/* Documentos Financeiros */}
            <CategorySection
              title="Documentos Financeiros"
              icon={BarChart3}
              items={documentosFinanceiros}
              color="orange"
            />

            {/* Documentos Administrativos */}
            <CategorySection
              title="Documentos Administrativos"
              icon={FileText}
              items={documentosAdministrativos}
              color="yellow"
            />

            {/* Políticas */}
            <CategorySection
              title="Políticas e Procedimentos"
              icon={Shield}
              items={politicas}
              color="teal"
            />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-purple-50 via-blue-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10 text-center">
          <h2 className="font-fredoka-one text-4xl md:text-5xl mb-6 text-gray-900">
            Dúvidas sobre Transparência?
          </h2>
          <p className="font-poppins text-lg text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Entre em contato conosco para solicitar informações adicionais ou esclarecimentos sobre nossos documentos e processos.
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-fredoka font-semibold rounded-full hover:shadow-lg transition-all duration-300 gap-2 text-lg hover:scale-105 transform">
            <MessageCircle size={24} />
            Fale Conosco
          </button>
        </div>
      </section>

      {/* Valores de Transparência */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 
            className="font-fredoka-one text-4xl text-center mb-16"
            style={{
              background: 'linear-gradient(135deg, #FF4444 0%, #FF9500 16.67%, #FFD166 33.33%, #4CAF50 50%, #2BCDCD 66.67%, #2196F3 83.33%, #9C27B0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Nossos Compromissos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { titulo: 'Transparência', icone: '👁️', descricao: 'Comunicação clara e honesta' },
              { titulo: 'Acessibilidade', icone: '🔓', descricao: 'Informações disponíveis para todos' },
              { titulo: 'Integridade', icone: '⭐', descricao: 'Ética em todas as ações' },
              { titulo: 'Responsabilidade', icone: '🎯', descricao: 'Prestação de contas contínua' }
            ].map((valor, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-cream to-white rounded-2xl p-8 text-center hover:shadow-lg transition-all border-t-4 border-red-500 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{valor.icone}</div>
                <h3 className="font-fredoka-one text-xl mb-2 text-red-600 group-hover:text-orange-600 transition-colors">{valor.titulo}</h3>
                <p className="font-poppins text-sm text-gray-700">{valor.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
