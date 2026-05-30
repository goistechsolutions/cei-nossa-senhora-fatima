import { Download, Eye, ExternalLink } from 'lucide-react'

export default function Transparencia() {
  const documentos = {
    institucionais: [
      { titulo: 'Estatuto Social', descricao: 'Documento legal da instituição', icone: '📜' },
      { titulo: 'Proposta Pedagógica', descricao: 'Metodologia e diretrizes educacionais', icone: '📚' },
      { titulo: 'Regimento Interno', descricao: 'Normas e regulamentos da instituição', icone: '📋' },
      { titulo: 'Certificações', descricao: 'Certificados de qualidade e reconhecimento', icone: '🏆' }
    ],
    financeiros: [
      { titulo: 'Balanço Patrimonial', descricao: 'Situação financeira da instituição', icone: '💰' },
      { titulo: 'Demonstração de Resultados', descricao: 'Receitas e despesas do período', icone: '📊' },
      { titulo: 'Orçamento Anual', descricao: 'Planejamento financeiro do ano', icone: '📈' },
      { titulo: 'Relatório de Aplicação', descricao: 'Como os recursos foram utilizados', icone: '✅' }
    ],
    administrativos: [
      { titulo: 'Atas de Reunião', descricao: 'Registros de decisões institucionais', icone: '📝' },
      { titulo: 'Editais de Seleção', descricao: 'Processos de seleção de pessoal', icone: '📢' },
      { titulo: 'Políticas de RH', descricao: 'Diretrizes de recursos humanos', icone: '👥' },
      { titulo: 'Relatórios de Atividades', descricao: 'Atividades realizadas no período', icone: '📄' }
    ],
    politicas: [
      { titulo: 'Política de Privacidade', descricao: 'Proteção de dados pessoais', icone: '🔒' },
      { titulo: 'Código de Ética', descricao: 'Princípios éticos da instituição', icone: '⚖️' },
      { titulo: 'Política de Inclusão', descricao: 'Compromisso com a inclusão', icone: '🤝' },
      { titulo: 'Política Ambiental', descricao: 'Responsabilidade ambiental', icone: '🌱' }
    ]
  }

  const compromissos = [
    { titulo: 'Transparência', descricao: 'Comunicação clara e honesta com a comunidade' },
    { titulo: 'Acessibilidade', descricao: 'Documentos disponíveis para todos' },
    { titulo: 'Integridade', descricao: 'Cumprimento de normas e regulamentos' },
    { titulo: 'Responsabilidade', descricao: 'Prestação de contas periódica' }
  ]

  const renderDocumentos = (docs: typeof documentos.institucionais) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {docs.map((doc, idx) => (
        <div key={idx} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all border border-teal-200">
          <div className="text-4xl mb-3">{doc.icone}</div>
          <h4 className="font-fredoka-one text-lg text-teal-600 mb-2">{doc.titulo}</h4>
          <p className="font-poppins text-gray-700 text-sm mb-4">{doc.descricao}</p>
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-2 bg-teal-100 text-teal-600 rounded hover:bg-teal-200 transition-all text-sm">
              <Download size={16} /> Download
            </button>
            <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-all text-sm">
              <Eye size={16} /> Visualizar
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-white">
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-fredoka-one text-5xl md:text-6xl mb-6 leading-tight text-teal-600">
              Transparência como Área Nobre
            </h1>
            
            <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-lg">
              Acesso completo a documentos, relatórios e informações sobre a gestão do CEI Nossa Senhora de Fátima.
            </p>
          </div>
        </div>
      </section>

      {/* Documentos Institucionais */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="font-fredoka-one text-4xl mb-12 text-teal-600">
            Documentos Institucionais
          </h2>
          {renderDocumentos(documentos.institucionais)}
        </div>
      </section>

      {/* Documentos Financeiros */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="font-fredoka-one text-4xl mb-12 text-teal-600">
            Documentos Financeiros
          </h2>
          {renderDocumentos(documentos.financeiros)}
        </div>
      </section>

      {/* Documentos Administrativos */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="font-fredoka-one text-4xl mb-12 text-teal-600">
            Documentos Administrativos
          </h2>
          {renderDocumentos(documentos.administrativos)}
        </div>
      </section>

      {/* Políticas */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="font-fredoka-one text-4xl mb-12 text-teal-600">
            Políticas e Procedimentos
          </h2>
          {renderDocumentos(documentos.politicas)}
        </div>
      </section>

      {/* Compromissos */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="font-fredoka-one text-4xl text-center mb-12 text-teal-600">
            Nossos Compromissos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {compromissos.map((item, idx) => (
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
            Dúvidas sobre Transparência?
          </h2>
          <a
            href="/contato"
            className="inline-flex items-center px-8 py-4 bg-white text-teal-600 font-fredoka font-semibold rounded-lg hover:bg-gray-100 transition-all border-2 border-dashed border-white"
          >
            <ExternalLink size={20} className="mr-2" />
            Fale Conosco
          </a>
        </div>
      </section>
    </main>
  )
}
