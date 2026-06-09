export default function Estrutura() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-light-gray via-white to-gradient-soft-turquoise">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/hero-background-estrutura-YGkJHaHh5EynB9Lsizi7rJ.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-gradient-institutional/80"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-fredoka text-5xl md:text-6xl mb-6 leading-tight text-white font-bold">
              Estrutura e Diretoria
            </h1>
            
            <p className="font-inter text-lg text-white/90 leading-relaxed max-w-lg">
              Conheça a estrutura organizacional e as equipes que fazem o CEI Nossa Senhora de Fátima funcionar.
            </p>
          </div>
        </div>
      </section>

      {/* Organograma */}
      <section className="py-20">
        <div className="container">
          <h2 className="font-fredoka text-4xl text-center mb-16 text-turquoise font-bold">
            Organograma Institucional
          </h2>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* Presidente */}
            <div className="flex justify-center">
              <div className="card-premium bg-white/50 backdrop-filter backdrop-blur-sm border border-white/20 rounded-premium p-6 shadow-soft w-full max-w-xs text-center">
                <h3 className="font-fredoka text-2xl text-turquoise mb-2 font-semibold">Presidente</h3>
                <p className="font-inter text-gray-700">Responsável pela gestão geral da instituição</p>
              </div>
            </div>

            {/* Linha */}
            <div className="flex justify-center">
              <div className="w-1 h-8 bg-gradient-institutional"></div>
            </div>

            {/* Diretores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { titulo: 'Diretor Pedagógico', desc: 'Coordena atividades educacionais' },
                { titulo: 'Diretor Administrativo', desc: 'Gerencia recursos e operações' },
                { titulo: 'Diretor de Transparência', desc: 'Responsável por comunicação' }
              ].map((item, idx) => (
                <div key={idx} className="card-premium bg-white/50 backdrop-filter backdrop-blur-sm border border-white/20 rounded-premium p-6 shadow-soft text-center hover:shadow-lg-premium transition-all duration-300">
                  <h3 className="font-fredoka text-xl text-turquoise mb-2 font-semibold">{item.titulo}</h3>
                  <p className="font-inter text-gray-700 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Linha */}
            <div className="flex justify-center">
              <div className="w-1 h-8 bg-gradient-institutional"></div>
            </div>

            {/* Conselho Gestor */}
            <div className="flex justify-center">
              <div className="card-premium bg-white/50 backdrop-filter backdrop-blur-sm border border-white/20 rounded-premium p-6 shadow-soft w-full max-w-xs text-center">
                <h3 className="font-fredoka text-2xl text-turquoise mb-2 font-semibold">Conselho Gestor</h3>
                <p className="font-inter text-gray-700">Participação de pais, educadores e comunidade</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossas Equipes */}
      <section className="py-20">
        <div className="container">
          <h2 className="font-fredoka text-4xl text-center mb-16 text-turquoise font-bold">
            Nossas Equipes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { titulo: 'Equipe Pedagógica', descricao: 'Professores, coordenadores e especialistas em educação infantil' },
              { titulo: 'Equipe Administrativa', descricao: 'Gestão financeira, recursos humanos e operacional' },
              { titulo: 'Equipe de Apoio', descricao: 'Cozinha, limpeza, segurança e manutenção' },
              { titulo: 'Conselho Gestor', descricao: 'Representantes de pais, educadores e comunidade' }
            ].map((item, idx) => (
              <div key={idx} className="card-premium bg-white/50 backdrop-filter backdrop-blur-sm border border-white/20 rounded-premium p-8 shadow-soft hover:shadow-lg-premium transition-all duration-300">
                <h3 className="font-fredoka text-2xl text-turquoise mb-3 font-semibold">{item.titulo}</h3>
                <p className="font-inter text-gray-700">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Princípios de Gestão */}
      <section className="py-20">
        <div className="container">
          <h2 className="font-fredoka text-4xl text-center mb-16 text-turquoise font-bold">
            Princípios de Gestão
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { titulo: 'Transparência', descricao: 'Comunicação clara e honesta com toda a comunidade' },
              { titulo: 'Inclusão', descricao: 'Participação de todos os stakeholders nas decisões' },
              { titulo: 'Excelência', descricao: 'Busca contínua por qualidade em todas as ações' },
              { titulo: 'Sustentabilidade', descricao: 'Responsabilidade ambiental e social' }
            ].map((item, idx) => (
              <div key={idx} className="card-premium bg-white/50 backdrop-filter backdrop-blur-sm border border-white/20 rounded-premium p-8 shadow-soft hover:shadow-lg-premium transition-all duration-300">
                <h3 className="font-fredoka text-2xl text-turquoise mb-3 font-semibold">{item.titulo}</h3>
                <p className="font-inter text-gray-700">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-institutional">
        <div className="container text-center">
          <h2 className="font-fredoka text-4xl text-white mb-6 font-bold">
            Agende uma Visita
          </h2>
          <a
            href="/contato"
            className="btn-primary inline-flex items-center px-8 py-4"
          >
            Entrar em Contato
          </a>
        </div>
      </section>
    </main>
  )
}
