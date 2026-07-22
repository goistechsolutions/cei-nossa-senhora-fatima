import { ArrowRight, Phone, GraduationCap, Heart, Sprout, Clock, Baby, Eye, Newspaper, MapPin } from 'lucide-react'
import { INSTITUTION, VISUAL_ASSETS } from '@/lib/constants'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useContentSection } from '@/hooks/useContentSection'
import { PublicGallery } from '@/components/PublicGallery'
import { trpc } from '@/lib/trpc'

export default function Home() {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation()
  const { ref: diferencialRef, isVisible: diferencialVisible } = useScrollAnimation()
  const { ref: galeriaRef, isVisible: galeriaVisible } = useScrollAnimation()
  const { ref: noticiasRef, isVisible: noticiasVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()

  const heroContent = useContentSection('hero')
  const { data: noticias = [], isLoading: noticiasLoading } = trpc.news.list.useQuery()

  const stats = [
    { valor: '115', label: 'Crianças atendidas', sufixo: '' },
    { valor: '14', label: 'Anos de história', sufixo: '+' },
    { valor: '19', label: 'Profissionais dedicados', sufixo: '' },
    { valor: '100', label: 'Gratuidade total', sufixo: '%' },
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
      descricao: 'Portal de transparência com documentos, prestação de contas e comunicação aberta com a comunidade.',
      Icone: Eye,
    },
  ]

  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const whatsappUrl = `https://wa.me/5514998443897?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre o CEI Nossa Senhora de Fátima.')}`

  return (
    <main className="min-h-screen">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative py-16 md:py-24 bg-white overflow-hidden"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/hero-background-home-QpMp3MTCVAJpAXNSndTBMy.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-white/60" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Copy à esquerda */}
            <div className="animate-fade-in-left">
              {/* Eyebrow */}
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-turquoise-600 uppercase tracking-widest mb-4">
                <MapPin size={14} />
                Fartura · SP
              </span>

              <h1 className="text-gradient-turquoise text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight font-bold">
                {heroContent.isLoading
                  ? 'Carregando...'
                  : (heroContent.title || 'Onde cada criança floresce com amor e cuidado')}
              </h1>

              <p className="font-inter text-lg text-gray-700 mb-4 leading-relaxed">
                {heroContent.isLoading
                  ? ''
                  : (heroContent.content ||
                    'O CEI Nossa Senhora de Fátima oferece educação infantil 100% gratuita para crianças de 4 meses a 3 anos, unindo pedagogia de qualidade, afeto genuíno e parceria com as famílias.')}
              </p>

              <p className="font-inter text-base text-gray-600 mb-8 leading-relaxed">
                {heroContent.subtitle ||
                  'Funcionamos de segunda a sexta das 06h45 às 17h30, em sede própria na Vila Nossa Senhora de Fátima.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/historia"
                  className="btn-primary inline-flex items-center justify-center px-8 py-4 gap-2 text-lg"
                >
                  Conheça Nossa História
                  <ArrowRight size={20} />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center justify-center px-8 py-4 gap-2 text-lg"
                >
                  {/* WhatsApp SVG inline */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Falar pelo WhatsApp
                </a>
              </div>
            </div>

            {/* Imagem à direita */}
            <div className="relative hidden md:block animate-fade-in-right">
              <img
                src={VISUAL_ASSETS.heroBanner}
                alt="Criança sorrindo em sala de aula do CEI Nossa Senhora de Fátima"
                width={600}
                height={480}
                loading="eager"
                className="rounded-premium-lg shadow-lg-premium w-full h-auto object-cover hover:shadow-xl-premium transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        className="py-14 bg-gradient-to-r from-turquoise-600 to-turquoise-700"
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`${
                  statsVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: statsVisible ? `${idx * 0.12}s` : '0s' }}
              >
                <p className="font-fredoka text-5xl md:text-6xl font-bold text-white leading-none">
                  {stat.valor}
                  <span className="text-3xl">{stat.sufixo}</span>
                </p>
                <p className="font-inter text-sm md:text-base text-white/80 mt-2 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIFERENCIAIS ─────────────────────────────────────── */}
      <section
        ref={diferencialRef}
        className="py-20 md:py-28 bg-white relative"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-diferenciais-cW7k5WfyJhr2um3vmtPLoD.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-white/70" />
        <div className="container relative z-10">
          <div className="mb-16 text-center">
            <h2 className="text-gradient-turquoise text-4xl md:text-5xl mb-4 font-bold">
              Nossos Diferenciais Pedagógicos
            </h2>
            <p className="font-inter text-lg text-gray-700 max-w-2xl mx-auto">
              Uma educação que une qualidade, afeto estruturado e desenvolvimento integral
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diferenciais.map(({ titulo, descricao, Icone }, idx) => (
              <div
                key={idx}
                className={`card-premium group ${
                  diferencialVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: diferencialVisible ? `${idx * 0.1}s` : '0s' }}
              >
                {/* SVG icon em círculo sutil — sem filled circle colorido */}
                <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-xl bg-turquoise-50 text-turquoise-600 group-hover:bg-turquoise-100 transition-colors duration-300">
                  <Icone size={24} strokeWidth={1.75} />
                </div>
                <h3 className="font-fredoka text-2xl text-gray-900 mb-3 font-semibold">
                  {titulo}
                </h3>
                <p className="font-inter text-gray-700 leading-relaxed">
                  {descricao}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALERIA ──────────────────────────────────────────── */}
      <section
        ref={galeriaRef}
        className="py-20 md:py-28 bg-gray-50 relative"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-galeria-S7FcsVcRz3iZgEzXC3aWFP.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-white/70" />
        <div className="container relative z-10">
          <PublicGallery sectionKey="galeria" columns={3} showTitle={true} />
        </div>
      </section>

      {/* ─── NOTÍCIAS ─────────────────────────────────────────── */}
      <section
        ref={noticiasRef}
        className="py-20 bg-gray-50 relative"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-diferenciais-2Hs8mNxQrJ5Wq9kL3pT7vM.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-white/70" />
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-gradient-turquoise text-4xl md:text-5xl mb-4 font-bold">
              Notícias e Eventos
            </h2>
            <p className="font-inter text-lg text-gray-700 max-w-2xl mx-auto">
              Fique por dentro das atividades, eventos e atualizações do CEI Nossa Senhora de Fátima.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {noticiasLoading ? (
              // Skeleton loader enquanto carrega
              Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="card-premium animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-200 flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-2/3" />
                    </div>
                  </div>
                </div>
              ))
            ) : noticias.length > 0 ? (
              noticias.slice(0, 4).map((noticia, idx) => (
                <div
                  key={noticia.id}
                  className={`card-premium border-l-4 border-turquoise ${
                    noticiasVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: noticiasVisible ? `${idx * 0.1}s` : '0s' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-turquoise-50 flex items-center justify-center flex-shrink-0">
                      <Newspaper size={20} className="text-turquoise-600" />
                    </div>
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
              // Empty state humanizado
              <div className="col-span-full flex flex-col items-center text-center py-16 px-8">
                <div className="w-16 h-16 rounded-2xl bg-turquoise-50 flex items-center justify-center mb-5">
                  <Newspaper size={32} className="text-turquoise-400" strokeWidth={1.5} />
                </div>
                <h3 className="font-fredoka text-xl text-gray-800 font-semibold mb-2">
                  Em breve, novidades por aqui!
                </h3>
                <p className="font-inter text-gray-500 text-sm max-w-xs leading-relaxed">
                  Estamos preparando conteúdos sobre as atividades, projetos e eventos do CEI. Volte em breve.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-turquoise-600 hover:text-turquoise-700 transition-colors"
                >
                  Receber novidades pelo WhatsApp
                  <ArrowRight size={14} />
                </a>
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
                <ArrowRight size={16} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        className="py-20 md:py-28 bg-white relative"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/bg-cta-35R8mWoXtcKxrpPaGhsa9w.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-white/70" />
        <div
          className={`container relative z-10 ${
            ctaVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-gradient-turquoise text-4xl md:text-5xl mb-6 font-bold">
              Venha conhecer o CEI pessoalmente
            </h2>
            <p className="font-inter text-lg text-gray-700 mb-10 leading-relaxed">
              Agende uma visita, tire dúvidas sobre vagas ou fale diretamente conosco — estamos prontos para receber você e sua família.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Botão WhatsApp — destaque principal */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center px-8 py-4 gap-3 text-lg"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Falar pelo WhatsApp
              </a>
              {/* Botão de contato secundário */}
              <a
                href="/contato"
                className="btn-secondary inline-flex items-center justify-center px-8 py-4 gap-2 text-lg"
              >
                <Phone size={20} />
                Página de Contato
              </a>
            </div>
            {/* Endereço sutil abaixo dos botões */}
            <p className="mt-8 text-sm text-gray-500 font-inter inline-flex items-center gap-1 justify-center">
              <MapPin size={14} className="text-turquoise-500" />
              Rua Santa Bernadete, 171 — Vila Nossa Senhora de Fátima, Fartura-SP
            </p>
          </div>
        </div>
      </section>

    </main>
  )
}
