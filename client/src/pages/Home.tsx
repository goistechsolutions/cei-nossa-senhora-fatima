/*
Direção visual escolhida: Editorial Lúdico Humanista.
Esta página usa base creme, ondas orgânicas, cartões assimétricos, contornos roxos, acentos turquesa/amarelo e tipografia Baloo 2 + Nunito Sans para demonstrar os novos ativos visuais do CEI Nossa Senhora de Fátima sem diluir a identidade acolhedora, institucional e infantil.
*/
import {
  ArrowRight,
  BookOpen,
  CalendarHeart,
  ChevronDown,
  ClipboardCheck,
  ExternalLink,
  FileText,
  GraduationCap,
  HeartHandshake,
  Leaf,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Utensils,
  Users,
} from "lucide-react";

const assets = {
  hero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/cei_demo_hero_editorial_ludico-No3rAm2P9YjVnTPngp3Dq7.webp",
  pilares: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/cei_demo_pilares_mural_premium-YGZtvBYRLj6U67MdPeX68k.webp",
  mobile: "https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/cei_demo_mobile_matriculas_story-5prAWnvZhb583wf55r69Kt.webp",
  galeria: "/manus-storage/secao_nossa_turma_galeria_curva_62d04234.png",
  projetos: "/manus-storage/banner_projetos_pedagogicos_ludicos_4f578275.png",
  cards: "/manus-storage/cards_servicos_institucionais_site_a0c45430.png",
  pattern: "/manus-storage/background_pattern_confetes_premium_ae50dc8d.png",
  footer: "/manus-storage/background_footer_ondas_mascotes_0c1efcd2.png",
};

const officialBase = "https://www.ceinsf.com.br/ceinsf";

const institutionMenu = [
  { label: "A Entidade", href: "#entidade" },
  { label: "Diretorias", href: "#diretoria" },
  { label: "Galeria de Fotos", href: "#galeria" },
];

const transparencyItems = [
  {
    label: "Estatuto Social",
    href: `${officialBase}/estatutoSocial`,
    icon: FileText,
    text: "Documento institucional de organização e finalidade da entidade.",
  },
  {
    label: "Regimento Interno",
    href: `${officialBase}/regimentoInterno`,
    icon: ClipboardCheck,
    text: "Normas internas para funcionamento e convivência institucional.",
  },
  {
    label: "Regulamento de Contratação",
    href: `${officialBase}/regulamentoContratacao`,
    icon: Users,
    text: "Regras de recrutamento, seleção e contratação de pessoal.",
  },
  {
    label: "Regulamento de Compras",
    href: `${officialBase}/regulamentoCompras`,
    icon: ShoppingCart,
    text: "Critérios para compras e contratação de serviços pela instituição.",
  },
  {
    label: "Editais",
    href: `${officialBase}/editais`,
    icon: Megaphone,
    text: "Publicações oficiais, chamadas e comunicados de interesse público.",
  },
  {
    label: "Portal da Transparência",
    href: `${officialBase}/portalTransparencia`,
    icon: ShieldCheck,
    text: "Acesso centralizado às informações públicas e prestações de contas.",
  },
];

const officialHighlights = [
  { value: "CME nº 03", label: "Inscrição no Conselho Municipal de Educação" },
  { value: "CMDCA nº 06", label: "Registro no Conselho Municipal dos Direitos da Criança" },
  { value: "INEP 38438558", label: "Código oficial da instituição educacional" },
  { value: "Sede própria", label: "Atendimento na Vila Nossa Senhora de Fátima, em Fartura - SP" },
];

