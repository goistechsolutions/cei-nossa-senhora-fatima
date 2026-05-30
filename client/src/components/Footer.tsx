import { INSTITUTION, VISUAL_ASSETS } from "@/lib/constants";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      {/* Ilustração de Rodapé */}
      <div className="w-full h-48 md:h-64 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
        <img
          src={VISUAL_ASSETS.footerIllustration}
          alt="Comunidade de crianças e educadores"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Conteúdo Principal do Rodapé */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo e Descrição */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gradient-rainbow flex items-center justify-center text-white font-fredoka-one text-sm">
                ✨
              </div>
              <h3 className="font-fredoka-one text-lg gradient-rainbow-text">
                {INSTITUTION.shortName}
              </h3>
            </div>
            <p className="font-poppins text-sm text-gray-300 leading-relaxed">
              {INSTITUTION.yearsOfExperience}+ anos de dedicação à educação
              infantil com excelência, amor e cuidado.
            </p>
          </div>

          {/* Localização */}
          <div>
            <h3 className="font-fredoka-one text-lg mb-4 text-red-400">
              Localização
            </h3>
            <a
              href="#"
              className="font-poppins text-sm text-gray-300 hover:text-red-400 transition-colors flex items-start gap-2 group"
            >
              <MapPin
                size={18}
                className="mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform"
              />
              <span>{INSTITUTION.address}</span>
            </a>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-fredoka-one text-lg mb-4 text-orange-400">
              Contato
            </h3>
            <div className="space-y-3">
              <a
                href={`tel:${INSTITUTION.phone}`}
                className="font-poppins text-sm text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"
              >
                <Phone
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>{INSTITUTION.phone}</span>
              </a>
              <a
                href={`mailto:${INSTITUTION.email}`}
                className="font-poppins text-sm text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2 group"
              >
                <Mail
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>{INSTITUTION.email}</span>
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-fredoka-one text-lg mb-4 text-yellow-400">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="font-poppins text-sm text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 group-hover:scale-150 transition-transform"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/#about"
                  className="font-poppins text-sm text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 group-hover:scale-150 transition-transform"></span>
                  A Entidade
                </a>
              </li>
              <li>
                <a
                  href="/transparencia"
                  className="font-poppins text-sm text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 group-hover:scale-150 transition-transform"></span>
                  Transparência
                </a>
              </li>
              <li>
                <a
                  href="/estrutura"
                  className="font-poppins text-sm text-gray-300 hover:text-yellow-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 group-hover:scale-150 transition-transform"></span>
                  Estrutura
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-fredoka-one text-lg mb-4 text-teal-400">
              Siga-nos
            </h3>
            <div className="flex gap-3">
              <a
                href={INSTITUTION.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all p-3 rounded-full hover:scale-110 transform"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={INSTITUTION.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 transition-all p-3 rounded-full hover:scale-110 transform"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={INSTITUTION.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transition-all p-3 rounded-full hover:scale-110 transform"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Linha Divisória */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-poppins text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} {INSTITUTION.shortName}. Todos os
              direitos reservados.
            </p>
            <p className="font-poppins text-sm text-gray-400 flex items-center gap-1 justify-center">
              Desenvolvido com
              <Heart
                size={16}
                className="text-red-500 fill-red-500 animate-pulse"
              />
              para a educação infantil
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
