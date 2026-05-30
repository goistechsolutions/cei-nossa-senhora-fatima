export default function Estrutura() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-white">
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-fredoka-one text-5xl md:text-6xl mb-6 leading-tight text-teal-600">
              Estrutura e Diretoria
            </h1>
            
            <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-lg">
              Conheça a estrutura organizacional e as equipes que fazem o CEI Nossa Senhora de Fátima funcionar.
            </p>
          </div>
        </div>
      </section>

      {/* Organograma */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="font-fredoka-one text-4xl text-center mb-16 text-teal-600">
            Organograma Institucional
          </h2>

          <div className="max-w-3xl mx-auto space-y-8">
            {/* Presidente */}
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-teal-600 w-full max-w-xs text-center">
                <h3 className="font-fredoka-one text-2xl text-teal-600 mb-2">Presidente</h3>
                <p className="font-poppins text-gray-700">Responsável pela gestão geral da instituição</p>
              </div>
            </div>

            {/* Linha */}
            <div className="flex justify-center">
              <div className="w-1 h-8 bg-teal-200"></div>
            </div>

            {/* Diretores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { titulo: 'Diretor Pedagógico', desc: 'Coordena atividades educacionais' },
                { titulo: 'Diretor Administrativo', desc: 'Gerencia recursos e operações' },
                { titulo: 'Diretor de Transparência', desc: 'Responsável por comunicação' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-lg p-6 shadow-md border-l-4 border-teal-600 text-center">
                  <h3 className="font-fredoka-one text-xl text-teal-600 mb-2">{item.titulo}</h3>
                  <p className="font-poppins text-gray-700 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Linha */}
            <div className="flex justify-center">
              <div className="w-1 h-8 bg-teal-200"></div>
            </div>

            {/* Conselho Gestor */}
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-teal-600 w-full max-w-xs text-center">
                <h3 className="font-fredoka-one text-2xl text-teal-600 mb-2">Conselho Gestor</h3>
                <p className="font-poppins text-gray-700">Participação de pais, educadores e comunidade</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossas Equipes */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="font-fredoka-one text-4xl text-center mb-16 text-teal-600">
            Nossas Equipes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { titulo: 'Equipe Pedagógica', descricao: 'Professores, coordenadores e especialistas em educação infantil' },
              { titulo: 'Equipe Administrativa', descricao: 'Gestão financeira, recursos humanos e operacional' },
              { titulo: 'Equipe de Apoio', descricao: 'Cozinha, limpeza, segurança e manutenção' },
              { titulo: 'Conselho Gestor', descricao: 'Representantes de pais, educadores e comunidade' }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition-all border border-teal-200">
                <h3 className="font-fredoka-one text-2xl text-teal-600 mb-3">{item.titulo}</h3>
                <p className="font-poppins text-gray-700">{item.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Princípios de Gestão */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="font-fredoka-one text-4xl text-center mb-16 text-teal-600">
            Princípios de Gestão
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { titulo: 'Transparência', descricao: 'Comunicação clara e honesta com toda a comunidade' },
              { titulo: 'Inclusão', descricao: 'Participação de todos os stakeholders nas decisões' },
              { titulo: 'Excelência', descricao: 'Busca contínua por qualidade em todas as ações' },
              { titulo: 'Sustentabilidade', descricao: 'Responsabilidade ambiental e social' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-all border-l-4 border-teal-600">
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
            Agende uma Visita
          </h2>
          <a
            href="/contato"
            className="inline-flex items-center px-8 py-4 bg-white text-teal-600 font-fredoka font-semibold rounded-lg hover:bg-gray-100 transition-all border-2 border-dashed border-white"
          >
            Entrar em Contato
          </a>
        </div>
      </section>
    </main>
  )
}
