import { useState, useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import { Search, Download, FileText, Calendar, Briefcase, Clock, ChevronDown } from 'lucide-react';

const SUBCATEGORY_LABELS: Record<string, string> = {
  contratacao: 'Contratação de Pessoal',
  compras: 'Compras e Serviços',
  chamamento: 'Chamamento Público',
  processo_seletivo: 'Processo Seletivo',
  outros: 'Outros',
};

function formatFileSize(bytes: number | null | undefined): string {
  if (!bytes) return '—';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getStatusBadge(metadata: string | null): { label: string; color: string } {
  if (!metadata) return { label: 'Encerrado', color: 'bg-gray-100 text-gray-700' };
  try {
    const parsed = JSON.parse(metadata);
    if (parsed.status === 'aberto') return { label: 'Aberto', color: 'bg-gradient-soft-turquoise text-green-growth font-semibold' };
    if (parsed.status === 'em_andamento') return { label: 'Em Andamento', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'Encerrado', color: 'bg-gray-100 text-gray-700' };
  } catch {
    return { label: 'Encerrado', color: 'bg-gray-100 text-gray-700' };
  }
}

export default function Editais() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const { data: documents, isLoading } = trpc.documents.list.useQuery({
    category: 'edital',
    year: selectedYear,
  });

  const trackDownload = trpc.documents.trackDownload.useMutation();

  // Filter by search and subcategory
  const filteredDocuments = useMemo(() => {
    if (!documents) return [];
    let filtered = documents;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.title.toLowerCase().includes(term) ||
          doc.description?.toLowerCase().includes(term) ||
          doc.referenceDate?.toLowerCase().includes(term)
      );
    }

    if (selectedSubcategory) {
      filtered = filtered.filter((doc) => doc.subcategory === selectedSubcategory);
    }

    return filtered;
  }, [documents, searchTerm, selectedSubcategory]);

  // Get unique years
  const availableYears = useMemo(() => {
    if (!documents) return [];
    return [...new Set(documents.map((d) => d.year))].sort((a, b) => b - a);
  }, [documents]);

  const handleDownload = (doc: { id: number; fileUrl: string; title: string }) => {
    trackDownload.mutate({ id: doc.id });
    window.open(doc.fileUrl, '_blank');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-light-gray via-white to-gradient-soft-turquoise">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-gradient-institutional overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-white/20"></div>
          <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-white/10"></div>
        </div>
        <div className="container relative z-10 text-center">
          <h1 className="font-fredoka text-4xl md:text-5xl lg:text-6xl text-white mb-4 font-bold">
            Editais e Processos
          </h1>
          <p className="font-inter text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Acompanhe os editais de contratação, compras e chamamentos públicos do CEI Nossa Senhora de Fátima.
            Transparência e isonomia em todos os processos.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-white/80 text-sm font-inter">
            <span className="flex items-center gap-1">
              <Briefcase size={16} />
              {documents?.length || 0} editais publicados
            </span>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white/50 backdrop-filter backdrop-blur-md border-b border-white/20 shadow-soft">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-turquoise" size={20} />
              <input
                type="text"
                placeholder="Buscar editais por título, descrição ou período..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-premium border border-white/20 bg-white/50 focus:ring-2 focus:ring-turquoise focus:border-transparent transition-all font-inter text-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-white/50 border border-white/20 rounded-premium hover:bg-gradient-soft-turquoise transition-all font-inter text-sm text-gray-700 backdrop-filter backdrop-blur-sm"
            >
              <Calendar size={18} />
              Filtros
              <ChevronDown size={16} className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 bg-white/50 backdrop-filter backdrop-blur-md rounded-premium border border-white/20 grid grid-cols-1 md:grid-cols-2 gap-4 shadow-soft">
              <div>
                <label className="block text-sm font-inter font-medium text-gray-700 mb-2">
                  <Briefcase size={14} className="inline mr-1" />
                  Tipo de Edital
                </label>
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/50 font-inter text-sm focus:ring-2 focus:ring-turquoise"
                >
                  <option value="">Todos os tipos</option>
                  {Object.entries(SUBCATEGORY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>
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

      {/* Editais List */}
      <section className="py-12">
        <div className="container">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-turquoise border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="font-inter text-gray-500">Carregando editais...</p>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-20">
              <Briefcase size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="font-fredoka text-2xl text-gray-500 mb-2 font-semibold">Nenhum edital encontrado</h3>
              <p className="font-inter text-gray-400">
                {searchTerm ? 'Tente ajustar os filtros ou termos de busca.' : 'Novos editais serão publicados em breve.'}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="font-inter text-sm text-gray-500">
                  {filteredDocuments.length} edital{filteredDocuments.length !== 1 ? 'is' : ''} encontrado{filteredDocuments.length !== 1 ? 's' : ''}
                </p>
                {(searchTerm || selectedSubcategory || selectedYear) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedSubcategory('');
                      setSelectedYear(undefined);
                    }}
                    className="text-sm text-turquoise hover:text-turquoise/80 font-inter font-medium transition-colors duration-300"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>

              {/* Editais Cards */}
              <div className="space-y-4">
                {filteredDocuments.map((doc) => {
                  const status = getStatusBadge(doc.metadata);
                  return (
                    <div key={doc.id} className="card-premium bg-white/50 backdrop-filter backdrop-blur-sm border border-white/20 p-6 hover:shadow-lg-premium transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-inter font-medium ${status.color}`}>
                              {status.label}
                            </span>
                            {doc.subcategory && (
                              <span className="inline-flex px-3 py-1 rounded-full text-xs font-inter font-medium bg-gradient-soft-turquoise text-turquoise">
                                {SUBCATEGORY_LABELS[doc.subcategory] || doc.subcategory}
                              </span>
                            )}
                            <span className="text-xs text-gray-500 font-inter flex items-center gap-1">
                              <Clock size={12} />
                              {doc.referenceDate || doc.year}
                            </span>
                          </div>
                          <h3 className="font-fredoka font-semibold text-lg text-gray-900 mb-1">{doc.title}</h3>
                          {doc.description && (
                            <p className="font-inter text-sm text-gray-600 line-clamp-2">{doc.description}</p>
                          )}
                          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400 font-inter">
                            <span className="flex items-center gap-1">
                              <FileText size={12} />
                              {formatFileSize(doc.fileSize)}
                            </span>
                            {doc.downloadCount > 0 && (
                              <span className="flex items-center gap-1">
                                <Download size={12} />
                                {doc.downloadCount} download{doc.downloadCount !== 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDownload(doc)}
                          className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm whitespace-nowrap"
                        >
                          <Download size={18} />
                          Baixar PDF
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-fredoka-one text-3xl text-blue-600 mb-4">
              Regulamento de Contratação e Compras
            </h2>
            <p className="font-poppins text-gray-600 leading-relaxed mb-6">
              O CEI Nossa Senhora de Fátima segue regulamentos internos para contratação de pessoal e aquisição de bens e serviços,
              garantindo isonomia, publicidade e economicidade em todos os processos, em conformidade com as normas do MROSC
              e demais legislações aplicáveis às entidades do terceiro setor.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="text-3xl mb-2">📋</div>
                <h4 className="font-fredoka font-semibold text-gray-900 mb-1">Publicidade</h4>
                <p className="font-poppins text-xs text-gray-500">Todos os editais são publicados com antecedência</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="text-3xl mb-2">⚖️</div>
                <h4 className="font-fredoka font-semibold text-gray-900 mb-1">Isonomia</h4>
                <p className="font-poppins text-xs text-gray-500">Igualdade de condições para todos os participantes</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="text-3xl mb-2">💰</div>
                <h4 className="font-fredoka font-semibold text-gray-900 mb-1">Economicidade</h4>
                <p className="font-poppins text-xs text-gray-500">Melhor relação custo-benefício para a instituição</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
