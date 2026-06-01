import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';
import { toast } from 'sonner';
import { FileText, Plus, Pencil, Trash2, Upload, ArrowLeft, Download, Eye, EyeOff } from 'lucide-react';

const CATEGORY_OPTIONS = [
  { value: 'edital', label: 'Edital' },
  { value: 'estatuto', label: 'Estatuto Social' },
  { value: 'regulamento', label: 'Regulamento' },
  { value: 'relatorio', label: 'Relatório' },
  { value: 'ata', label: 'Ata' },
  { value: 'termo', label: 'Termo de Colaboração' },
  { value: 'outros', label: 'Outros' },
];

const SUBCATEGORY_OPTIONS = [
  { value: '', label: 'Nenhuma' },
  { value: 'contratacao', label: 'Contratação de Pessoal' },
  { value: 'compras', label: 'Compras e Serviços' },
  { value: 'chamamento', label: 'Chamamento Público' },
  { value: 'processo_seletivo', label: 'Processo Seletivo' },
  { value: 'outros', label: 'Outros' },
];

interface DocumentForm {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  year: number;
  month: number | undefined;
  referenceDate: string;
  fileUrl: string;
  fileKey: string;
  fileSize: number | undefined;
  mimeType: string;
  isPublished: number;
  tags: string;
  metadata: string;
}

const defaultForm: DocumentForm = {
  title: '',
  description: '',
  category: 'edital',
  subcategory: '',
  year: new Date().getFullYear(),
  month: undefined,
  referenceDate: '',
  fileUrl: '',
  fileKey: '',
  fileSize: undefined,
  mimeType: 'application/pdf',
  isPublished: 1,
  tags: '',
  metadata: '',
};

