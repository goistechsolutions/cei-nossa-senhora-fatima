export default function Historia() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-teal-50 via-white to-blue-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-rainbow opacity-5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <span className="bg-teal-600 text-white font-fredoka font-semibold px-4 py-2 rounded-full text-sm">
                📖 NOSSA HISTÓRIA
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
              Nossa História
            </h1>
            
            <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-lg">
              Conheça a trajetória do CEI Nossa Senhora de Fátima, uma instituição filantrópica dedicada à educação infantil de qualidade há mais de 47 anos.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 
              className="font-fredoka-one text-4xl text-center mb-16"
              style={{
                background: 'linear-gradient(135deg, #FF4444 0%, #FF9500 16.67%, #FFD166 33.33%, #4CAF50 50%, #2BCDCD 66.67%, #2196F3 83.33%, #9C27B0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Marcos Importantes
            </h2>

            <div className="space-y-12">
              {[
                {
                  ano: '1977',
                  titulo: 'Fundação',
                  descricao: 'O CEI Nossa Senhora de Fátima é fundado como instituição filantrópica dedicada à educação infantil em Fartura-SP.'
                },
                {
                  ano: '1990',
                  titulo: 'Expansão',
                  descricao: 'Ampliação das instalações e inclusão de novas metodologias pedagógicas focadas no desenvolvimento integral.'
                },
                {
                  ano: '2005',
                  titulo: 'Modernização',
                  descricao: 'Implementação de novas tecnologias educacionais e atualização da estrutura pedagógica.'
                },
                {
                  ano: '2015',
                  titulo: 'Reconhecimento',
                  descricao: 'Certificação de qualidade e reconhecimento como instituição de excelência em educação infantil.'
                },
                {
                  ano: '2024',
                  titulo: 'Transformação Digital',
                  descricao: 'Lançamento do portal de transparência e modernização da comunicação com a comunidade.'
                }
              ].map((marco, idx) => (
                <div key={idx} className="flex gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-fredoka-one text-lg">
                      {marco.ano.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-fredoka-one text-2xl text-gray-900 mb-2">{marco.titulo}</h3>
                    <p className="font-poppins text-gray-700 leading-relaxed">{marco.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-20 bg-gradient-to-br from-cream to-white">
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
            O Que Nos Define
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                titulo: 'Compromisso',
                descricao: 'Dedicação total ao desenvolvimento integral e bem-estar de cada criança.',
                icone: '❤️'
              },
              {
                titulo: 'Qualidade',
                descricao: 'Excelência em educação infantil com metodologias reconhecidas e atualizadas.',
                icone: '⭐'
              },
              {
                titulo: 'Comunidade',
                descricao: 'Parceria com famílias e comunidade para criar um ambiente acolhedor e seguro.',
                icone: '🤝'
              }
            ].map((valor, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all border-l-4 border-red-500">
                <div className="text-5xl mb-4">{valor.icone}</div>
                <h3 className="font-fredoka-one text-2xl text-gray-900 mb-3">{valor.titulo}</h3>
                <p className="font-poppins text-gray-700 leading-relaxed">{valor.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
