import { ArrowRight } from 'lucide-react'
import { INSTITUTION, VISUAL_ASSETS } from '@/lib/constants'

export default function Home() {
  const diferenciais = [
    {
      titulo: 'Educação Gratuita',
      descricao: 'Acesso igualitário a uma educação de qualidade para todas as crianças, sem barreiras financeiras.',
      icone: '🎓'
    },
    {
      titulo: 'Pedagogia do Afeto',
      descricao: 'Relacionamentos baseados em afeto, segurança emocional e escuta atenta das necessidades infantis.',
      icone: '❤️'
    },
    {
      titulo: 'Horta Educativa',
      descricao: 'Aprendizado conectado com a natureza, sustentabilidade e hábitos saudáveis desde a primeira infância.',
      icone: '🌱'
    },
    {
      titulo: 'Rotina Estruturada',
      descricao: 'Ambiente previsível que oferece segurança, facilitando o aprendizado e o desenvolvimento emocional.',
      icone: '⏰'
    },
    {
      titulo: 'Berçário ao Maternal',
      descricao: 'Cuidado integral desde os primeiros meses de vida, respeitando cada estágio do desenvolvimento infantil.',
      icone: '👶'
    },
    {
      titulo: 'Transparência Total',
      descricao: 'Portal de transparência com documentos, prestação de contas e comunicação clara com a comunidade.',
      icone: '👁️'
    }
  ]

  const galeriaFotos = [
    {
      titulo: 'Sala de Aula',
      descricao: 'Ambientes coloridos e acolhedores para aprendizado'
    },
    {
      titulo: 'Atividades Lúdicas',
      descricao: 'Brincadeiras e atividades que estimulam criatividade'
    },
    {
      titulo: 'Horta Educativa',
      descricao: 'Aprendizado prático sobre natureza e sustentabilidade'
    },
    {
      titulo: 'Recreação',
      descricao: 'Espaços seguros para diversão e movimento'
    },
    {
      titulo: 'Refeições',
      descricao: 'Alimentação saudável e nutritiva para as crianças'
    },
    {
      titulo: 'Momentos Especiais',
      descricao: 'Celebrações e eventos que marcam a infância'
    }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="relative py-16 md:py-24 bg-gradient-to-br from-cream via-white to-orange-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-rainbow opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 opacity-5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Conteúdo à Esquerda */}
            <div>
              <div className="inline-block mb-6">
                <span className="bg-red-500 text-white font-fredoka font-semibold px-4 py-2 rounded-full text-sm">
                  ✨ Alegria Estruturada
                </span>
              </div>
              
              <h1 
                className="font-fredoka-one text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight"
                style={{
                  background: 'linear-gradient(135deg, #FF4444 0%, #FF9500 16.67%, #FFD166 33.33%, #4CAF50 50%, #2BCDCD 66.67%, #2196F3 83.33%, #9C27B0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Cuidado, educação e amor para a primeira infância.
              </h1>
              
              <p className="font-poppins text-lg text-gray-700 mb-8 leading-relaxed max-w-lg">
                Na CEI Nossa Senhora de Fátima, oferecemos educação infantil gratuita com excelência, transparência e muito amor. Localizada em Fartura-SP, nossa instituição filantrópica une a vivacidade infantil com estrutura pedagógica rigorosa.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/historia" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-fredoka font-semibold rounded-full hover:shadow-lg transition-all gap-2 text-lg">
                  Conheça Nossa História
                  <ArrowRight size={20} />
                </a>
                <a href="/contato" className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-teal-600 text-teal-600 font-fredoka font-semibold rounded-full hover:bg-teal-50 transition-all gap-2 text-lg">
                  Entre em Contato
                </a>
              </div>
            </div>

            {/* Imagem à Direita */}
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-rainbow opacity-10 rounded-3xl blur-2xl"></div>
              <img
                src={VISUAL_ASSETS.heroBanner}
                alt="Crianças brincando em sala de aula"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais Pedagógicos */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 
              className="font-fredoka-one text-4xl md:text-5xl mb-6"
              style={{
                background: 'linear-gradient(135deg, #FF4444 0%, #FF9500 16.67%, #FFD166 33.33%, #4CAF50 50%, #2BCDCD 66.67%, #2196F3 83.33%, #9C27B0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Nossos Diferenciais Pedagógicos
            </h2>
            <p className="font-poppins text-lg text-gray-700 max-w-2xl mx-auto">
              Uma educação que une qualidade, afeto estruturado e desenvolvimento integral
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diferenciais.map((diferencial, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-cream to-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-all border-l-4 border-red-500 group"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{diferencial.icone}</div>
                <h3 className="font-fredoka-one text-2xl text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                  {diferencial.titulo}
                </h3>
                <p className="font-poppins text-gray-700 leading-relaxed">
                  {diferencial.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-cream to-white">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 
              className="font-fredoka-one text-4xl md:text-5xl mb-6"
              style={{
                background: 'linear-gradient(135deg, #FF4444 0%, #FF9500 16.67%, #FFD166 33.33%, #4CAF50 50%, #2BCDCD 66.67%, #2196F3 83.33%, #9C27B0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Galeria de Fotos
            </h2>
            <p className="font-poppins text-lg text-gray-700 max-w-2xl mx-auto">
              Conheça os ambientes, as atividades e o dia a dia da nossa instituição
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galeriaFotos.map((foto, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all group cursor-pointer h-64"
              >
                {/* Placeholder com gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400 opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-blue-400 to-purple-400 opacity-20"></div>
                
                {/* Conteúdo */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/60 to-transparent p-6 group-hover:from-black/80 transition-all">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📸</div>
                  <h3 className="font-fredoka-one text-xl text-white text-center mb-2">
                    {foto.titulo}
                  </h3>
                  <p className="font-poppins text-sm text-white text-center">
                    {foto.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-fredoka-one text-4xl md:text-5xl text-white mb-6">
              Pronto para Fazer Parte de Nossa Comunidade?
            </h2>
            <p className="font-poppins text-lg text-white mb-8 leading-relaxed">
              Entre em contato conosco para conhecer melhor o CEI Nossa Senhora de Fátima ou agende uma visita.
            </p>
            <a
              href="/contato"
              className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-fredoka font-semibold rounded-full hover:shadow-lg transition-all gap-2 text-lg hover:scale-105 transform"
            >
              Entrar em Contato
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
