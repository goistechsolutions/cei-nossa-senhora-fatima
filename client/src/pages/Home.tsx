/*
Direção visual escolhida: Editorial Lúdico Humanista.
Esta página usa base creme, ondas orgânicas, cartões assimétricos, contornos roxos, acentos turquesa/amarelo e tipografia Baloo 2 + Nunito Sans para demonstrar os novos ativos visuais do CEI Nossa Senhora de Fátima sem diluir a identidade acolhedora, institucional e infantil.
*/
import { ArrowRight, BookOpen, CalendarHeart, HeartHandshake, Leaf, ShieldCheck, Sparkles, Utensils } from "lucide-react";

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

const navItems = ["Conceito", "Pilares", "Galeria", "Matrículas"];

const pillars = [
  {
    icon: HeartHandshake,
    title: "Pedagogia do Afeto",
    text: "Uma narrativa visual que comunica acolhimento, vínculo e presença educativa desde a primeira dobra do site.",
    color: "bg-[#FFF0C2] text-[#572E80]",
  },
  {
    icon: Utensils,
    title: "Nutrição e Cuidado",
    text: "Elementos verdes e amarelos reforçam crescimento, rotina saudável e atenção integral à criança.",
    color: "bg-[#DFF8EE] text-[#075F54]",
  },
  {
    icon: ShieldCheck,
    title: "Ambiente Seguro",
    text: "Contornos arredondados, áreas claras e símbolos de proteção criam confiança para famílias e apoiadores.",
    color: "bg-[#E7F7FA] text-[#0D5578]",
  },
];

const sections = [
  {
    label: "Ideia 01",
    title: "Hero institucional com espaço real para conversão",
    text: "O banner principal foi pensado para receber uma chamada curta, botão de matrícula e link secundário para conhecer a entidade, mantendo contraste adequado sobre área clara.",
    image: assets.hero,
  },
  {
    label: "Ideia 02",
    title: "Mural de pilares como seção de diferenciais",
    text: "A composição com três cartões permite transformar os ícones já recriados em uma seção objetiva sobre afeto, nutrição e segurança.",
    image: assets.pilares,
  },
  {
    label: "Ideia 03",
    title: "Projetos pedagógicos com linguagem editorial",
    text: "Materiais pedagógicos, ondas e espaço vazio para texto ajudam a apresentar leitura, musicalização, natureza e criatividade de modo sofisticado.",
    image: assets.projetos,
  },
];

