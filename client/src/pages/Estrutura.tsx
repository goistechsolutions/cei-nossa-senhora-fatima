import { Users, Award, Briefcase, BookOpen, ChevronRight } from 'lucide-react'

export default function Estrutura() {
  const estrutura = [
    {
      cargo: 'Presidente',
      descricao: 'Responsável pela representação legal e decisões estratégicas',
      cor: 'red',
      icone: '👔'
    },
    {
      cargo: 'Diretor Pedagógico',
      descricao: 'Coordena a pedagogia, metodologia e desenvolvimento educacional',
      cor: 'orange',
      icone: '🎓'
    },
    {
      cargo: 'Diretor Administrativo',
      descricao: 'Gerencia recursos, finanças e operações institucionais',
      cor: 'yellow',
      icone: '💼'
    },
    {
      cargo: 'Coordenador de Transparência',
      descricao: 'Responsável pela prestação de contas e comunicação pública',
      cor: 'teal',
      icone: '📊'
    }
  ]

  const equipes = [
    {
      area: 'Pedagogia',
      descricao: 'Professores, coordenadores pedagógicos e especialistas em educação infantil',
      icone: '🎨',
      funcoes: ['Planejamento Pedagógico', 'Desenvolvimento Curricular', 'Avaliação Educacional']
    },
    {
      area: 'Administrativo',
      descricao: 'Equipe responsável por recursos humanos, financeiro e operações',
      icone: '📋',
      funcoes: ['Gestão Financeira', 'Recursos Humanos', 'Operações']
    },
    {
      area: 'Apoio',
      descricao: 'Profissionais de suporte que garantem o funcionamento diário',
      icone: '🤝',
      funcoes: ['Limpeza e Higiene', 'Segurança', 'Manutenção']
    },
    {
      area: 'Conselho Gestor',
      descricao: 'Representantes da comunidade que participam das decisões institucionais',
      icone: '🗳️',
      funcoes: ['Deliberação', 'Fiscalização', 'Representação Comunitária']
    }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-rainbow opacity-5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <span className="bg-orange-600 text-white font-fredoka font-semibold px-4 py-2 rounded-full text-sm">
                🏢 ESTRUTURA E DIRETORIA
              </span>
            </div>
            
            <h1 
              className="font-fredoka-one text-5xl md:text-6xl mb-6 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #FF4444 0%, #FF9500 16.67%, #FFD166 33.33%, #4CAF50 50%, #2BCDCD 66.67%, #2196F3 83.33%, #9C27B0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Estrutura e Diretoria
            </h1>
            
            <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-lg">
              Conheça nossa equipe gestora e estrutura organizacional comprometida com transparência e excelência na educação infantil.
            </p>
          </div>
        </div>
      </section>

      {/* Organograma */}
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
            Organograma Institucional
          </h2>

          <div className="max-w-4xl mx-auto">
            {/* Presidente */}
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-2xl shadow-lg border-t-4 border-red-500 px-8 py-6 w-full md:w-96 hover:shadow-xl transition-all">
                <div className="text-4xl text-center mb-3">👔</div>
                <h3 className="font-fredoka-one text-xl text-red-600 text-center mb-2">Presidente</h3>
                <p className="text-center text-gray-700 font-poppins text-sm">
                  Responsável pela representação legal e decisões estratégicas
                </p>
              </div>
            </div>

            {/* Diretores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {estrutura.slice(1, 4).map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl shadow-lg border-t-4 border-${item.cor}-500 px-6 py-6 hover:shadow-xl transition-all`}
                >
                  <div className="text-3xl text-center mb-3">{item.icone}</div>
                  <h3 className={`font-fredoka-one text-lg text-${item.cor}-600 text-center mb-2`}>
                    {item.cargo}
                  </h3>
                  <p className="text-center text-sm text-gray-700 font-poppins">
                    {item.descricao}
                  </p>
                </div>
              ))}
            </div>

            {/* Coordenador */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border-t-4 border-teal-500 px-6 py-6 hover:shadow-xl transition-all">
                <div className="text-3xl text-center mb-3">📊</div>
                <h3 className="font-fredoka-one text-lg text-teal-600 text-center mb-2">
                  Coordenador de Transparência
                </h3>
                <p className="text-center text-sm text-gray-700 font-poppins">
                  Responsável pela prestação de contas e comunicação pública
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border-t-4 border-purple-500 px-6 py-6 hover:shadow-xl transition-all">
                <div className="text-3xl text-center mb-3">🗳️</div>
                <h3 className="font-fredoka-one text-lg text-purple-600 text-center mb-2">
                  Conselho Gestor
                </h3>
                <p className="text-center text-sm text-gray-700 font-poppins">
                  Representantes da comunidade nas decisões institucionais
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipes */}
      <section className="py-20 bg-gradient-to-b from-white to-cream">
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
            Nossas Equipes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {equipes.map((equipe, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-all border-l-4 border-red-500 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{equipe.icone}</div>
                <h3 className="font-fredoka-one text-2xl text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{equipe.area}</h3>
                <p className="text-gray-700 font-poppins mb-6">{equipe.descricao}</p>
                <div className="space-y-3">
                  {equipe.funcoes.map((funcao, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 font-poppins">{funcao}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Princípios de Gestão */}
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
            Princípios de Gestão
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { titulo: 'Transparência', icone: '👁️', descricao: 'Comunicação clara e honesta com a comunidade' },
              { titulo: 'Inclusão', icone: '🤝', descricao: 'Participação ativa de todos os stakeholders' },
              { titulo: 'Excelência', icone: '⭐', descricao: 'Qualidade em tudo que fazemos' },
              { titulo: 'Sustentabilidade', icone: '🌱', descricao: 'Responsabilidade ambiental e social' }
            ].map((valor, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-cream to-white rounded-2xl p-6 text-center hover:shadow-lg transition-all border-t-4 border-red-500 group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{valor.icone}</div>
                <h3 className="font-fredoka-one text-lg text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{valor.titulo}</h3>
                <p className="text-sm text-gray-700 font-poppins">{valor.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
