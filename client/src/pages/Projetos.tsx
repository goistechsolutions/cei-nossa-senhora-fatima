export default function Projetos() {
  const projetos = [
    {
      titulo: 'Horta Educativa',
      descricao: 'Projeto que conecta as crianças com a natureza, promovendo aprendizado sobre sustentabilidade, hábitos saudáveis e responsabilidade ambiental.',
      icone: '🌱',
      cor: 'green'
    },
    {
      titulo: 'Pedagogia do Afeto',
      descricao: 'Abordagem educacional que prioriza relacionamentos baseados em afeto, segurança emocional e escuta atenta das necessidades infantis.',
      icone: '❤️',
      cor: 'red'
    },
    {
      titulo: 'Rotina Estruturada',
      descricao: 'Ambiente previsível que oferece segurança, facilitando o aprendizado e o desenvolvimento emocional das crianças.',
      icone: '⏰',
      cor: 'blue'
    },
    {
      titulo: 'Desenvolvimento Integral',
      descricao: 'Foco no desenvolvimento cognitivo, emocional, social, físico e criativo de cada criança desde a primeira infância.',
      icone: '🌟',
      cor: 'yellow'
    },
    {
      titulo: 'Inclusão e Diversidade',
      descricao: 'Compromisso com a inclusão de todas as crianças, respeitando suas diferenças e promovendo igualdade de oportunidades.',
      icone: '🤝',
      cor: 'purple'
    },
    {
      titulo: 'Comunicação com Famílias',
      descricao: 'Diálogo contínuo e transparente com as famílias, envolvendo-as no processo educativo e no desenvolvimento das crianças.',
      icone: '💬',
      cor: 'teal'
    }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-green-50 via-white to-teal-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-rainbow opacity-5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <span className="bg-green-600 text-white font-fredoka font-semibold px-4 py-2 rounded-full text-sm">
                🎨 NOSSOS PROJETOS
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
              Nossos Projetos
            </h1>
            
            <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-lg">
              Conheça os projetos e iniciativas que fazem parte da nossa proposta educacional.
            </p>
          </div>
        </div>
      </section>

      {/* Projetos Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projetos.map((projeto, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-cream to-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all border-l-4 border-red-500 group"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{projeto.icone}</div>
                <h3 className="font-fredoka-one text-2xl text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {projeto.titulo}
                </h3>
                <p className="font-poppins text-gray-700 leading-relaxed">
                  {projeto.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-fredoka-one text-4xl text-white mb-6">
              Quer Conhecer Nossos Projetos de Perto?
            </h2>
            <p className="font-poppins text-lg text-white mb-8 leading-relaxed">
              Agende uma visita e veja na prática como desenvolvemos cada projeto com as crianças.
            </p>
            <a
              href="/contato"
              className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-fredoka font-semibold rounded-full hover:shadow-lg transition-all gap-2 text-lg hover:scale-105 transform"
            >
              Agendar Visita
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