const cards = [
  { title: "Página inicial", text: "Hero amplo, apresentação institucional e chamada para visita guiada." },
  { title: "A entidade", text: "História, missão, valores, equipe e atuação comunitária." },
  { title: "Projetos", text: "Leitura, alimentação, natureza, brincar livre e desenvolvimento integral." },
  { title: "Transparência", text: "Área para relatórios, parcerias, prestação de contas e documentos." },
  { title: "Matrículas", text: "Fluxo visual para contato, agendamento, WhatsApp e orientações." },
  { title: "Galeria", text: "Espaço para fotos reais autorizadas e imagens conceituais de apoio." },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF8EA] text-[#16192B]">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/60 bg-[#FFF8EA]/84 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <a href="#topo" className="group flex items-center gap-3" aria-label="Ir para o início da demonstração">
            <span className="grid h-12 w-12 place-items-center rounded-[1.2rem] bg-[#572E80] text-white shadow-[0_12px_28px_rgba(87,46,128,0.22)] transition-transform group-hover:-rotate-3 group-hover:scale-105">
              <Sparkles className="h-6 w-6" />
            </span>
            <span className="leading-tight">
              <strong className="block font-display text-xl text-[#572E80]">CEI Nossa Senhora</strong>
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#26768D]">demo visual do site</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace("á", "a")}`} className="text-sm font-extrabold text-[#22243A]/78 transition-colors hover:text-[#8B3A9B]">
                {item}
              </a>
            ))}
          </nav>
          <a href="#matriculas" className="rounded-full bg-[#8B3A9B] px-5 py-3 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(139,58,155,0.25)] transition hover:-translate-y-0.5 hover:bg-[#572E80]">
            Ver aplicação
          </a>
        </div>
      </header>

      <section id="topo" className="relative pt-24 lg:pt-28">
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: `url(${assets.pattern})`, backgroundSize: "900px auto" }} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-24 lg:pt-14">
          <div className="z-10 flex flex-col justify-center">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#8B3A9B]/20 bg-white/75 px-4 py-2 text-sm font-extrabold text-[#572E80] shadow-sm">
              <BookOpen className="h-4 w-4" /> Página demonstrativa com os novos ativos
            </span>
            <h1 className="font-display text-5xl font-black leading-[0.92] tracking-[-0.04em] text-[#171A2E] sm:text-6xl lg:text-7xl">
              Cuidado, educação e amor para a primeira infância.
            </h1>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-8 text-[#31354A]/82">
              Uma proposta de landing page institucional usando as variações visuais criadas para apresentar a identidade do CEI com afeto, clareza e aparência profissional.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#conceito" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0D5E9B] px-7 py-4 text-base font-extrabold text-white shadow-[0_18px_42px_rgba(13,94,155,0.22)] transition hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(13,94,155,0.28)]">
                Explorar ideias <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#matriculas" className="inline-flex items-center justify-center rounded-full border-2 border-[#572E80] bg-white/70 px-7 py-4 text-base font-extrabold text-[#572E80] transition hover:-translate-y-1 hover:bg-white">
                Ver CTA de matrículas
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-10 top-8 hidden h-28 w-28 rounded-full bg-[#FFD166] blur-2xl lg:block" />
            <div className="relative overflow-hidden rounded-[2.4rem] border-[10px] border-white bg-white shadow-[0_28px_80px_rgba(43,38,68,0.18)]">
              <img src={assets.hero} alt="Banner visual com crianças brincando, ondas e elementos lúdicos para hero institucional" className="h-full min-h-[360px] w-full object-cover" />
            </div>
            <div className="absolute -bottom-7 left-6 max-w-[260px] rounded-[1.7rem] bg-white/92 p-5 shadow-[0_18px_42px_rgba(43,38,68,0.18)] backdrop-blur-md">
              <p className="font-display text-2xl font-black text-[#572E80]">Primeira dobra</p>
              <p className="mt-1 text-sm font-bold leading-6 text-[#31354A]/75">Pronta para título, subtítulo, botão principal e chamada secundária.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="conceito" className="relative bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <div>
            <span className="section-kicker">Conceito visual</span>
            <h2 className="mt-4 font-display text-4xl font-black leading-tight tracking-[-0.03em] text-[#171A2E] lg:text-5xl">Editorial Lúdico Humanista aplicado ao site.</h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-[#31354A]/78">
              A demonstração usa camadas, ondas, cartões e imagens conceituais para transformar os ativos em uma experiência navegável. A proposta evita aparência genérica e organiza a comunicação em blocos que uma instituição pode realmente utilizar.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="group rounded-[2rem] border border-[#572E80]/10 bg-[#FFF8EA] p-6 shadow-[0_18px_50px_rgba(43,38,68,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_70px_rgba(43,38,68,0.12)]">
                  <div className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl ${item.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-2xl font-black text-[#572E80]">{item.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-6 text-[#31354A]/76">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pilares" className="relative py-20">
        <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: `url(${assets.pattern})`, backgroundSize: "820px auto" }} />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <span className="section-kicker">Aplicações por seção</span>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-black leading-tight tracking-[-0.03em] text-[#171A2E] lg:text-5xl">Três caminhos visuais para construir a página institucional.</h2>
            </div>
            <p className="max-w-md text-base font-semibold leading-7 text-[#31354A]/74">Cada imagem funciona como base para uma seção real: comunicação, prova visual, diferenciais e conversão.</p>
          </div>
          <div className="space-y-9">
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

      <section id="galeria" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="overflow-hidden rounded-[2.5rem] border-[10px] border-[#FFF8EA] shadow-[0_26px_80px_rgba(43,38,68,0.14)]">
              <img src={assets.galeria} alt="Galeria conceitual com crianças em atividades de leitura, blocos e natureza" className="w-full object-cover" />
            </div>
            <div>
              <span className="section-kicker">Galeria Nossa Turma</span>
              <h2 className="mt-4 font-display text-4xl font-black leading-tight tracking-[-0.03em] text-[#171A2E] lg:text-5xl">Uma área preparada para fotos reais autorizadas.</h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-[#31354A]/78">
                A galeria conceitual serve como placeholder premium até a instituição inserir registros próprios. O formato em molduras curvas ajuda a padronizar fotos de leitura, brincadeiras, horta, acolhimento e atividades motoras.
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

      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-10 text-center">
            <span className="section-kicker mx-auto">Arquitetura de conteúdo</span>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-black leading-tight tracking-[-0.03em] text-[#171A2E] lg:text-5xl">Sugestão de blocos para um site institucional completo.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => (
              <article key={card.title} className="group relative overflow-hidden rounded-[2rem] border border-[#572E80]/10 bg-white p-7 shadow-[0_18px_48px_rgba(43,38,68,0.09)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_26px_70px_rgba(43,38,68,0.14)]">
                <span className="absolute right-5 top-4 font-display text-5xl font-black text-[#8B3A9B]/10">0{index + 1}</span>
                <h3 className="font-display text-2xl font-black text-[#572E80]">{card.title}</h3>
                <p className="mt-3 text-base font-semibold leading-7 text-[#31354A]/74">{card.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 overflow-hidden rounded-[2.5rem] border-[10px] border-white shadow-[0_28px_80px_rgba(43,38,68,0.13)]">
            <img src={assets.cards} alt="Cards visuais para serviços e diferenciais institucionais" className="w-full object-cover" />
          </div>
        </div>
      </section>

      <section id="matriculas" className="bg-[#162A68] py-20 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
          <div className="relative mx-auto max-w-sm lg:mx-0">
            <div className="absolute -inset-5 rounded-[3rem] bg-[#2BCDCD]/22 blur-2xl" />
            <img src={assets.mobile} alt="Arte vertical para matrícula e visita guiada" className="relative rounded-[2.5rem] border-[10px] border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.32)]" />
          </div>
          <div>
            <span className="inline-flex rounded-full bg-white/12 px-4 py-2 text-sm font-black text-[#FFD166]">Campanha mobile e conversão</span>
            <h2 className="mt-5 font-display text-4xl font-black leading-tight tracking-[-0.03em] lg:text-6xl">Pronto para matrícula, visita guiada e redes sociais.</h2>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white/78">
              A peça vertical pode virar story, anúncio, status de WhatsApp ou bloco responsivo na landing page. O painel superior foi preservado para inserir uma mensagem objetiva, como “Agende sua visita”.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#topo" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFD166] px-7 py-4 text-base font-black text-[#572E80] transition hover:-translate-y-1 hover:bg-white">
                Voltar ao início <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#galeria" className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-4 text-base font-black text-white transition hover:-translate-y-1 hover:bg-white/10">
                Ver galeria
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-[#FFF8EA] pt-14">
        <div className="mx-auto max-w-7xl px-5 pb-10 lg:px-8">
          <div className="rounded-[2.5rem] bg-white/76 p-8 shadow-[0_18px_55px_rgba(43,38,68,0.10)] lg:p-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-black text-[#572E80]">CEI Nossa Senhora de Fátima</h2>
                <p className="mt-2 max-w-2xl font-semibold leading-7 text-[#31354A]/74">Demonstração visual criada para validar linguagem, aplicações de ativos e estrutura de uma futura página institucional.</p>
              </div>
              <a href="#topo" className="rounded-full bg-[#572E80] px-6 py-4 text-center font-black text-white transition hover:-translate-y-1 hover:bg-[#8B3A9B]">Rever demonstração</a>
            </div>
          </div>
        </div>
        <img src={assets.footer} alt="Rodapé decorativo com ondas e mascotes infantis" className="mt-2 w-full object-cover" />
      </footer>
    </main>
  );
}
