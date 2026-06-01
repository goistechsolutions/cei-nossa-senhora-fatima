import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";

export default function Diretoria() {
  const { data: members, isLoading, error } = trpc.diretoria.list.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-4">
              Nossa Diretoria
            </h1>
            <p className="text-lg text-gray-700">
              Carregando informações...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-4">
              Nossa Diretoria
            </h1>
            <p className="text-lg text-red-600">
              Erro ao carregar informações
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <section className="py-16 md:py-24 bg-white border-b-4 border-teal-600">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-4">
              Nossa Diretoria
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
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
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 rounded-2xl bg-white"
                >
                  {/* Photo or Avatar */}
                  <div className="w-full h-64 bg-gradient-to-br from-teal-400 to-purple-500 flex items-center justify-center overflow-hidden">
                    {member.photoUrl ? (
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-teal-400 to-purple-500">
                        <User size={80} className="text-white opacity-50" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-lg font-semibold text-teal-600 mb-4">
                      {member.position}
                    </p>

                    {member.bio && (
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {member.bio}
                      </p>
                    )}

                    {/* Contact Info */}
                    <div className="space-y-2 border-t pt-4">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors"
                        >
                          <Mail size={18} className="text-teal-600" />
                          <span className="text-sm">{member.email}</span>
                        </a>
                      )}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors"
                        >
                          <Phone size={18} className="text-teal-600" />
                          <span className="text-sm">{member.phone}</span>
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
      <section className="py-12 bg-white border-t-4 border-teal-600">
        <div className="container text-center">
          <p className="text-gray-700 mb-4">
            Tem dúvidas ou sugestões? Entre em contato conosco!
          </p>
          <a
            href="/contato"
            className="inline-block px-8 py-3 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors"
          >
            Enviar Mensagem
          </a>
        </div>
      </section>
    </main>
  );
}
