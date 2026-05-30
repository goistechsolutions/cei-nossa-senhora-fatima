import { ArrowRight } from 'lucide-react'
import { INSTITUTION, VISUAL_ASSETS } from '@/lib/constants'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export default function Home() {
  const { ref: diferencialRef, isVisible: diferencialVisible } = useScrollAnimation()
  const { ref: galeriaRef, isVisible: galeriaVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()

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
    { titulo: 'Sala de Aula', descricao: 'Ambientes coloridos e acolhedores para aprendizado' },
    { titulo: 'Atividades Lúdicas', descricao: 'Brincadeiras e atividades que estimulam criatividade' },
    { titulo: 'Horta Educativa', descricao: 'Aprendizado prático sobre natureza e sustentabilidade' },
    { titulo: 'Recreação', descricao: 'Espaços seguros para diversão e movimento' },
    { titulo: 'Refeições', descricao: 'Alimentação saudável e nutritiva para as crianças' },
    { titulo: 'Momentos Especiais', descricao: 'Celebrações e eventos que marcam a infância' }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section - Estilo B12 */}
      <section id="home" className="relative py-16 md:py-24 bg-white overflow-hidden" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/hero-background-home-QpMp3MTCVAJpAXNSndTBMy.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Conteúdo à Esquerda */}
            <div className="animate-fade-in-left">
              <h1 className="font-fredoka-one text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight text-teal-600">
                Alegria Estruturada
              </h1>
              
              <p className="font-poppins text-lg text-gray-700 mb-4 leading-relaxed">
                Na <strong>CEI Nossa Senhora de Fátima</strong>, oferecemos educação infantil gratuita com excelência, transparência e muito amor.
              </p>

              <p className="font-poppins text-base text-gray-600 mb-8 leading-relaxed">
                Localizada em Fartura-SP, nossa instituição filantrópica une a vivacidade infantil com estrutura pedagógica rigorosa, focando no desenvolvimento integral da primeira infância.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/historia" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-teal-600 text-white font-fredoka font-semibold rounded-lg hover:bg-teal-700 transition-all gap-2 text-lg border-2 border-dashed border-teal-600 hover:scale-105 transform"
                >
                  Conheça Nossa História
                  <ArrowRight size={20} />
                </a>
                <a 
                  href="/contato" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-fredoka font-semibold rounded-lg border-2 border-dashed border-teal-600 hover:bg-teal-50 transition-all gap-2 text-lg hover:scale-105 transform"
                >
                  Entre em Contato
                </a>
              </div>
            </div>

            {/* Imagem à Direita */}
            <div className="relative hidden md:block animate-fade-in-right">
              <img
                src={VISUAL_ASSETS.heroBanner}
                alt="Crianças brincando em sala de aula"
                className="rounded-2xl shadow-lg w-full h-auto object-cover hover:shadow-xl transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais Pedagógicos - Estilo B12 */}
      <section ref={diferencialRef} className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="font-fredoka-one text-4xl md:text-5xl mb-4 text-teal-600">
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
                className={`bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all border border-gray-200 hover:scale-105 transform ${
                  diferencialVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{
                  animationDelay: diferencialVisible ? `${idx * 0.1}s` : '0s'
                }}
              >
                <div className="text-6xl mb-4 hover:scale-110 transition-transform">{diferencial.icone}</div>
                <h3 className="font-fredoka-one text-2xl text-gray-900 mb-3">
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

      {/* Galeria de Fotos - Estilo B12 */}
      <section ref={galeriaRef} className="py-20 md:py-28 bg-gray-50">
        <div className="container">
          <div className="mb-16 text-center">
            <h2 className="font-fredoka-one text-4xl md:text-5xl mb-4 text-teal-600">
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
                className={`relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all group cursor-pointer h-64 bg-gradient-to-br from-teal-100 to-purple-100 hover:scale-105 transform ${
                  galeriaVisible ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{
                  animationDelay: galeriaVisible ? `${idx * 0.1}s` : '0s'
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex flex-col items-center justify-center p-6">
                  <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">📸</div>
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

      {/* CTA Final - Estilo B12 */}
      <section ref={ctaRef} className="py-20 md:py-28 bg-white">
        <div className={`container ${ctaVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-fredoka-one text-4xl md:text-5xl text-teal-600 mb-6">
              Pronto para Fazer Parte de Nossa Comunidade?
            </h2>
            <p className="font-poppins text-lg text-gray-700 mb-8 leading-relaxed">
              Entre em contato conosco para conhecer melhor o CEI Nossa Senhora de Fátima ou agende uma visita.
            </p>
            <a
              href="/contato"
              className="inline-flex items-center px-8 py-4 bg-teal-600 text-white font-fredoka font-semibold rounded-lg hover:bg-teal-700 transition-all gap-2 text-lg border-2 border-dashed border-teal-600 hover:scale-105 transform"
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
