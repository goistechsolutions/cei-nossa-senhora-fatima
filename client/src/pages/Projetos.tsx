export default function Projetos() {
  const projetos = [
    { titulo: 'Horta Educativa', descricao: 'Aprendizado prático sobre natureza, sustentabilidade e hábitos saudáveis', icone: '🌱' },
    { titulo: 'Pedagogia do Afeto', descricao: 'Relacionamentos baseados em afeto, segurança emocional e escuta atenta', icone: '❤️' },
    { titulo: 'Educação Financeira', descricao: 'Introdução ao conceito de valores, economia e responsabilidade', icone: '💰' },
    { titulo: 'Projetos Ambientais', descricao: 'Atividades de conscientização e cuidado com o meio ambiente', icone: '🌍' },
    { titulo: 'Inclusão e Diversidade', descricao: 'Celebração das diferenças e promoção de respeito mútuo', icone: '🤝' },
    { titulo: 'Desenvolvimento Emocional', descricao: 'Atividades para inteligência emocional e autoconhecimento', icone: '🧠' }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-light-gray via-white to-gradient-soft-turquoise">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/hero-background-projetos-TZySzhfLxZR2iyW2xT3nP4.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-gradient-institutional/80"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-fredoka text-5xl md:text-6xl mb-6 leading-tight text-white font-bold">
              Nossos Projetos
            </h1>
            
            <p className="font-inter text-lg text-white/90 leading-relaxed max-w-lg">
              Conheça os projetos pedagógicos que complementam e enriquecem a educação infantil no CEI Nossa Senhora de Fátima.
            </p>
          </div>
        </div>
      </section>

      {/* Projetos Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projetos.map((projeto, idx) => (
              <div key={idx} className="card-premium bg-white/50 backdrop-filter backdrop-blur-sm border border-white/20 p-8 hover:shadow-lg-premium transition-all duration-300 group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{projeto.icone}</div>
                <h3 className="font-fredoka text-2xl text-turquoise mb-3 font-semibold">
                  {projeto.titulo}
                </h3>
                <p className="font-inter text-gray-700 leading-relaxed">
                  {projeto.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-institutional">
        <div className="container text-center">
          <h2 className="font-fredoka text-4xl text-white mb-6 font-bold">
            Quer Saber Mais Sobre Nossos Projetos?
          </h2>
          <a
            href="/contato"
            className="btn-primary inline-flex items-center px-8 py-4"
          >
            Entre em Contato
          </a>
        </div>
      </section>
    </main>
  )
}
