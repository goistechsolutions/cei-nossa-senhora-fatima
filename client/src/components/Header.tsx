import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "História", href: "/historia" },
    { label: "Missão, Visão e Valores", href: "/missao-visao-valores" },
    { label: "Estrutura", href: "/estrutura" },
    { label: "Projetos", href: "/projetos" },
    { label: "Transparência", href: "/transparencia" },
    { label: "Editais", href: "/editais" },
    { label: "Diretoria", href: "/diretoria" },
    { label: "Contato", href: "/contato" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      {/* Faixa arco-íris no topo */}
      <div className="h-1 w-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-teal-500 via-blue-500 to-purple-500" />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo SVG ─────────────────────────────────── */}
          <a
            href="/"
            aria-label="CEI Nossa Senhora de Fátima — Página Inicial"
            className="flex items-center gap-3 shrink-0 group"
          >
            {/* Ícone SVG com moldura pontilhada teal */}
            <div className="relative w-12 h-12 lg:w-14 lg:h-14 shrink-0">
              <svg
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                aria-hidden="true"
              >
                {/* Fundo circular com borda pontilhada */}
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  stroke="#01969f"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  fill="#f0fafa"
                />
                {/* Figura da criança estilizada */}
                {/* Cabeça */}
                <circle cx="28" cy="18" r="6" fill="#01969f" />
                {/* Corpo */}
                <path
                  d="M20 38 Q20 28 28 28 Q36 28 36 38"
                  fill="#01969f"
                />
                {/* Braços abertos = acolhimento */}
                <path
                  d="M20 30 L12 26 M36 30 L44 26"
                  stroke="#01969f"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Estrela */}
                <path
                  d="M28 10 L29.2 13.5 L33 13.5 L30 15.8 L31.2 19.3 L28 17 L24.8 19.3 L26 15.8 L23 13.5 L26.8 13.5 Z"
                  fill="#fbbf24"
                />
              </svg>
            </div>

            {/* Texto da marca */}
            <div className="leading-tight">
              <p className="text-[10px] font-semibold text-teal-500 uppercase tracking-widest hidden sm:block">
                Fartura · SP · Desde 1976
              </p>
              <p
                className="font-fredoka font-bold text-teal-700 text-base lg:text-lg leading-none"
                style={{ lineHeight: 1.15 }}
              >
                Nossa Senhora
              </p>
              <p
                className="font-fredoka font-bold text-teal-600 text-base lg:text-lg leading-none"
                style={{ lineHeight: 1.15 }}
              >
                de Fátima
              </p>
            </div>
          </a>

          {/* ── Navegação Desktop ────────────────────────── */}
          <div className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-fredoka font-semibold text-gray-700 hover:text-teal-600 text-sm px-3 py-2 rounded-lg hover:bg-teal-50 transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* ── Menu Mobile ──────────────────────────────── */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            className="xl:hidden p-2 rounded-lg text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-all duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* ── Menu Mobile Expandido ────────────────────────────── */}
      {isMenuOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-fredoka font-semibold text-gray-700 hover:text-teal-600 hover:bg-teal-50 px-4 py-2.5 rounded-lg transition-all duration-200 text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
