import { ArrowRight } from 'lucide-react'
import { INSTITUTION, VISUAL_ASSETS } from '@/lib/constants'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
// import { useAuth } from '@/_core/hooks/useAuth' // Desabilitado temporariamente
import { useContentSection } from '@/hooks/useContentSection'
import { PublicGallery } from '@/components/PublicGallery'
import { trpc } from '@/lib/trpc'

export default function Home() {
  // const { user } = useAuth() // Desabilitado temporariamente

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
      descricao: 'Toda criança merece uma educação de qualidade — sem nenhuma barreira financeira. Aqui, o acesso é universal e o compromisso é real.',
      icone: '🎓'
    },
    {
      titulo: 'Pedagogia do Afeto',
      descricao: 'Acreditamos que crianças aprendem melhor quando se sentem seguras e amadas. Nossos educadores constroem vínculos genuínos com cada aluno.',
      icone: '❤️'
    },
    {
      titulo: 'Horta Educativa',
      descricao: 'As crianças plantam, cuidam e colhem — aprendendo sobre natureza, alimentação saudável e responsabilidade de um jeito vivo e prático.',
      icone: '🌱'
    },
    {
      titulo: 'Rotina Estruturada',
      descricao: 'A previsibilidade traz segurança. Nossa rotina bem planejada ajuda as crianças a se desenvolverem com confiança e autonomia.',
      icone: '⏰'
    },
    {
      titulo: 'Do Berçário ao Maternal',
      descricao: 'Cuidamos desde os primeiros meses de vida até o maternal, respeitando cada fase do desenvolvimento com atenção e especialidade.',
      icone: '👶'
    },
    {
      titulo: 'Transparência Total',
      descricao: 'Nosso Portal de Transparência reúne documentos, prestações de contas e relatórios — porque as famílias merecem saber tudo sobre onde seus filhos estão.',
      icone: '👁️'
    }
  ]

  // Formatar data para exibição
  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
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
              <h1 className="text-gradient-turquoise text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight font-bold">
                {heroContent.isLoading ? 'Carregando...' : (heroContent.title || 'Onde cada criança descobre o mundo com segurança, carinho e alegria')}
              </h1>

              <p className="font-inter text-lg text-gray-700 mb-4 leading-relaxed">
                {heroContent.isLoading ? 'Carregando...' : (heroContent.content || 'O CEI Nossa Senhora de Fátima cuida do desenvolvimento integral de crianças de Fartura-SP, oferecendo educação infantil gratuita e de qualidade em um ambiente acolhedor e familiar.')}
              </p>

              {heroContent.subtitle && (
                <p className="font-inter text-base text-gray-600 mb-8 leading-relaxed">
                  {heroContent.subtitle}
                </p>
              )}

              {!heroContent.subtitle && (
                <p className="font-inter text-base text-gray-600 mb-8 leading-relaxed">
                  Localizada na Vila Nossa Senhora de Fátima, em Fartura-SP, nossa instituição filantrópica une o afeto genuíno com estrutura pedagógica rigorosa — porque infância feliz é o melhor começo.
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/historia"
                  className="btn-primary inline-flex items-center justify-center px-8 py-4 gap-2 text-lg"
                >
                  Conheça Nossa História
                  <ArrowRight size={20} />
                </a>
                <a
                  href="/contato"
                  className="btn-secondary inline-flex items-center justify-center px-8 py-4 gap-2 text-lg"
                >
                  Entre em Contato
                </a>
              </div>
            </div>

            {/* Imagem à Direita */}
            <div className="relative hidden md:block animate-fade-in-right">
              <img
                src={VISUAL_ASSETS.heroBanner}
                alt="Crianças brincando em sala de aula no CEI Nossa Senhora de Fátima"
                className="rounded-premium-lg shadow-lg-premium w-full h-auto object-cover hover:shadow-xl-premium transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais Pedagógicos */}
      <section ref={diferencialRef} className="py-20 md:py-28 bg-white relative" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-diferenciais-cW7k5WfyJhr2um3vmtPLoD.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="container relative z-10">
          <div className="mb-16 text-center">
            <h2 className="text-gradient-turquoise text-4xl md:text-5xl mb-4 font-bold">
              Por que escolher o CEI Nossa Senhora de Fátima?
            </h2>
            <p className="font-inter text-lg text-gray-700 max-w-2xl mx-auto">
              Décadas de experiência, educadores dedicados e um ambiente pensado para cada fase da infância.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diferenciais.map((diferencial, idx) => (
              <div
                key={idx}
                className={`card-premium ${
                  diferencialVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{
                  animationDelay: diferencialVisible ? `${idx * 0.1}s` : '0s'
                }}
              >
                <div className="text-6xl mb-4 hover:scale-110 transition-transform duration-300">{diferencial.icone}</div>
                <h3 className="font-fredoka text-2xl text-gray-900 mb-3 font-semibold">
                  {diferencial.titulo}
                </h3>
                <p className="font-inter text-gray-700 leading-relaxed">
                  {diferencial.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
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

      {/* Seção de Notícias */}
      <section ref={noticiasRef} className="py-20 bg-gray-50 relative" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-diferenciais-2Hs8mNxQrJ5Wq9kL3pT7vM.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/70"></div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-gradient-turquoise text-4xl md:text-5xl mb-4 font-bold">
              Notícias e Eventos
            </h2>
            <p className="font-inter text-lg text-gray-700 max-w-2xl mx-auto">
              Acompanhe as atividades, celebrações e novidades do dia a dia do CEI.
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
                  className={`card-premium border-l-4 border-turquoise ${
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
                        <span className="text-xs font-fredoka font-semibold text-white bg-gradient-institutional px-3 py-1 rounded-full">
                          {noticia.category}
                        </span>
                        <span className="text-xs text-gray-500 font-inter">
                          {formatDate(noticia.publishedAt)}
                        </span>
                      </div>
                      <h3 className="font-fredoka text-lg text-gradient-turquoise mb-2 font-semibold">
                        {noticia.title}
                      </h3>
                      <p className="font-inter text-gray-700 text-sm leading-relaxed">
                        {noticia.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-5xl mb-4">📰</div>
                <h3 className="font-fredoka text-xl text-gray-700 mb-2">Novidades em breve!</h3>
                <p className="font-inter text-gray-500 max-w-sm mx-auto">
                  Em breve publicaremos notícias, eventos e atividades especiais. Fique de olho!
                </p>
              </div>
            )}
          </div>

          {noticias.length > 0 && (
            <div className="text-center mt-12">
              <a
                href="/noticias"
                className="btn-primary inline-flex items-center px-8 py-3 gap-2"
              >
                Ver Todas as Notícias
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section ref={ctaRef} className="py-20 md:py-28 bg-white relative" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-cta-35R8mWoXtcKxrpPaGhsa9w.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/70"></div>
        <div className={`container relative z-10 ${ctaVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-gradient-turquoise text-4xl md:text-5xl mb-6 font-bold">
              Quer conhecer o CEI de perto?
            </h2>
            <p className="font-inter text-lg text-gray-700 mb-8 leading-relaxed">
              Agende uma visita, tire suas dúvidas ou entre em contato conosco. Será um prazer receber você e sua família.
            </p>
            <a
              href="/contato"
              className="btn-primary inline-flex items-center px-8 py-4 gap-2 text-lg"
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
