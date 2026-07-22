import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";

export default function Diretoria() {
  const { data: members, isLoading, error } = trpc.diretoria.list.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light-gray via-white to-gradient-soft-turquoise py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-gradient-turquoise text-4xl md:text-5xl font-bold mb-4">
              Nossa Diretoria
            </h1>
            <p className="font-inter text-lg text-gray-700">
              Carregando informações...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-light-gray via-white to-gradient-soft-turquoise py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-gradient-turquoise text-4xl md:text-5xl font-bold mb-4">
              Nossa Diretoria
            </h1>
            <p className="font-inter text-lg text-rose">
              Erro ao carregar informações. Tente novamente mais tarde.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-light-gray via-white to-gradient-soft-turquoise">
      {/* Header */}
      <section className="py-16 md:py-24 bg-white/50 backdrop-filter backdrop-blur-md border-b border-white/20 shadow-soft">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-gradient-turquoise text-4xl md:text-5xl font-bold mb-4">
              Nossa Diretoria
            </h1>
            <p className="font-inter text-lg text-gray-700">
              Conheça as pessoas que dedicam seu tempo e energia para garantir que cada criança do CEI Nossa Senhora de Fátima receba o melhor cuidado e educação possíveis.
            </p>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          {members && members.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member) => (
                <Card
                  key={member.id}
                  className="overflow-hidden hover:shadow-lg-premium transition-all duration-300 border-0 rounded-premium-lg bg-white card-premium"
                >
                  {/* Photo or Avatar */}
                  <div className="w-full h-64 bg-gradient-institutional flex items-center justify-center overflow-hidden">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={`Foto de ${member.name}, ${member.position}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gradient-institutional">
                        <User size={80} className="text-white opacity-50" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-fredoka font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-lg font-fredoka font-semibold text-gradient-turquoise mb-4">
                      {member.position}
                    </p>

                    {member.bio && (
                      <p className="font-inter text-gray-600 text-sm mb-4 leading-relaxed">
                        {member.bio}
                      </p>
                    )}

                    {/* Contact Info */}
                    <div className="space-y-2 border-t border-gray-200 pt-4">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 text-gray-700 hover:text-turquoise transition-all duration-300 group"
                        >
                          <Mail size={18} className="text-turquoise group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-inter text-sm">{member.email}</span>
                        </a>
                      )}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center gap-2 text-gray-700 hover:text-turquoise transition-all duration-300 group"
                        >
                          <Phone size={18} className="text-turquoise group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-inter text-sm">{member.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">👥</div>
              <h3 className="font-fredoka text-2xl text-gray-700 mb-3">Cadastro em andamento</h3>
              <p className="font-inter text-gray-500 max-w-md mx-auto mb-8">
                Em breve você poderá conhecer todos os membros da nossa diretoria. Ficou curioso? Entre em contato!
              </p>
              <a href="/contato" className="btn-primary inline-block px-8 py-3">
                Entrar em Contato
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-white/50 backdrop-filter backdrop-blur-md border-t border-white/20 shadow-soft">
        <div className="container text-center">
          <p className="font-inter text-gray-700 mb-2 text-lg font-semibold">
            Quer fazer parte da nossa comunidade?
          </p>
          <p className="font-inter text-gray-500 mb-6">
            Estamos sempre abertos para parcerias, voluntariado e colaborações.
          </p>
          <a
            href="/contato"
            className="btn-primary inline-block px-8 py-3"
          >
            Enviar Mensagem
          </a>
        </div>
      </section>
    </main>
  );
}
