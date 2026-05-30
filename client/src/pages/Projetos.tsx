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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-white" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/hero-background-projetos-TZySzhfLxZR2iyW2xT3nP4.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-fredoka-one text-5xl md:text-6xl mb-6 leading-tight text-teal-600">
              Nossos Projetos
            </h1>
            
            <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-lg">
              Conheça os projetos pedagógicos que complementam e enriquecem a educação infantil no CEI Nossa Senhora de Fátima.
            </p>
          </div>
        </div>
      </section>

      {/* Projetos Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projetos.map((projeto, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-all border border-teal-200">
                <div className="text-6xl mb-4">{projeto.icone}</div>
                <h3 className="font-fredoka-one text-2xl text-teal-600 mb-3">
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

      {/* CTA */}
      <section className="py-20 bg-teal-600">
        <div className="container text-center">
          <h2 className="font-fredoka-one text-4xl text-white mb-6">
            Quer Saber Mais Sobre Nossos Projetos?
          </h2>
          <a
            href="/contato"
            className="inline-flex items-center px-8 py-4 bg-white text-teal-600 font-fredoka font-semibold rounded-lg hover:bg-gray-100 transition-all border-2 border-dashed border-white"
          >
            Entre em Contato
          </a>
        </div>
      </section>
    </main>
  )
}
