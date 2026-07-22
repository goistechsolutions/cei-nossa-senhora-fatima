export default function MissaoVisaoValores() {
  const valores = [
    {
      titulo: 'Respeito',
      descricao: 'Valorizamos a dignidade, a autonomia e a singularidade de cada criança, família e profissional. Toda voz merece ser ouvida.',
      icone: '🤝'
    },
    {
      titulo: 'Afeto',
      descricao: 'Acreditamos que vínculos afetivos saudáveis são a base de todo aprendizado. Cuidar com amor faz parte da nossa pedagogia.',
      icone: '❤️'
    },
    {
      titulo: 'Excelência',
      descricao: 'Buscamos qualidade em tudo: no ensino, no ambiente, na gestão e no relacionamento com as famílias. Ser bom não é suficiente.',
      icone: '⭐'
    },
    {
      titulo: 'Transparência',
      descricao: 'Prestamos contas à comunidade de forma clara e acessível. Cada família tem o direito de saber como o CEI é gerido.',
      icone: '🔍'
    },
    {
      titulo: 'Inclusão',
      descricao: 'Toda criança é bem-vinda, independentemente de suas diferenças. Inclusão não é adaptação — é pertencimento real.',
      icone: '🌈'
    },
    {
      titulo: 'Sustentabilidade',
      descricao: 'Educamos para o futuro com consciência ambiental. Nossa horta educativa é a semente de um mundo mais responsável.',
      icone: '🌱'
    }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-20 md:py-32 overflow-hidden"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/hero-background-missao-WPct7yNcu2CsDaM2W9kEJo.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-white/60" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <p className="font-poppins text-sm font-semibold text-teal-600 uppercase tracking-widest mb-3">Quem Somos</p>
            <h1 className="font-fredoka-one text-5xl md:text-6xl mb-6 leading-tight text-teal-700">
              Missão, Visão e Valores
            </h1>
            <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-xl">
              Mais do que uma instituição, somos uma comunidade comprometida com o desenvolvimento
              integral de cada criança — com afeto, responsabilidade e alegria.
            </p>
          </div>
        </div>
      </section>

      {/* Missão e Visão */}
      <section
        className="py-20 relative"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-valores-aii4NLz2cGtJyeWQ836rJB.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-white/80" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto space-y-12">

            {/* Missão */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-md border-t-4 border-teal-500">
              <div className="flex items-center gap-4 mb-5">
                <span className="text-4xl">🎯</span>
                <h2 className="font-fredoka-one text-3xl md:text-4xl text-teal-700">Nossa Missão</h2>
              </div>
              <p className="font-poppins text-lg text-gray-700 leading-relaxed">
                Oferecer educação infantil de qualidade, gratuita e acessível, promovendo o desenvolvimento
                integral das crianças em um ambiente acolhedor, seguro e estruturado — com foco na pedagogia
                do afeto, no respeito às diferenças e na preparação para a vida em sociedade.
              </p>
              <p className="font-poppins text-base text-gray-600 leading-relaxed mt-4">
                Cada criança que passa pelo CEI Nossa Senhora de Fátima carrega consigo não apenas
                conhecimento, mas confiança, afeto e pertencimento — bases para uma vida plena.
              </p>
            </div>

            {/* Visão */}
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-md border-t-4 border-amber-400">
              <div className="flex items-center gap-4 mb-5">
                <span className="text-4xl">🔭</span>
                <h2 className="font-fredoka-one text-3xl md:text-4xl text-teal-700">Nossa Visão</h2>
              </div>
              <p className="font-poppins text-lg text-gray-700 leading-relaxed">
                Ser reconhecida como instituição de excelência em educação infantil em Fartura e região —
                referência em metodologia pedagógica humanizada, transparência na gestão e compromisso
                genuíno com o desenvolvimento integral das crianças.
              </p>
              <p className="font-poppins text-base text-gray-600 leading-relaxed mt-4">
                Queremos ser o lugar onde as famílias confiam plenamente, onde os profissionais se realizam
                e onde cada criança é tratada como única e especial.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="font-poppins text-sm font-semibold text-teal-600 uppercase tracking-widest mb-3">O que nos guia</p>
            <h2 className="font-fredoka-one text-4xl md:text-5xl text-teal-700 mb-4">Nossos Valores</h2>
            <p className="font-poppins text-gray-600 text-base leading-relaxed">
              Esses princípios orientam cada decisão, cada aula e cada interação com as crianças e suas famílias.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {valores.map((valor, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all border border-gray-100 group hover:border-teal-200"
              >
                <span className="text-3xl mb-4 block">{valor.icone}</span>
                <h3 className="font-fredoka-one text-xl text-teal-700 mb-3">{valor.titulo}</h3>
                <p className="font-poppins text-gray-600 text-sm leading-relaxed">{valor.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal-600">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-fredoka-one text-3xl md:text-4xl text-white mb-4">
              Quer conhecer o CEI pessoalmente?
            </h2>
            <p className="font-poppins text-teal-100 mb-8 leading-relaxed">
              Agende uma visita e conheça de perto o ambiente, a equipe e a forma como cuidamos de cada criança.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contato"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-700 font-fredoka font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-md"
              >
                Agendar Visita
              </a>
              <a
                href="https://wa.me/5514998443897?text=Ol%C3%A1%21+Gostaria+de+agendar+uma+visita+ao+CEI."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-fredoka font-semibold rounded-xl hover:bg-green-600 transition-all shadow-md"
              >
                💬 WhatsApp Direto
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
