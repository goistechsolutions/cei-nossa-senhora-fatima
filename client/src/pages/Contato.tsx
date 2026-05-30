import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useState } from 'react'

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulário enviado:', formData)
    setFormData({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' })
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-white" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/hero-background-contato-jKBMCQwZF6TThCEB2pAS6s.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-fredoka-one text-5xl md:text-6xl mb-6 leading-tight text-teal-600">
              Entre em Contato
            </h1>
            
            <p className="font-poppins text-lg text-gray-700 leading-relaxed max-w-lg">
              Tem dúvidas? Quer agendar uma visita? Estamos aqui para ajudar!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            {[
              { icone: Mail, titulo: 'Email', valor: 'contato@ceinossasenhora.com.br' },
              { icone: Phone, titulo: 'Telefone', valor: '(17) 3263-1234' },
              { icone: MapPin, titulo: 'Endereço', valor: 'Fartura - SP' }
            ].map((item, idx) => {
              const Icon = item.icone
              return (
                <div key={idx} className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-all border border-teal-200 text-center">
                  <Icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="font-fredoka-one text-xl text-teal-600 mb-2">{item.titulo}</h3>
                  <p className="font-poppins text-gray-700">{item.valor}</p>
                </div>
              )
            })}
          </div>

          {/* Botão WhatsApp */}
          <div className="text-center mb-16">
            <a
              href="https://wa.me/551732631234"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-green-500 text-white font-fredoka font-semibold rounded-lg hover:bg-green-600 transition-all border-2 border-dashed border-green-500"
            >
              💬 Conversar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-fredoka-one text-4xl text-center mb-12 text-teal-600">
              Envie uma Mensagem
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-fredoka font-semibold text-gray-700 mb-2">Nome *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="block font-fredoka font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-fredoka font-semibold text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                    placeholder="(17) 9999-9999"
                  />
                </div>

                <div>
                  <label className="block font-fredoka font-semibold text-gray-700 mb-2">Assunto *</label>
                  <select
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="matricula">Matrícula</option>
                    <option value="visita">Agendar Visita</option>
                    <option value="duvida">Dúvida</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-fredoka font-semibold text-gray-700 mb-2">Mensagem *</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                  placeholder="Sua mensagem aqui..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-fredoka font-semibold px-8 py-4 rounded-lg hover:bg-teal-700 transition-all flex items-center justify-center gap-2 text-lg border-2 border-dashed border-teal-600"
              >
                <Send size={20} />
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Mapa (Placeholder) */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <h2 className="font-fredoka-one text-4xl text-center mb-12 text-teal-600">
            Nossa Localização
          </h2>
          <div className="w-full h-96 bg-gray-300 rounded-lg flex items-center justify-center">
            <p className="font-poppins text-gray-700 text-lg">Mapa será adicionado em breve</p>
          </div>
        </div>
      </section>
    </main>
  )
}
