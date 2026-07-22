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
              Os pilares que guiam cada decisão, cada abraço e cada aprendizado no CEI Nossa Senhora de Fátima.
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
              <div className="bg-white rounded-lg p-8 shadow-md border border-teal-100">
                <p className="font-poppins text-lg text-gray-700 leading-relaxed">
                  Cuidar e educar cada criança de forma integral — em corpo, mente e emoções — em parceria com as famílias e a comunidade. Oferecemos educação infantil gratuita, acolhedora e estruturada, baseada na pedagogia do afeto e no respeito às diferenças, preparando cada criança para viver com autonomia, curiosidade e humanidade.
                </p>
              </div>
            </div>

            {/* Visão */}
            <div>
              <h2 className="font-fredoka-one text-4xl mb-8 text-teal-600">
                Nossa Visão
              </h2>
              <div className="bg-white rounded-lg p-8 shadow-md border border-teal-100">
                <p className="font-poppins text-lg text-gray-700 leading-relaxed">
                  Ser referência em educação infantil em Fartura-SP — reconhecida pela excelência pedagógica, pela transparência na gestão e pelo impacto positivo na vida das famílias. Queremos formar crianças felizes, conscientes e prontas para o mundo, contribuindo para uma comunidade mais justa e solidária.
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
                    titulo: 'Amor e Afeto',
                    descricao: 'Acreditamos que vínculos afetivos saudáveis são a base de todo aprendizado. Cuidamos de cada criança como se fosse nossa.'
                  },
                  {
                    titulo: 'Respeito',
                    descricao: 'Cada criança é única. Respeitamos sua individualidade, seu tempo e sua forma de ver o mundo — sem comparações ou pressões.'
                  },
                  {
                    titulo: 'Excelência',
                    descricao: 'Buscamos qualidade em tudo: no ensino, na estrutura, na gestão e na relação com as famílias. Porque nossas crianças merecem o melhor.'
                  },
                  {
                    titulo: 'Transparência',
                    descricao: 'As famílias têm direito de saber tudo sobre a instituição onde seus filhos estão. Por isso mantemos um Portal de Transparência completo e atualizado.'
                  },
                  {
                    titulo: 'Inclusão',
                    descricao: 'Toda criança é bem-vinda. Acolhemos a diversidade e trabalhamos para que cada aluno se sinta pertencente e valorizado.'
                  },
                  {
                    titulo: 'Parceria com as Famílias',
                    descricao: 'Educação é uma construção coletiva. Trabalhamos lado a lado com os pais e responsáveis, porque família e escola juntas fazem toda a diferença.'
                  }
                ].map((valor, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all border border-teal-100">
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
            Venha conhecer nosso trabalho
          </h2>
          <p className="font-poppins text-teal-100 text-lg mb-8 max-w-xl mx-auto">
            Agende uma visita ou entre em contato — será um prazer mostrar a você tudo que fazemos com amor e dedicação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/projetos"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-fredoka font-semibold rounded-lg hover:bg-gray-100 transition-all"
            >
              Nossos Projetos
            </a>
            <a
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-4 bg-teal-700 text-white font-fredoka font-semibold rounded-lg hover:bg-teal-800 transition-all border border-teal-500"
            >
              Entrar em Contato
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