export default function AdminDocuments() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<DocumentForm>(defaultForm);
  const [uploading, setUploading] = useState(false);

  const { data: documents, refetch } = trpc.documents.listAll.useQuery();
  const createMutation = trpc.documents.create.useMutation({
    onSuccess: () => {
      toast.success('Documento criado com sucesso!');
      resetForm();
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });
  const updateMutation = trpc.documents.update.useMutation({
    onSuccess: () => {
      toast.success('Documento atualizado com sucesso!');
      resetForm();
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });
  const deleteMutation = trpc.documents.delete.useMutation({
    onSuccess: () => {
      toast.success('Documento excluído!');
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });
  const uploadMutation = trpc.documents.upload.useMutation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      setLocation('/');
    }
  }, [user, loading, setLocation]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  function resetForm() {
    setForm(defaultForm);
    setShowForm(false);
    setEditingId(null);
  }

  function handleEdit(doc: any) {
    setForm({
      title: doc.title || '',
      description: doc.description || '',
      category: doc.category || 'edital',
      subcategory: doc.subcategory || '',
      year: doc.year || new Date().getFullYear(),
      month: doc.month || undefined,
      referenceDate: doc.referenceDate || '',
      fileUrl: doc.fileUrl || '',
      fileKey: doc.fileKey || '',
      fileSize: doc.fileSize || undefined,
      mimeType: doc.mimeType || 'application/pdf',
      isPublished: doc.isPublished ?? 1,
      tags: doc.tags || '',
      metadata: doc.metadata || '',
    });
    setEditingId(doc.id);
    setShowForm(true);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 16 * 1024 * 1024) {
      toast.error('Arquivo muito grande! Máximo 16MB.');
      return;
    }

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const result = await uploadMutation.mutateAsync({
          filename: file.name,
          fileData: base64,
          mimeType: file.type || 'application/pdf',
        });
        setForm((prev) => ({
          ...prev,
          fileUrl: result.url,
          fileKey: result.storageKey,
          fileSize: result.fileSize,
          mimeType: file.type || 'application/pdf',
        }));
        toast.success('Arquivo enviado com sucesso!');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      toast.error('Erro ao enviar arquivo.');
      setUploading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.fileUrl) {
      toast.error('Título e arquivo são obrigatórios!');
      return;
    }

    const payload = {
      title: form.title,
      description: form.description || undefined,
      category: form.category as any,
      subcategory: form.subcategory || undefined,
      year: form.year,
      month: form.month,
      referenceDate: form.referenceDate || undefined,
      fileUrl: form.fileUrl,
      fileKey: form.fileKey || undefined,
      fileSize: form.fileSize,
      mimeType: form.mimeType || undefined,
      isPublished: form.isPublished,
      tags: form.tags || undefined,
      metadata: form.metadata || undefined,
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  function handleDelete(id: number, title: string) {
    if (confirm(`Tem certeza que deseja excluir "${title}"?`)) {
      deleteMutation.mutate({ id });
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLocation('/admin')}
              className="p-2 hover:bg-gray-200 rounded-lg transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="font-fredoka-one text-3xl text-teal-600">Gerenciar Documentos</h1>
              <p className="font-poppins text-sm text-gray-500">
                Gerencie editais, regulamentos e documentos de transparência
              </p>
            </div>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(true); }}
            className="flex items-center gap-2 px-5 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all font-poppins font-medium"
          >
            <Plus size={18} />
            Novo Documento
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
            <h2 className="font-fredoka font-semibold text-xl text-gray-900 mb-4">
              {editingId ? 'Editar Documento' : 'Novo Documento'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-poppins font-medium text-gray-700 mb-1">Título *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 font-poppins text-sm focus:ring-2 focus:ring-teal-500"
                    placeholder="Ex: Edital de Contratação nº 001/2026"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-poppins font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 font-poppins text-sm focus:ring-2 focus:ring-teal-500"
                    rows={3}
                    placeholder="Descrição detalhada do documento..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-medium text-gray-700 mb-1">Categoria *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 font-poppins text-sm focus:ring-2 focus:ring-teal-500"
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-poppins font-medium text-gray-700 mb-1">Subcategoria</label>
                  <select
                    value={form.subcategory}
                    onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 font-poppins text-sm focus:ring-2 focus:ring-teal-500"
                  >
                    {SUBCATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-poppins font-medium text-gray-700 mb-1">Ano *</label>
                  <input
                    type="number"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 font-poppins text-sm focus:ring-2 focus:ring-teal-500"
                    min={2000}
                    max={2100}
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-medium text-gray-700 mb-1">Mês</label>
                  <input
                    type="number"
                    value={form.month || ''}
                    onChange={(e) => setForm({ ...form, month: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 font-poppins text-sm focus:ring-2 focus:ring-teal-500"
                    min={1}
                    max={12}
                    placeholder="1-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-medium text-gray-700 mb-1">Período de Referência</label>
                  <input
                    type="text"
                    value={form.referenceDate}
                    onChange={(e) => setForm({ ...form, referenceDate: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 font-poppins text-sm focus:ring-2 focus:ring-teal-500"
                    placeholder="Ex: Janeiro a Março 2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-poppins font-medium text-gray-700 mb-1">Tags</label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 font-poppins text-sm focus:ring-2 focus:ring-teal-500"
                    placeholder="Ex: mrosc, prestação de contas"
                  />
                </div>

                {/* File Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-poppins font-medium text-gray-700 mb-1">Arquivo PDF *</label>
                  <div className="flex items-center gap-4">
                    <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed cursor-pointer transition-all ${uploading ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300 hover:border-teal-500 hover:bg-teal-50'}`}>
                      <Upload size={18} className={uploading ? 'text-yellow-600 animate-pulse' : 'text-gray-500'} />
                      <span className="font-poppins text-sm text-gray-600">
                        {uploading ? 'Enviando...' : 'Selecionar arquivo'}
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                    {form.fileUrl && (
                      <div className="flex items-center gap-2 text-sm text-green-600 font-poppins">
                        <FileText size={16} />
                        Arquivo carregado
                        <a href={form.fileUrl} target="_blank" rel="noopener noreferrer" className="underline">
                          Visualizar
                        </a>
                      </div>
                    )}
                  </div>
                  {!form.fileUrl && !uploading && (
                    <div className="mt-2">
                      <label className="block text-xs font-poppins text-gray-500 mb-1">Ou insira a URL diretamente:</label>
                      <input
                        type="text"
                        value={form.fileUrl}
                        onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 font-poppins text-xs focus:ring-2 focus:ring-teal-500"
                        placeholder="https://..."
                      />
                    </div>
                  )}
                </div>

                {/* Published Toggle */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isPublished === 1}
                      onChange={(e) => setForm({ ...form, isPublished: e.target.checked ? 1 : 0 })}
                      className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="font-poppins text-sm text-gray-700">Publicar documento (visível no portal público)</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all font-poppins font-medium disabled:opacity-50"
                >
                  {editingId ? 'Atualizar' : 'Criar Documento'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-poppins"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Documents List */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="font-fredoka font-semibold text-lg text-gray-900">
              Documentos Cadastrados ({documents?.length || 0})
            </h2>
          </div>

          {!documents || documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="font-poppins text-gray-500">Nenhum documento cadastrado ainda.</p>
              <button
                onClick={() => { resetForm(); setShowForm(true); }}
                className="mt-3 text-teal-600 font-poppins font-medium hover:underline"
              >
                Adicionar primeiro documento
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {documents.map((doc) => (
                <div key={doc.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText size={16} className="text-red-500 flex-shrink-0" />
                        <h3 className="font-poppins font-medium text-gray-900 text-sm truncate">{doc.title}</h3>
                        {doc.isPublished ? (
                          <Eye size={14} className="text-green-500 flex-shrink-0" />
                        ) : (
                          <EyeOff size={14} className="text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-poppins">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full">
                          {CATEGORY_OPTIONS.find((c) => c.value === doc.category)?.label || doc.category}
                        </span>
                        <span>{doc.year}</span>
                        {doc.referenceDate && <span>{doc.referenceDate}</span>}
                        {doc.downloadCount > 0 && (
                          <span className="flex items-center gap-1">
                            <Download size={10} /> {doc.downloadCount}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(doc)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Editar"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id, doc.title)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
