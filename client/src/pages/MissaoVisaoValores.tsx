export default function MissaoVisaoValores() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-rainbow opacity-5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block mb-6">
              <span className="bg-purple-600 text-white font-fredoka font-semibold px-4 py-2 rounded-full text-sm">
                🎯 MISSÃO, VISÃO E VALORES
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
              Missão, Visão e Valores
            </h1>
            
            <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-lg">
              Os pilares que guiam todas as nossas ações e decisões na educação infantil.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Missão */}
            <div className="mb-16">
              <h2 
                className="font-fredoka-one text-4xl mb-8"
                style={{
                  background: 'linear-gradient(135deg, #FF4444 0%, #FF9500 16.67%, #FFD166 33.33%, #4CAF50 50%, #2BCDCD 66.67%, #2196F3 83.33%, #9C27B0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Nossa Missão
              </h2>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-l-4 border-red-500">
                <p className="font-poppins text-lg text-gray-700 leading-relaxed">
                  Oferecer educação infantil de qualidade, gratuita e acessível, promovendo o desenvolvimento integral das crianças em um ambiente acolhedor, seguro e estruturado, com foco na pedagogia do afeto, respeito às diferenças e preparação para a vida em sociedade.
                </p>
              </div>
            </div>

            {/* Visão */}
            <div className="mb-16">
              <h2 
                className="font-fredoka-one text-4xl mb-8"
                style={{
                  background: 'linear-gradient(135deg, #FF4444 0%, #FF9500 16.67%, #FFD166 33.33%, #4CAF50 50%, #2BCDCD 66.67%, #2196F3 83.33%, #9C27B0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Nossa Visão
              </h2>
              <div className="bg-gradient-to-br from-yellow-50 to-green-50 rounded-2xl p-8 border-l-4 border-yellow-500">
                <p className="font-poppins text-lg text-gray-700 leading-relaxed">
                  Ser reconhecida como instituição de excelência em educação infantil, referência em metodologia pedagógica inovadora, transparência e compromisso com o desenvolvimento integral das crianças, contribuindo para a formação de cidadãos conscientes, críticos e humanizados.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div>
              <h2 
                className="font-fredoka-one text-4xl mb-8"
                style={{
                  background: 'linear-gradient(135deg, #FF4444 0%, #FF9500 16.67%, #FFD166 33.33%, #4CAF50 50%, #2BCDCD 66.67%, #2196F3 83.33%, #9C27B0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
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
                  <div key={idx} className="bg-gradient-to-br from-cream to-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border-l-4 border-teal-500">
                    <h3 className="font-fredoka-one text-xl text-teal-600 mb-3">{valor.titulo}</h3>
                    <p className="font-poppins text-gray-700 leading-relaxed">{valor.descricao}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
