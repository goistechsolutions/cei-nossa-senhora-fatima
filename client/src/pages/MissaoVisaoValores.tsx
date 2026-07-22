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
              Os princípios que orientam cada decisão, cada abraço e cada momento de aprendizagem no CEI Nossa Senhora de Fátima.
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
                  Cuidar e educar cada criança de forma integral — em corpo, mente e emoções — em parceria com as famílias e a comunidade de Fartura. Oferecemos educação infantil gratuita e acessível, num ambiente acolhedor, seguro e pedagogicamente estruturado, onde o afeto é o alicerce de todo aprendizado.
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
                  Ser a instituição de educação infantil mais querida e respeitada de Fartura-SP — reconhecida não apenas pela excelência pedagógica, mas pela forma como cada criança se sente ao entrar e sair todos os dias: segura, amada e pronta para o mundo.
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
                  {
                    titulo: 'Respeito',
                    descricao: 'Cada criança é única. Respeitamos o ritmo, a história e a singularidade de cada uma — e esperamos o mesmo respeito em todas as relações da instituição.'
                  },
                  {
                    titulo: 'Afeto',
                    descricao: 'Acreditamos que crianças aprendem melhor quando se sentem seguras e amadas. O afeto não é apenas presença — é método, é intenção, é prática diária.'
                  },
                  {
                    titulo: 'Excelência',
                    descricao: 'Buscamos qualidade em tudo: no ensino, na gestão, na alimentação, nos espaços e na forma como nos comunicamos com as famílias.'
                  },
                  {
                    titulo: 'Transparência',
                    descricao: 'As famílias confiam seus filhos a nós. Retribuímos essa confiança com comunicação clara, prestação de contas acessível e portas sempre abertas.'
                  },
                  {
                    titulo: 'Inclusão',
                    descricao: 'Toda criança tem lugar aqui. Acolhemos as diferenças, celebramos a diversidade e garantimos que nenhuma criança se sinta de fora.'
                  },
                  {
                    titulo: 'Sustentabilidade',
                    descricao: 'Ensinamos às crianças o cuidado com o mundo desde cedo — pela horta, pelo exemplo e por práticas que respeitam o meio ambiente e a comunidade.'
                  }
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
          <h2 className="font-fredoka-one text-4xl text-white mb-4">
            Conheça os Projetos que Vivem Esses Valores
          </h2>
          <p className="font-poppins text-teal-100 mb-8 max-w-xl mx-auto">
            Nossos projetos são a missão em ação — descubra como transformamos princípios em experiências reais para as crianças.
          </p>
          <a
            href="/projetos"
            className="inline-flex items-center px-8 py-4 bg-white text-teal-600 font-fredoka font-semibold rounded-lg hover:bg-gray-100 transition-all"
          >
            Ver Projetos Pedagógicos
          </a>
        </div>
      </section>
    </main>
  )
}
