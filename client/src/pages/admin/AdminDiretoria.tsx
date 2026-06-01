import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, Edit2, Plus } from "lucide-react";

export default function AdminDiretoria() {
  const { user, loading } = useAuth();
  const [, navigate] = useLocation();

  const [members, setMembers] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    bio: "",
    photoUrl: "",
    order: 0,
  });

  const { data: membersList, refetch } = trpc.diretoria.list.useQuery();
  const createMutation = trpc.diretoria.create.useMutation();
  const updateMutation = trpc.diretoria.update.useMutation();
  const deleteMutation = trpc.diretoria.delete.useMutation();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (membersList) {
      setMembers(membersList);
    }
  }, [membersList]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          ...formData,
        });
        toast.success("Membro atualizado com sucesso!");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Membro adicionado com sucesso!");
      }

      setFormData({
        name: "",
        position: "",
        email: "",
        phone: "",
        bio: "",
        photoUrl: "",
        order: 0,
      });
      setEditingId(null);
      refetch();
    } catch (error) {
      toast.error("Erro ao salvar membro");
      console.error(error);
    }
  };

  const handleEdit = (member: any) => {
    setFormData({
      name: member.name,
      position: member.position,
      email: member.email || "",
      phone: member.phone || "",
      bio: member.bio || "",
      photoUrl: member.photoUrl || "",
      order: member.order,
    });
    setEditingId(member.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este membro?")) return;

    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Membro deletado com sucesso!");
      refetch();
    } catch (error) {
      toast.error("Erro ao deletar membro");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: "",
      position: "",
      email: "",
      phone: "",
      bio: "",
      photoUrl: "",
      order: 0,
    });
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Diretoria</h1>
          {!editingId && (
            <Button
              onClick={() => {
                setEditingId(-1);
              }}
              className="gap-2"
            >
              <Plus size={18} />
              Novo Membro
            </Button>
          )}
        </div>

        {/* Form */}
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Nome do membro"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cargo *
                </label>
                <Input
                  type="text"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  placeholder="Ex: Presidente, Vice-Presidente"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="(14) 3382-1327"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL da Foto
                </label>
                <Input
                  type="url"
                  value={formData.photoUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, photoUrl: e.target.value })
                  }
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ordem de Exibição
                </label>
                <Input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: parseInt(e.target.value) })
                  }
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biografia
              </label>
              <Textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Descrição breve do membro"
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                {editingId ? "Atualizar" : "Adicionar"} Membro
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Members List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Membros Cadastrados ({members.length})
          </h2>

          {members.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {members.map((member) => (
                <Card key={member.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-teal-600 font-semibold">
                        {member.position}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(member)}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </div>

                  {member.email && (
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Email:</strong> {member.email}
                    </p>
                  )}
                  {member.phone && (
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Telefone:</strong> {member.phone}
                    </p>
                  )}
                  {member.bio && (
                    <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-600">
                Nenhum membro cadastrado. Adicione o primeiro membro!
              </p>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
