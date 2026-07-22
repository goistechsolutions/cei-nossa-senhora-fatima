import { ArrowRight, MessageCircle, Heart, BookOpen, Users, Calendar } from 'lucide-react'
import { INSTITUTION, VISUAL_ASSETS } from '@/lib/constants'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useContentSection } from '@/hooks/useContentSection'
import { PublicGallery } from '@/components/PublicGallery'
import { trpc } from '@/lib/trpc'

export default function Home() {
  const { ref: diferencialRef, isVisible: diferencialVisible } = useScrollAnimation()
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation()
  const { ref: galeriaRef, isVisible: galeriaVisible } = useScrollAnimation()
  const { ref: noticiasRef, isVisible: noticiasVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()

  const heroContent = useContentSection('hero')
  const diferencialContent = useContentSection('diferenciais')
  const galeriaContent = useContentSection('galeria')
  const ctaContent = useContentSection('cta_final')

  const { data: noticias = [], isLoading: noticiasLoading } = trpc.news.list.useQuery()

  // Stats com labels claros e dados reais
  const stats = [
    { numero: '50+', label: 'Anos de história', sublabel: 'Fundada em 1976', icone: Calendar },
    { numero: '125', label: 'Crianças atendidas', sublabel: 'Do berçário ao maternal', icone: Heart },
    { numero: '19', label: 'Profissionais dedicados', sublabel: 'Equipe especializada', icone: Users },
    { numero: '100%', label: 'Gratuito', sublabel: 'Sem custos para as famílias', icone: BookOpen },
  ]

  const diferenciais = [
    {
      titulo: 'Educação Gratuita',
      descricao: 'Acesso igualitário a uma educação de qualidade para todas as crianças, sem nenhuma barreira financeira.',
      Icone: GraduationCap,
    },
    {
      titulo: 'Pedagogia do Afeto',
      descricao: 'Relacionamentos baseados em afeto, segurança emocional e escuta atenta das necessidades de cada criança.',
      Icone: Heart,
    },
    {
      titulo: 'Horta Educativa',
      descricao: 'Aprendizado conectado com a natureza, sustentabilidade e hábitos alimentares saudáveis desde a primeira infância.',
      Icone: Sprout,
    },
    {
      titulo: 'Rotina Estruturada',
      descricao: 'Um ambiente previsível e acolhedor que oferece segurança, facilitando o aprendizado e o desenvolvimento emocional.',
      Icone: Clock,
    },
    {
      titulo: 'Berçário ao Maternal',
      descricao: 'Cuidado integral dos 4 meses aos 3 anos, respeitando cada estágio único do desenvolvimento infantil.',
      Icone: Baby,
    },
    {
      titulo: 'Transparência Total',
      descricao: 'Portal de transparência com documentos, prestação de contas e comunicação clara com a comunidade.',
      icone: '👁️'
    }
  ]

  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const whatsappUrl = `https://wa.me/5514998443897?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre o CEI Nossa Senhora de Fátima.')}`

  return (
    <main className="min-h-screen">

      {/* ────────────────────────────────────────
          HERO — proposta de valor clara e direta
      ──────────────────────────────────────── */}
      <section id="home" className="relative py-16 md:py-24 overflow-hidden" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/hero-background-home-QpMp3MTCVAJpAXNSndTBMy.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/65" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Conteúdo à Esquerda */}
            <div className="animate-fade-in-left">
              {/* Pré-título */}
              <p className="font-poppins text-sm font-semibold text-teal-600 uppercase tracking-widest mb-3">
                Fartura – SP · Desde 1976
              </p>

              <h1 className="text-gradient-turquoise text-5xl md:text-6xl lg:text-7xl mb-5 leading-tight font-bold">
                {heroContent.isLoading
                  ? 'Carregando...'
                  : (heroContent.title || 'Onde cada criança descobre o mundo com segurança e alegria')}
              </h1>

              <p className="font-poppins text-lg text-gray-700 mb-4 leading-relaxed">
                {heroContent.isLoading
                  ? ''
                  : (heroContent.content || 'O CEI Nossa Senhora de Fátima oferece educação infantil gratuita e de qualidade, cuidando do desenvolvimento integral de crianças do berçário ao maternal — com afeto, responsabilidade e alegria.')}
              </p>

              {!heroContent.subtitle && (
                <p className="font-poppins text-base text-gray-600 mb-8 leading-relaxed">
                  Uma instituição filantrópica com mais de 50 anos de história,
                  reconhecida pela comunidade de Fartura pela excelência pedagógica
                  e pelo compromisso com cada família que nos confia seus filhos.
                </p>
              )}
              {heroContent.subtitle && (
                <p className="font-poppins text-base text-gray-600 mb-8 leading-relaxed">
                  {heroContent.subtitle}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/historia"
                  className="btn-primary inline-flex items-center justify-center px-8 py-4 gap-2 text-lg"
                >
                  Conheça Nossa História
                  <ArrowRight size={18} />
                </a>
                <a
                  href="https://wa.me/5514998443897?text=Ol%C3%A1%21+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+o+CEI+Nossa+Senhora+de+F%C3%A1tima."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-poppins font-semibold rounded-lg hover:bg-green-600 transition-all text-base"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Imagem à direita */}
            <div className="relative hidden lg:flex justify-center items-center animate-fade-in-right">
              <img
                src={VISUAL_ASSETS.heroBanner}
                alt="Crianças em atividade pedagógica no CEI Nossa Senhora de Fátima"
                width={600}
                height={480}
                loading="eager"
                className="rounded-premium-lg shadow-lg-premium w-full h-auto object-cover hover:shadow-xl-premium transition-all duration-300"
              />
              {/* Badge flutuante */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-5 py-3 border border-teal-100">
                <p className="font-poppins text-xs text-gray-500 mb-0.5">Funcionamento</p>
                <p className="font-fredoka-one text-sm text-teal-600">Seg – Sex · 06h30 às 17h30</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          STATS — números com contexto real
      ──────────────────────────────────────── */}
      <section ref={statsRef} className="py-16 bg-teal-600">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icone
              return (
                <div
                  key={idx}
                  className={`text-center ${
                    statsVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: statsVisible ? `${idx * 0.1}s` : '0s' }}
                >
                  <Icon className="w-8 h-8 text-teal-200 mx-auto mb-3" />
                  <p className="font-fredoka-one text-4xl md:text-5xl text-white mb-1">{stat.numero}</p>
                  <p className="font-poppins text-sm font-semibold text-white mb-1">{stat.label}</p>
                  <p className="font-poppins text-xs text-teal-200">{stat.sublabel}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          DIFERENCIAIS PEDAGÓGICOS
      ──────────────────────────────────────── */}
      <section ref={diferencialRef} className="py-20 md:py-28 bg-white relative" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-diferenciais-cW7k5WfyJhr2um3vmtPLoD.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/75" />
        <div className="container relative z-10">
          <div className="text-center mb-14">
            <p className="font-poppins text-sm font-semibold text-teal-600 uppercase tracking-widest mb-3">Por que nos escolher</p>
            <h2 className="text-gradient-turquoise text-4xl md:text-5xl mb-4 font-bold">
              {diferencialContent.title || 'Nossos Diferenciais Pedagógicos'}
            </h2>
            <p className="font-poppins text-lg text-gray-600 max-w-2xl mx-auto">
              {diferencialContent.content || 'Uma educação que une qualidade, afeto estruturado e desenvolvimento integral — do berçário ao maternal.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diferenciais.map(({ titulo, descricao, Icone }, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 group ${
                  diferencialVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: diferencialVisible ? `${idx * 0.1}s` : '0s' }}
              >
                <div className="text-5xl mb-4">{diferencial.icone}</div>
                <h3 className="font-fredoka text-xl text-gray-900 mb-2 font-semibold">
                  {diferencial.titulo}
                </h3>
                <p className="font-poppins text-gray-600 text-sm leading-relaxed">
                  {diferencial.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          PROPOSTA DE VALOR — faixa de destaque
      ──────────────────────────────────────── */}
      <section className="py-16 bg-amber-50 border-y border-amber-100">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-poppins text-sm font-semibold text-amber-600 uppercase tracking-widest mb-3">Nossa promessa</p>
            <h2 className="font-fredoka-one text-3xl md:text-4xl text-gray-800 mb-6 leading-tight">
              "Cuidamos das crianças como se fossem nossas.
              <br />
              <span className="text-teal-600">E tratamos cada família como parceira."
              </span>
            </h2>
            <p className="font-poppins text-base text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto">
              Há mais de 50 anos, o CEI Nossa Senhora de Fátima é o lugar onde crianças de Fartura
              crescem com amor, segurança e aprendizado real — totalmente gratuito.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/historia"
                className="btn-secondary inline-flex items-center justify-center px-6 py-3 gap-2"
              >
                Nossa Trajetória
                <ArrowRight size={18} />
              </a>
              <a
                href="/missao-visao-valores"
                className="btn-secondary inline-flex items-center justify-center px-6 py-3 gap-2"
              >
                Missão e Valores
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          GALERIA
      ──────────────────────────────────────── */}
      <section ref={galeriaRef} className="py-20 md:py-28 bg-gray-50 relative" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-galeria-S7FcsVcRz3iZgEzXC3aWFP.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/75" />
        <div className="container relative z-10">
          <PublicGallery sectionKey="galeria" columns={3} showTitle={true} />
        </div>
      </section>

      {/* ────────────────────────────────────────
          NOTÍCIAS E EVENTOS
      ──────────────────────────────────────── */}
      <section ref={noticiasRef} className="py-20 bg-white relative" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-diferenciais-2Hs8mNxQrJ5Wq9kL3pT7vM.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/75" />
        <div className="container relative z-10">
          <div className="text-center mb-14">
            <p className="font-poppins text-sm font-semibold text-teal-600 uppercase tracking-widest mb-3">Fique por dentro</p>
            <h2 className="text-gradient-turquoise text-4xl md:text-5xl mb-4 font-bold">
              Notícias e Eventos
            </h2>
            <p className="font-poppins text-base text-gray-600 max-w-xl mx-auto">
              Acompanhe as atividades, celebrações e novidades do CEI Nossa Senhora de Fátima.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {noticiasLoading ? (
              // Skeleton loader
              Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="card-premium animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                    </div>
                  </div>
                </div>
              ))
            ) : noticias.length > 0 ? (
              noticias.slice(0, 4).map((noticia, idx) => (
                <div
                  key={noticia.id}
                  className={`card-premium ${
                    noticiasVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: noticiasVisible ? `${idx * 0.1}s` : '0s' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl flex-shrink-0">{noticia.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-poppins font-semibold text-white bg-gradient-institutional px-3 py-1 rounded-full">
                          {noticia.category}
                        </span>
                        <span className="text-xs text-gray-400 font-poppins">
                          {formatDate(noticia.publishedAt)}
                        </span>
                      </div>
                      <h3 className="font-fredoka text-base text-gray-900 mb-1.5 font-semibold">
                        {noticia.title}
                      </h3>
                      <p className="font-poppins text-gray-600 text-sm leading-relaxed">
                        {noticia.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-5xl mb-4">📰</p>
                <p className="font-poppins text-gray-500 font-medium">Nenhuma notícia publicada ainda.</p>
                <p className="font-poppins text-gray-400 text-sm mt-1">Em breve compartilharemos as novidades do CEI!</p>
              </div>
            )}
          </div>

          {noticias.length > 0 && (
            <div className="text-center mt-12">
              <a href="/noticias" className="btn-primary inline-flex items-center px-8 py-3 gap-2">
                Ver Todas as Notícias
                <ArrowRight size={18} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────
          CTA FINAL — duplo com WhatsApp
      ──────────────────────────────────────── */}
      <section ref={ctaRef} className="py-20 md:py-28 relative" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-cta-35R8mWoXtcKxrpPaGhsa9w.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-teal-700/90" />
        <div className={`container relative z-10 ${ ctaVisible ? 'animate-fade-in-up' : 'opacity-0' }`}>
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-poppins text-sm font-semibold text-teal-200 uppercase tracking-widest mb-3">Próximo passo</p>
            <h2 className="font-fredoka-one text-3xl md:text-5xl text-white mb-5 leading-tight">
              {ctaContent.title || 'Quer matricular seu filho ou agendar uma visita?'}
            </h2>
            <p className="font-poppins text-teal-100 mb-10 leading-relaxed">
              {ctaContent.content || 'Entre em contato agora mesmo. Nossa equipe está pronta para tirar todas as suas dúvidas e apresentar o CEI pessoalmente.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contato"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-teal-700 font-poppins font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg text-base"
              >
                Enviar Mensagem
                <ArrowRight size={18} />
              </a>
              <a
                href="https://wa.me/5514998443897?text=Ol%C3%A1%21+Gostaria+de+agendar+uma+visita+ao+CEI+Nossa+Senhora+de+F%C3%A1tima."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-poppins font-semibold rounded-xl hover:bg-green-600 transition-all shadow-lg text-base"
              >
                <MessageCircle size={20} />
                WhatsApp: (14) 99844-3897
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
