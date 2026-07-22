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
              Erro ao carregar informações
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
          <div className="text-center">
            <h1 className="text-gradient-turquoise text-4xl md:text-5xl font-bold mb-4">
              Nossa Diretoria
            </h1>
            <p className="font-inter text-lg text-gray-700 max-w-2xl mx-auto">
              Conheça os membros que dirigem com carinho nossa instituição, 
              dedicados ao desenvolvimento integral das crianças.
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
                        alt={member.name}
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
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">
                Nenhum membro da diretoria cadastrado no momento.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-white/50 backdrop-filter backdrop-blur-md border-t border-white/20 shadow-soft">
        <div className="container text-center">
          <p className="font-inter text-gray-700 mb-4">
            Tem dúvidas ou sugestões? Entre em contato conosco!
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