const pillars = [
  {
    icon: HeartHandshake,
    title: "Pedagogia do Afeto",
    text: "O site atual comunica que cada criança deve ser cercada por amor e cuidado. A nova página transforma essa premissa em linguagem visual clara para famílias e parceiros.",
    color: "bg-[#FFF0C2] text-[#572E80]",
  },
  {
    icon: Utensils,
    title: "Educar e cuidar",
    text: "A missão oficial destaca educação e socialização ao cuidar e educar simultaneamente, considerando aspectos físicos, psicológicos, intelectuais e sociais.",
    color: "bg-[#DFF8EE] text-[#075F54]",
  },
  {
    icon: ShieldCheck,
    title: "Transparência e confiança",
    text: "O novo menu de transparência mantém acesso direto a estatuto, regimentos, regulamentos, editais e portal, conforme a estrutura atual da instituição.",
    color: "bg-[#E7F7FA] text-[#0D5578]",
  },
];

const sections = [
  {
    label: "Ideia 01",
    title: "Home com proposta institucional e conversão suave",
    text: "A primeira dobra apresenta o Projeto Criança com texto acolhedor, botões para conhecer a entidade e acessar documentos, além de espaço visual para os ativos lúdicos criados.",
    image: assets.hero,
  },
  {
    label: "Ideia 02",
    title: "Bloco de missão, visão e valores com aparência editorial",
    text: "Os conteúdos do site atual foram reorganizados em cartões legíveis, permitindo que famílias entendam rapidamente o compromisso pedagógico e comunitário do CEI.",
    image: assets.pilares,
  },
  {
    label: "Ideia 03",
    title: "Transparência como área nobre, não apenas rodapé",
    text: "O submenu obrigatório aparece na navegação principal e também em cartões destacados, com ícones e links para as páginas oficiais correspondentes.",
    image: assets.projetos,
  },
];

const contentBlocks = [
  {
    title: "Projeto Criança",
    text: "Ambiente acolhedor e seguro, onde a aprendizagem é uma jornada emocionante, com amor, cuidado e momentos de lazer que enriquecem a infância.",
  },
  {
    title: "Objetivos",
    text: "Possibilitar experiências de ensino e aprendizagem que promovam o desenvolvimento integral das crianças: cognitivo, físico e socioemocional.",
  },
  {
    title: "Missão",
    text: "Educação e socialização ao cuidar e educar simultaneamente, priorizando os aspectos físico, psicológico, intelectual e social em diálogo com família e comunidade.",
  },
  {
    title: "Visão",
    text: "Compreender a infância e reconhecer a criança em uma perspectiva de educação para a cidadania e para a qualidade da formação humana.",
  },
  {
    title: "Valores",
    text: "Respeito, paciência, responsabilidade, diálogo, tolerância, criatividade, cooperação, compaixão, generosidade, amizade e liberdade.",
  },
  {
    title: "Oportunidades",
    text: "Manter área de Trabalhe Conosco para banco de currículos, processos seletivos e comunicados de contratação, conectada ao regulamento institucional.",
  },
];

const boardMembers = [
  ["José Antônio Correa Custódio", "Presidente"],
  ["Simone Maria Alcântara", "Vice-Presidente"],
  ["Daniel Romero Silva", "Tesoureiro(a)"],
  ["Flávio Ferreira da Silva", "Secretário(a)"],
  ["Juliano Damásio de Castro", "2º Secretário(a)"],
  ["Valter Adrino Miranda", "1º Conselheiro(a) Fiscal"],
];

