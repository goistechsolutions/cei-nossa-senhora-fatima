export default function MissaoVisaoValores() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-white" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/hero-background-missao-WPct7yNcu2CsDaM2W9kEJo.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-fredoka-one text-5xl md:text-6xl mb-6 leading-tight text-teal-600">
              Missão, Visão e Valores
            </h1>
            
            <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-lg">
              Os pilares que guiam todas as nossas ações e decisões na educação infantil.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50 relative" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-valores-aii4NLz2cGtJyeWQ836rJB.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Missão */}
            <div>
              <h2 className="font-fredoka-one text-4xl mb-8 text-teal-600">
                Nossa Missão
              </h2>
              <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-teal-600">
                <p className="font-poppins text-lg text-gray-700 leading-relaxed">
                  Oferecer educação infantil de qualidade, gratuita e acessível, promovendo o desenvolvimento integral das crianças em um ambiente acolhedor, seguro e estruturado, com foco na pedagogia do afeto, respeito às diferenças e preparação para a vida em sociedade.
                </p>
              </div>
            </div>

            {/* Visão */}
            <div>
              <h2 className="font-fredoka-one text-4xl mb-8 text-teal-600">
                Nossa Visão
              </h2>
              <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-teal-600">
                <p className="font-poppins text-lg text-gray-700 leading-relaxed">
                  Ser reconhecida como instituição de excelência em educação infantil, referência em metodologia pedagógica inovadora, transparência e compromisso com o desenvolvimento integral das crianças, contribuindo para a formação de cidadãos conscientes, críticos e humanizados.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div>
              <h2 className="font-fredoka-one text-4xl mb-8 text-teal-600">
                Nossos Valores
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { titulo: 'Respeito', descricao: 'Valorização da dignidade, autonomia e singularidade de cada criança e família.' },
                  { titulo: 'Afeto', descricao: 'Relacionamentos baseados em amor, segurança emocional e escuta atenta.' },
                  { titulo: 'Excelência', descricao: 'Qualidade em tudo que fazemos, desde o ensino até a gestão institucional.' },
                  { titulo: 'Transparência', descricao: 'Comunicação clara e honesta com a comunidade sobre nossas ações e resultados.' },
                  { titulo: 'Inclusão', descricao: 'Acolhimento de todas as crianças, independentemente de suas diferenças.' },
                  { titulo: 'Sustentabilidade', descricao: 'Responsabilidade ambiental e social em nossas práticas educacionais.' }
                ].map((valor, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all border border-teal-200">
                    <h3 className="font-fredoka-one text-xl text-teal-600 mb-3">{valor.titulo}</h3>
                    <p className="font-poppins text-gray-700 leading-relaxed">{valor.descricao}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal-600">
        <div className="container text-center">
          <h2 className="font-fredoka-one text-4xl text-white mb-6">
            Conheça Nossos Projetos
          </h2>
          <a
            href="/projetos"
            className="inline-flex items-center px-8 py-4 bg-white text-teal-600 font-fredoka font-semibold rounded-lg hover:bg-gray-100 transition-all border-2 border-dashed border-white"
          >
            Saiba Mais
          </a>
        </div>
      </section>
    </main>
  )
}
