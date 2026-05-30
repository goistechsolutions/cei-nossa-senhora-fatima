import { ArrowRight } from 'lucide-react'
import { INSTITUTION, VISUAL_ASSETS } from '@/lib/constants'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useAuth } from '@/_core/hooks/useAuth'
import { useContentSection } from '@/hooks/useContentSection'
import { PublicGallery } from '@/components/PublicGallery'
import { trpc } from '@/lib/trpc'

export default function Home() {
  const { user } = useAuth()
  
  const { ref: diferencialRef, isVisible: diferencialVisible } = useScrollAnimation()
  const { ref: galeriaRef, isVisible: galeriaVisible } = useScrollAnimation()
  const { ref: noticiasRef, isVisible: noticiasVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()

  // Fetch conteúdo dinâmico das seções
  const heroContent = useContentSection('hero')
  const diferencialContent = useContentSection('diferenciais')
  const galeriaContent = useContentSection('galeria')
  const ctaContent = useContentSection('cta_final')

  // Fetch notícias dinâmicas do banco de dados
  const { data: noticias = [], isLoading: noticiasLoading } = trpc.news.list.useQuery()

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

  // Formatar data para exibição
  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
  }

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
                {heroContent.isLoading ? 'Carregando...' : (heroContent.title || 'Alegria Estruturada')}
              </h1>
              
              <p className="font-poppins text-lg text-gray-700 mb-4 leading-relaxed">
                {heroContent.isLoading ? 'Carregando...' : (heroContent.content || 'Na CEI Nossa Senhora de Fátima, oferecemos educação infantil graáita com excelência, transparência e muito amor.')}
              </p>

              {heroContent.subtitle && (
                <p className="font-poppins text-base text-gray-600 mb-8 leading-relaxed">
                  {heroContent.subtitle}
                </p>
              )}
              
              {!heroContent.subtitle && (
                <p className="font-poppins text-base text-gray-600 mb-8 leading-relaxed">
                  Localizada em Fartura-SP, nossa instituição filantropíca une a vivacidade infantil com estrutura pedagógica rigorosa, focando no desenvolvimento integral da primeira infância.
                </p>
              )}
              
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

              {/* Admin Link */}
              {user?.role === 'admin' && (
                <div className="mt-6 space-y-2">
                  <a 
                    href="/admin" 
                    className="block text-sm text-teal-600 hover:text-teal-700 underline font-semibold"
                  >
                    → Painel Administrativo
                  </a>
                  <a 
                    href="/admin/content" 
                    className="block text-xs text-teal-500 hover:text-teal-600"
                  >
                    Gerenciar Conteúdo
                  </a>
                  <a 
                    href="/admin/news" 
                    className="block text-xs text-teal-500 hover:text-teal-600"
                  >
                    Gerenciar Notícias
                  </a>
                </div>
              )}
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
      <section ref={diferencialRef} className="py-20 md:py-28 bg-white relative" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-diferenciais-cW7k5WfyJhr2um3vmtPLoD.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="container relative z-10">
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

      {/* Galeria de Fotos - DINÂMICA com Lightbox */}
      <section ref={galeriaRef} className="py-20 md:py-28 bg-gray-50 relative" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-galeria-S7FcsVcRz3iZgEzXC3aWFP.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="container relative z-10">
          <PublicGallery sectionKey="galeria" columns={3} showTitle={true} />
        </div>
      </section>

      {/* Seção de Notícias - DINÂMICA */}
      <section ref={noticiasRef} className="py-20 bg-gray-50 relative" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-diferenciais-2Hs8mNxQrJ5Wq9kL3pT7vM.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-fredoka-one text-4xl md:text-5xl text-teal-600 mb-4">
              Notícias e Eventos
            </h2>
            <p className="font-poppins text-lg text-gray-700 max-w-2xl mx-auto">
              Fique por dentro das atividades, eventos e atualizações do CEI Nossa Senhora de Fátima.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {noticiasLoading ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Carregando notícias...</p>
              </div>
            ) : noticias.length > 0 ? (
              noticias.slice(0, 4).map((noticia, idx) => (
                <div
                  key={noticia.id}
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 border-l-4 border-teal-600 hover:scale-105 transform ${
                    noticiasVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{
                    animationDelay: noticiasVisible ? `${idx * 0.1}s` : '0s'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{noticia.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-fredoka font-semibold text-teal-600 bg-teal-100 px-3 py-1 rounded-full">
                          {noticia.category}
                        </span>
                        <span className="text-xs text-gray-500 font-poppins">
                          {formatDate(noticia.publishedAt)}
                        </span>
                      </div>
                      <h3 className="font-fredoka-one text-lg text-teal-600 mb-2 hover:text-teal-700">
                        {noticia.title}
                      </h3>
                      <p className="font-poppins text-gray-700 text-sm leading-relaxed">
                        {noticia.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Nenhuma notícia publicada ainda.</p>
              </div>
            )}
          </div>

          {noticias.length > 0 && (
            <div className="text-center mt-12">
              <a
                href="/noticias"
                className="inline-flex items-center px-8 py-3 bg-teal-600 text-white font-fredoka font-semibold rounded-lg hover:bg-teal-700 transition-all gap-2 border-2 border-dashed border-teal-600"
              >
                Ver Todas as Notícias
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA Final - Estilo B12 */}
      <section ref={ctaRef} className="py-20 md:py-28 bg-white relative" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-cta-35R8mWoXtcKxrpPaGhsa9w.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/70"></div>
        <div className={`container relative z-10 ${ctaVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
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