function DropdownMenu({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  return (
    <div className="group relative">
      <button className="inline-flex items-center gap-1.5 py-2 text-sm font-extrabold text-[#22243A]/82 transition-colors hover:text-[#8B3A9B] focus:text-[#8B3A9B] focus:outline-none">
        {label} <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 translate-y-4 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-2 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-2 group-focus-within:opacity-100">
        <div className="h-1 rounded-full bg-[#EC64A5]" />
        <div className="rounded-b-[1.6rem] bg-white p-4 shadow-[0_24px_60px_rgba(43,38,68,0.18)] ring-1 ring-[#572E80]/10">
          {items.map((item) => (
            <a key={item.label} href={item.href} className="flex items-center gap-3 rounded-2xl px-3 py-3 text-base font-extrabold text-[#17335E] transition hover:bg-[#FFF0C2]/70 hover:text-[#8B3A9B]">
              <span className="grid h-5 w-5 place-items-center rounded-full border-2 border-[#17335E]/70 text-[10px]">•</span>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF8EA] text-[#16192B]">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/60 bg-[#FFF8EA]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <a href="#topo" className="group flex items-center gap-3" aria-label="Ir para o início da demonstração">
            <span className="grid h-12 w-12 place-items-center rounded-[1.2rem] bg-[#572E80] text-white shadow-[0_12px_28px_rgba(87,46,128,0.22)] transition-transform group-hover:-rotate-3 group-hover:scale-105">
              <Sparkles className="h-6 w-6" />
            </span>
            <span className="leading-tight">
              <strong className="block font-display text-xl text-[#572E80]">CEI Nossa Senhora</strong>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#26768D]">Fátima • Fartura-SP</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
            <a href="#topo" className="nav-link-active">Home</a>
            <DropdownMenu label="CEI Nossa Senhora De Fátima" items={institutionMenu} />
            <DropdownMenu label="Transparência" items={transparencyItems.map(({ label, href }) => ({ label, href }))} />
            <DropdownMenu label="Oportunidades" items={[{ label: "Trabalhe Conosco", href: `${officialBase}/enviarCurriculo` }]} />
            <a href="#contatos" className="nav-link">Contatos</a>
            <a href="#transparencia" className="grid h-11 w-11 place-items-center rounded-full border border-[#17335E]/15 bg-white/70 text-[#17335E] transition hover:-translate-y-0.5 hover:bg-white" aria-label="Pesquisar documentos de transparência">
              <Search className="h-5 w-5" />
            </a>
          </nav>
          <a href="#transparencia" className="rounded-full bg-[#8B3A9B] px-5 py-3 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(139,58,155,0.25)] transition hover:-translate-y-0.5 hover:bg-[#572E80]">
            Transparência
          </a>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-5 pb-3 text-xs font-black text-[#17335E] sm:grid-cols-4 lg:hidden">
          <a href="#entidade" className="mobile-nav-pill">Entidade</a>
          <a href="#transparencia" className="mobile-nav-pill">Transparência</a>
          <a href="#oportunidades" className="mobile-nav-pill">Oportunidades</a>
          <a href="#contatos" className="mobile-nav-pill">Contatos</a>
        </div>
      </header>

      <section id="topo" className="relative pt-40 lg:pt-28">
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: `url(${assets.pattern})`, backgroundSize: "900px auto" }} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-24 lg:pt-14">
          <div className="z-10 flex flex-col justify-center">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#8B3A9B]/20 bg-white/75 px-4 py-2 text-sm font-extrabold text-[#572E80] shadow-sm">
              <GraduationCap className="h-4 w-4" /> Conteúdo oficial + novas ideias visuais
            </span>
            <h1 className="font-display text-5xl font-black leading-[0.92] tracking-[-0.04em] text-[#171A2E] sm:text-6xl lg:text-7xl">
              Cuidado, educação e amor para a primeira infância.
            </h1>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-[#31354A]/82">
              Demonstração de uma nova página institucional para o Centro de Educação Infantil Nossa Senhora de Fátima, combinando os ativos visuais criados com informações do site atual: missão, entidade, diretoria, oportunidades e transparência.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#entidade" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0D5E9B] px-7 py-4 text-base font-extrabold text-white shadow-[0_18px_42px_rgba(13,94,155,0.22)] transition hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(13,94,155,0.28)]">
                Conhecer a entidade <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#transparencia" className="inline-flex items-center justify-center rounded-full border-2 border-[#572E80] bg-white/70 px-7 py-4 text-base font-extrabold text-[#572E80] transition hover:-translate-y-1 hover:bg-white">
                Ver transparência
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-10 top-8 hidden h-28 w-28 rounded-full bg-[#FFD166] blur-2xl lg:block" />
            <div className="relative overflow-hidden rounded-[2.4rem] border-[10px] border-white bg-white shadow-[0_28px_80px_rgba(43,38,68,0.18)]">
              <img src={assets.hero} alt="Banner visual com crianças brincando, ondas e elementos lúdicos para hero institucional" className="h-full min-h-[360px] w-full object-cover" />
            </div>
            <div className="absolute -bottom-7 left-6 max-w-[300px] rounded-[1.7rem] bg-white/92 p-5 shadow-[0_18px_42px_rgba(43,38,68,0.18)] backdrop-blur-md">
              <p className="font-display text-2xl font-black text-[#572E80]">Projeto Criança</p>
              <p className="mt-1 text-sm font-bold leading-6 text-[#31354A]/75">Ambiente acolhedor e seguro, com aprendizagem, amor, cuidado e lazer.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="entidade" className="relative bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div>
            <span className="section-kicker">A Entidade</span>
            <h2 className="mt-4 font-display text-4xl font-black leading-tight tracking-[-0.03em] text-[#171A2E] lg:text-5xl">Uma instituição com sede própria e atuação educacional comunitária.</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-[#31354A]/78">
              O site atual informa que o CEI Nossa Senhora de Fátima é um estabelecimento de ensino inscrito no CME nº 03 e no CMDCA nº 06, com código INEP 38438558, funcionando em sede própria na Vila Nossa Senhora de Fátima, em Fartura-SP.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {officialHighlights.map((item) => (
              <article key={item.value} className="rounded-[2rem] border border-[#572E80]/10 bg-[#FFF8EA] p-6 shadow-[0_18px_50px_rgba(43,38,68,0.08)]">
                <strong className="font-display text-3xl font-black text-[#572E80]">{item.value}</strong>
                <p className="mt-2 text-sm font-bold leading-6 text-[#31354A]/72">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pilares" className="relative py-20">
        <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: `url(${assets.pattern})`, backgroundSize: "820px auto" }} />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <span className="section-kicker">Missão, cuidado e confiança</span>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight tracking-[-0.03em] text-[#171A2E] lg:text-5xl">Conteúdo oficial transformado em experiência navegável.</h2>
            </div>
            <p className="max-w-md text-base font-semibold leading-7 text-[#31354A]/74">A proposta reorganiza informações já existentes no site atual com melhor hierarquia, leitura e chamadas para ação.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="group rounded-[2rem] border border-[#572E80]/10 bg-white p-6 shadow-[0_18px_50px_rgba(43,38,68,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(43,38,68,0.12)]">
                  <div className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl ${item.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-2xl font-black text-[#572E80]">{item.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#31354A]/76">{item.text}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-12 space-y-9">
            {sections.map((section, index) => (
              <article key={section.title} className={`grid gap-7 rounded-[2.5rem] bg-white p-4 shadow-[0_26px_80px_rgba(43,38,68,0.12)] lg:grid-cols-2 lg:p-6 ${index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                <div className="overflow-hidden rounded-[2rem] bg-[#FFF8EA]">
                  <img src={section.image} alt={section.title} className="h-full min-h-[300px] w-full object-cover transition duration-700 hover:scale-[1.035]" />
                </div>
                <div className="flex flex-col justify-center p-5 lg:p-10">
                  <span className="mb-4 w-fit rounded-full bg-[#FFD166]/55 px-4 py-2 text-sm font-black text-[#572E80]">{section.label}</span>
                  <h3 className="font-display text-3xl font-black leading-tight tracking-[-0.02em] text-[#171A2E] lg:text-4xl">{section.title}</h3>
                  <p className="mt-5 text-lg font-semibold leading-8 text-[#31354A]/76">{section.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="conteudos" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-10 text-center">
            <span className="section-kicker mx-auto">Arquitetura de conteúdo</span>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-black leading-tight tracking-[-0.03em] text-[#171A2E] lg:text-5xl">Blocos institucionais sugeridos para o novo site.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {contentBlocks.map((card, index) => (
              <article key={card.title} className="group relative overflow-hidden rounded-[2rem] border border-[#572E80]/10 bg-[#FFF8EA] p-7 shadow-[0_18px_48px_rgba(43,38,68,0.09)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_26px_70px_rgba(43,38,68,0.14)]">
                <span className="absolute right-5 top-4 font-display text-5xl font-black text-[#8B3A9B]/10">0{index + 1}</span>
                <h3 className="font-display text-2xl font-black text-[#572E80]">{card.title}</h3>
                <p className="mt-3 text-base font-semibold leading-7 text-[#31354A]/74">{card.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 overflow-hidden rounded-[2.5rem] border-[10px] border-[#FFF8EA] shadow-[0_28px_80px_rgba(43,38,68,0.13)]">
            <img src={assets.cards} alt="Cards visuais para serviços e diferenciais institucionais" className="w-full object-cover" />
          </div>
        </div>
      </section>

      <section id="transparencia" className="relative py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <span className="section-kicker">Menu Transparência</span>
              <h2 className="mt-4 font-display text-4xl font-black leading-tight tracking-[-0.03em] text-[#171A2E] lg:text-5xl">Todos os itens conforme o site atual.</h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-[#31354A]/78">
                Além do submenu no cabeçalho, a área de transparência ganhou destaque próprio para facilitar acesso a documentos, regulamentos e publicações oficiais.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {transparencyItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="group rounded-[2rem] bg-white p-6 shadow-[0_18px_48px_rgba(43,38,68,0.10)] ring-1 ring-[#572E80]/10 transition hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(43,38,68,0.15)]">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <span className="grid h-13 w-13 place-items-center rounded-2xl bg-[#E7F7FA] text-[#0D5E9B]"><Icon className="h-6 w-6" /></span>
                      <ExternalLink className="h-4 w-4 text-[#8B3A9B] opacity-70 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <h3 className="font-display text-2xl font-black text-[#572E80]">{item.label}</h3>
                    <p className="mt-2 text-sm font-bold leading-6 text-[#31354A]/72">{item.text}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="galeria" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="overflow-hidden rounded-[2.5rem] border-[10px] border-[#FFF8EA] shadow-[0_26px_80px_rgba(43,38,68,0.14)]">
              <img src={assets.galeria} alt="Galeria conceitual com crianças em atividades de leitura, blocos e natureza" className="w-full object-cover" />
            </div>
            <div>
              <span className="section-kicker">Galeria de Fotos</span>
              <h2 className="mt-4 font-display text-4xl font-black leading-tight tracking-[-0.03em] text-[#171A2E] lg:text-5xl">Uma área preparada para registros reais autorizados.</h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-[#31354A]/78">
                O site atual já possui galeria de fotos da creche. Na nova estrutura, essa seção pode receber filtros por ano, projetos, eventos e atividades, mantendo uma estética consistente mesmo com fotos de diferentes formatos.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-[#E7F7FA] p-5">
                  <Leaf className="mb-3 h-6 w-6 text-[#0D8A79]" />
                  <strong className="font-display text-xl text-[#0D5E9B]">Natureza e descoberta</strong>
                  <p className="mt-2 text-sm font-bold leading-6 text-[#31354A]/72">Espaço ideal para projetos de horta, cuidado e exploração sensorial.</p>
                </div>
                <div className="rounded-[1.5rem] bg-[#FFF0C2] p-5">
                  <CalendarHeart className="mb-3 h-6 w-6 text-[#8B3A9B]" />
                  <strong className="font-display text-xl text-[#572E80]">Rotina acolhedora</strong>
                  <p className="mt-2 text-sm font-bold leading-6 text-[#31354A]/72">Mostra os momentos do dia com linguagem leve e institucional.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="diretoria" className="relative py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <span className="section-kicker">Diretorias</span>
              <h2 className="mt-4 font-display text-4xl font-black leading-tight tracking-[-0.03em] text-[#171A2E] lg:text-5xl">Governança apresentada com clareza.</h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-[#31354A]/78">A página atual lista a diretoria e conselhos. A nova demonstração organiza os nomes em cartões mais escaneáveis e compatíveis com a identidade visual proposta.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {boardMembers.map(([name, role]) => (
                <article key={name} className="rounded-[1.7rem] bg-white p-5 shadow-[0_16px_42px_rgba(43,38,68,0.09)] ring-1 ring-[#572E80]/10">
                  <p className="font-display text-xl font-black text-[#572E80]">{name}</p>
                  <p className="mt-1 text-sm font-extrabold uppercase tracking-[0.12em] text-[#26768D]">{role}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="oportunidades" className="bg-[#162A68] py-20 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <div className="relative mx-auto max-w-sm lg:mx-0">
            <div className="absolute -inset-5 rounded-[3rem] bg-[#2BCDCD]/22 blur-2xl" />
            <img src={assets.mobile} alt="Arte vertical para matrícula, visita guiada e oportunidades" className="relative rounded-[2.5rem] border-[10px] border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.32)]" />
          </div>
          <div>
            <span className="inline-flex rounded-full bg-white/12 px-4 py-2 text-sm font-black text-[#FFD166]">Matrículas, visitas e oportunidades</span>
            <h2 className="mt-5 font-display text-4xl font-black leading-tight tracking-[-0.03em] lg:text-6xl">Canais claros para famílias, comunidade e candidatos.</h2>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/78">
              O novo site pode concentrar chamadas para visita guiada, contato por telefone, WhatsApp, envio de currículo e acesso aos documentos de contratação, reduzindo dúvidas e tornando a navegação mais objetiva.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contatos" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD166] px-7 py-4 text-base font-black text-[#572E80] transition hover:-translate-y-1 hover:bg-white">
                Falar com o CEI <ArrowRight className="h-5 w-5" />
              </a>
              <a href={`${officialBase}/enviarCurriculo`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-4 text-base font-black text-white transition hover:-translate-y-1 hover:bg-white/10">
                Trabalhe Conosco
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer id="contatos" className="relative overflow-hidden bg-[#FFF8EA] pt-14">
        <div className="mx-auto max-w-7xl px-5 pb-10 lg:px-8">
          <div className="rounded-[2.5rem] bg-white/82 p-8 shadow-[0_18px_55px_rgba(43,38,68,0.10)] lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <h2 className="font-display text-3xl font-black text-[#572E80]">CEI Nossa Senhora de Fátima</h2>
                <p className="mt-2 max-w-2xl font-semibold leading-7 text-[#31354A]/74">Demonstração atualizada com conteúdo do site oficial e menu de transparência completo, pronta para validação de conteúdo, navegação e estética.</p>
                <div className="mt-6 grid gap-3 text-sm font-bold text-[#31354A]/78">
                  <p className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#8B3A9B]" /> Rua Santa Bernadete, 171, Vila Nossa Senhora de Fátima, Fartura - SP</p>
                  <p className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#8B3A9B]" /> (14) 3382-1327 • (14) 99844-3897</p>
                  <p className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#8B3A9B]" /> ceinsffartura@yahoo.com.br</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[...institutionMenu, ...transparencyItems.slice(0, 4).map(({ label, href }) => ({ label, href }))].map((item) => (
                  <a key={`${item.label}-${item.href}`} href={item.href} className="rounded-2xl bg-[#FFF8EA] px-4 py-3 text-sm font-black text-[#17335E] transition hover:-translate-y-0.5 hover:bg-[#FFF0C2]">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <img src={assets.footer} alt="Rodapé decorativo com ondas e mascotes infantis" className="mt-2 w-full object-cover" />
      </footer>
    </main>
  );
}
