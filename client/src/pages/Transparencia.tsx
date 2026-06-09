import { useState, useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import { Search, Download, FileText, Filter, Calendar, ChevronDown, ExternalLink } from 'lucide-react';

const CATEGORY_LABELS: Record<string, string> = {
  edital: 'Edital',
  estatuto: 'Estatuto Social',
  regulamento: 'Regulamento',
  relatorio: 'Relatório',
  ata: 'Ata',
  termo: 'Termo de Colaboração',
  outros: 'Outros',
};

const CATEGORY_COLORS: Record<string, string> = {
  edital: 'bg-gradient-soft-turquoise text-turquoise',
  estatuto: 'bg-purple-100 text-purple-800',
  regulamento: 'bg-orange-100 text-orange-800',
  relatorio: 'bg-green-100 text-green-800',
  ata: 'bg-yellow-100 text-yellow-800',
  termo: 'bg-gradient-institutional text-white',
  outros: 'bg-gray-100 text-gray-800',
};

function formatFileSize(bytes: number | null | undefined): string {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Transparencia() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);

  const { data: documents, isLoading } = trpc.documents.list.useQuery({
    category: selectedCategory || undefined,
    year: selectedYear,
  });

  const trackDownload = trpc.documents.trackDownload.useMutation();

  // Filter documents by search term
  const filteredDocuments = useMemo(() => {
    if (!documents) return [];
    if (!searchTerm) return documents;
    const term = searchTerm.toLowerCase();
    return documents.filter(
      (doc) =>
        doc.title.toLowerCase().includes(term) ||
        doc.description?.toLowerCase().includes(term) ||
        doc.category.toLowerCase().includes(term) ||
        doc.referenceDate?.toLowerCase().includes(term)
    );
  }, [documents, searchTerm]);

  // Get unique years for filter
  const availableYears = useMemo(() => {
    if (!documents) return [];
    const years = [...new Set(documents.map((d) => d.year))].sort((a, b) => b - a);
    return years;
  }, [documents]);

  const handleDownload = (doc: { id: number; fileUrl: string; title: string }) => {
    trackDownload.mutate({ id: doc.id });
    window.open(doc.fileUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-light-gray via-white to-gradient-soft-turquoise">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{
        backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663411046841/BKrd93cpBc2Rp4CJz2T9xd/hero-background-transparencia-QbrQUPRdcte5LJNe4R8kZi.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-gradient-institutional/90"></div>
        <div className="container relative z-10 text-center">
          <h1 className="font-fredoka text-4xl md:text-5xl lg:text-6xl text-white mb-4 font-bold">
            Portal da Transparência
          </h1>
          <p className="font-inter text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Acesse documentos, editais, regulamentos e prestações de contas do CEI Nossa Senhora de Fátima.
            Nosso compromisso com a transparência e accountability.
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-white/80 text-sm font-inter">
            <span className="flex items-center gap-1">
              <FileText size={16} />
              {documents?.length || 0} documentos disponíveis
            </span>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white/50 backdrop-filter backdrop-blur-md border-b border-white/20 shadow-soft">
        <div className="container">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-turquoise" size={20} />
              <input
                type="text"
                placeholder="Buscar documentos por título, categoria ou período..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-premium border border-white/20 bg-white/50 focus:ring-2 focus:ring-turquoise focus:border-transparent transition-all font-inter text-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-white/50 border border-white/20 rounded-premium hover:bg-gradient-soft-turquoise transition-all font-inter text-sm text-gray-700 backdrop-filter backdrop-blur-sm"
            >
              <Filter size={18} />
              Filtros
              <ChevronDown size={16} className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white/50 backdrop-filter backdrop-blur-md rounded-premium border border-white/20 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-soft">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                  <FileText size={14} className="inline mr-1" />
                  Categoria
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/50 font-inter text-sm focus:ring-2 focus:ring-turquoise"
                >
                  <option value="">Todas as categorias</option>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                  <Calendar size={14} className="inline mr-1" />
                  Ano
                </label>
                <select
                  value={selectedYear || ''}
                  onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/50 font-inter text-sm focus:ring-2 focus:ring-turquoise"
                >
                  <option value="">Todos os anos</option>
                  {availableYears.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Documents Table */}
      <section className="py-12">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-turquoise border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="font-inter text-gray-500">Carregando documentos...</p>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-20">
              <FileText size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="font-fredoka text-2xl text-gray-500 mb-2 font-semibold">Nenhum documento encontrado</h3>
              <p className="font-inter text-gray-400">
                {searchTerm ? 'Tente ajustar os filtros ou termos de busca.' : 'Documentos serão adicionados em breve.'}
              </p>
            </div>
          ) : (
            <>
              {/* Results count */}
              <div className="mb-6 flex items-center justify-between">
                <p className="font-inter text-sm text-gray-500">
                  {filteredDocuments.length} documento{filteredDocuments.length !== 1 ? 's' : ''} encontrado{filteredDocuments.length !== 1 ? 's' : ''}
                </p>
                {(searchTerm || selectedCategory || selectedYear) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                      setSelectedYear(undefined);
                    }}
                    className="text-sm text-turquoise hover:text-turquoise/80 font-inter font-medium transition-colors duration-300"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-hidden rounded-premium border border-white/20 shadow-soft bg-white/50 backdrop-filter backdrop-blur-sm">
                <table className="w-full">
                  <thead className="bg-gradient-soft-turquoise border-b border-white/20">
                    <tr>
                      <th className="px-6 py-4 text-left font-inter font-semibold text-sm text-gray-700">Documento</th>
                      <th className="px-6 py-4 text-left font-inter font-semibold text-sm text-gray-700">Categoria</th>
                      <th className="px-6 py-4 text-left font-inter font-semibold text-sm text-gray-700">Período</th>
                      <th className="px-6 py-4 text-left font-inter font-semibold text-sm text-gray-700">Ano</th>
                      <th className="px-6 py-4 text-left font-inter font-semibold text-sm text-gray-700">Tamanho</th>
                      <th className="px-6 py-4 text-center font-inter font-semibold text-sm text-gray-700">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/20">
                    {filteredDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gradient-soft-turquoise transition-colors duration-300">
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <FileText size={20} className="text-rose mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-inter font-medium text-gray-900 text-sm">{doc.title}</p>
                              {doc.description && (
                                <p className="font-inter text-xs text-gray-500 mt-1 line-clamp-2">{doc.description}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-inter font-medium ${CATEGORY_COLORS[doc.category] || 'bg-gray-100 text-gray-800'}`}>
                            {CATEGORY_LABELS[doc.category] || doc.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-inter text-sm text-gray-600">
                          {doc.referenceDate || '—'}
                        </td>
                        <td className="px-6 py-4 font-inter text-sm text-gray-600 font-medium">
                          {doc.year}
                        </td>
                        <td className="px-6 py-4 font-inter text-sm text-gray-500">
                          {formatFileSize(doc.fileSize)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleDownload(doc)}
                            className="btn-primary inline-flex items-center gap-2 px-4 py-2 text-sm"
                          >
                            <Download size={16} />
                            PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="card-premium bg-white/50 backdrop-filter backdrop-blur-sm border border-white/20 p-4 hover:shadow-lg-premium transition-all duration-300">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-inter font-medium ${CATEGORY_COLORS[doc.category] || 'bg-gray-100 text-gray-800'}`}>
                            {CATEGORY_LABELS[doc.category] || doc.category}
                          </span>
                          <span className="text-xs text-gray-500 font-inter">{doc.year}</span>
                        </div>
                        <h3 className="font-inter font-medium text-gray-900 text-sm mb-1">{doc.title}</h3>
                        {doc.description && (
                          <p className="font-inter text-xs text-gray-500 line-clamp-2">{doc.description}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 font-inter">
                          {doc.referenceDate && <span>{doc.referenceDate}</span>}
                          <span>{formatFileSize(doc.fileSize)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(doc)}
                        className="btn-primary inline-flex items-center gap-2 px-3 py-2 text-xs flex-shrink-0"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
