export default function Historia() {
  const marcos = [
    { ano: '1977', titulo: 'Fundação', descricao: 'Criação do CEI Nossa Senhora de Fátima como instituição filantrópica' },
    { ano: '1985', titulo: 'Expansão', descricao: 'Ampliação das instalações e aumento da capacidade de atendimento' },
    { ano: '1995', titulo: 'Modernização', descricao: 'Implementação de novas metodologias pedagógicas' },
    { ano: '2005', titulo: 'Reconhecimento', descricao: 'Certificação de qualidade em educação infantil' },
    { ano: '2015', titulo: 'Inovação', descricao: 'Introdução de tecnologia e projetos educacionais inovadores' },
    { ano: '2024', titulo: 'Excelência', descricao: '47 anos de dedicação à educação infantil de qualidade' }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-white" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/hero-background-historia-hrNbo6My38A95DStm4RWg6.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-fredoka-one text-5xl md:text-6xl mb-6 leading-tight text-teal-600">
              Nossa História
            </h1>
            
            <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-lg">
              Conheça a trajetória do CEI Nossa Senhora de Fátima, uma instituição filantrópica dedicada à educação infantil de qualidade há mais de 47 anos.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-fredoka-one text-4xl text-center mb-16 text-teal-600">
              Marcos Importantes
            </h2>

            <div className="space-y-8">
              {marcos.map((marco, idx) => (
                <div key={idx} className="flex gap-6">
                  {/* Timeline Dot */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-fredoka-one text-lg font-bold">
                      {idx + 1}
                    </div>
                    {idx < marcos.length - 1 && (
                      <div className="w-1 h-16 bg-teal-200 mt-2"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all border-l-4 border-teal-600">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="font-fredoka-one text-2xl text-teal-600">{marco.ano}</span>
                        <h3 className="font-fredoka-one text-xl text-gray-900">{marco.titulo}</h3>
                      </div>
                      <p className="font-poppins text-gray-700">{marco.descricao}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* O Que Nos Define */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="font-fredoka-one text-4xl text-center mb-12 text-teal-600">
            O Que Nos Define
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { titulo: 'Qualidade', descricao: 'Compromisso com excelência em educação infantil' },
              { titulo: 'Inclusão', descricao: 'Acolhimento de todas as crianças, sem discriminação' },
              { titulo: 'Transparência', descricao: 'Comunicação clara com a comunidade' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-all border border-teal-200">
                <h3 className="font-fredoka-one text-2xl text-teal-600 mb-3">{item.titulo}</h3>
                <p className="font-poppins text-gray-700">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal-600">
        <div className="container text-center">
          <h2 className="font-fredoka-one text-4xl text-white mb-6">
            Conheça Mais Sobre Nossa Metodologia
          </h2>
          <a
            href="/missao-visao-valores"
            className="inline-flex items-center px-8 py-4 bg-white text-teal-600 font-fredoka font-semibold rounded-lg hover:bg-gray-100 transition-all border-2 border-dashed border-white"
          >
            Saiba Mais
          </a>
        </div>
      </section>
    </main>
  )
}
