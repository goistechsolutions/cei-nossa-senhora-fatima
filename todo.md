# TODO - Sistema de Notícias Dinâmicas CEI Nossa Senhora de Fátima

## Fase 1: Schema e Migrações
- [x] Definir tabela `news` em `drizzle/schema.ts`
- [x] Rodar `pnpm db:push` para migrar

## Fase 2: tRPC Procedures
- [x] Implementar `news.list` (público - listar notícias)
- [x] Implementar `news.getById` (público - detalhe)
- [x] Implementar `news.create` (protegido - admin)
- [x] Implementar `news.update` (protegido - admin)
- [x] Implementar `news.delete` (protegido - admin)
- [x] Escrever testes vitest para procedures

## Fase 3: Frontend - Restauração e Integração
- [x] Restaurar páginas originais (Historia, MissaoVisaoValores, etc)
- [x] Integrar Home.tsx com dados dinâmicos de notícias
- [x] Conectar componentes ao tRPC
- [x] Validar renderização e responsividade

## Fase 4: Painel Administrativo
- [x] Criar página `/admin/news` com DashboardLayout
- [x] Implementar formulário de criação de notícia
- [x] Implementar listagem com edição/exclusão
- [x] Adicionar validações e feedback de usuário
- [x] Proteger rota com verificação de role admin

## Fase 5: QA e Deploy
- [x] Testar fluxo completo (criar, editar, deletar, listar)
- [x] Validar mobile responsiveness
- [x] Verificar performance e carregamento
- [x] Salvar checkpoint final


## Fase 6: Gerenciamento de Conteúdo de Seções
- [x] Criar schema `content_sections` com campos de texto para cada seção
- [x] Criar schema `user_permissions` para controlar acesso por seção
- [x] Rodar `pnpm db:push` para migrar
- [x] Implementar procedures tRPC para CRUD de conteúdo
- [x] Criar painel administrativo com editor de seções
- [x] Integrar conteúdo dinâmico no frontend
- [x] Testar e validar fluxo completo
- [x] Salvar checkpoint final


## Fase 7: Gerenciador de Imagens
- [x] Criar schema `gallery_images` para armazenar metadados de imagens
- [x] Rodar `pnpm db:push` para migrar
- [x] Implementar procedures tRPC para upload e CRUD de imagens
- [x] Criar componente de upload com drag-and-drop
- [x] Implementar redimensionamento de imagens (crop/resize)
- [x] Criar painel de gerenciador de imagens
- [x] Integrar com editor de seções
- [x] Testar e validar fluxo completo
- [x] Salvar checkpoint final


## Fase 8: Melhorias Sugeridas - Integração com Editor de Seções
- [x] Criar componente `ImageSelector` para seleção de imagens da galeria
- [x] Adicionar campo de seleção de imagem em `AdminContent.tsx`
- [x] Integrar com procedures de galeria para listar imagens
- [x] Testar seleção e vinculação de imagens

## Fase 9: Compressão Automática de Imagens
- [x] Instalar dependência de compressão (sharp)
- [x] Criar função de compressão no backend
- [x] Integrar compressão no procedure `gallery.upload`
- [x] Testar qualidade e redução de tamanho

## Fase 10: Galeria Pública com Lightbox
- [x] Criar componente `Lightbox` interativo
- [x] Criar componente `PublicGallery` para exibição
- [x] Integrar galeria na página Home (seção Galeria)
- [x] Testar navegação e responsividade
- [x] Salvar checkpoint final


## Fase 11: Atualizar com Dados Reais do Site Atual
- [x] Extrair informações do site atual (www.ceinsf.com.br)
- [x] Criar script de seed com dados reais (server/seed-real-data.mjs)
- [x] Executar seed para popular banco de dados
- [x] Validar dados no painel administrativo
- [x] Atualizar informações de contato e horários
- [x] Salvar checkpoint final com dados reais


## Fase 12: Atualização Completa com Dados Reais (Maio 2026)
- [x] Navegar por todas as páginas disponíveis do site atual
- [x] Extrair dados de: Home, Editais, Contatos, Estatuto Social
- [x] Atualizar Hero com Projeto "Criança" e slogan real
- [x] Atualizar Missão/Visão/Valores com textos reais
- [x] Atualizar Diferenciais com cards reais (Objetivos, Missão, Visão, Valores)
- [x] Atualizar Atendimento com estatísticas reais (125 alunos, 200 dias, 19 educadores, 47 anos)
- [x] Atualizar Footer com dados oficiais (CME nº 03, CMDCA nº 06, INEP 38438558)
- [x] Atualizar História com dados institucionais
- [x] Atualizar Estrutura Física e Equipe Pedagógica
- [x] Criar seção de Editais com dados reais
- [x] Criar seção de Contatos com formulário e informações
- [x] Salvar checkpoint final


## Fase 13: Páginas Dinâmicas de Editais e Transparência
- [x] Criar schema `documents` para armazenar editais/documentos com metadados
- [x] Rodar `pnpm db:push` para migrar
- [x] Implementar procedures tRPC para CRUD de documentos (list, create, update, delete)
- [x] Criar página pública `/transparencia` com tabela pesquisável e filtros
- [x] Criar página pública `/editais` com tabela pesquisável e download de PDFs
- [x] Criar painel admin `/admin/documents` para gerenciar documentos
- [x] Implementar upload de PDFs no painel admin
- [x] Seed com dados reais de editais existentes
- [x] Testar fluxo completo (upload, listagem, filtro, download)
- [x] Escrever testes vitest para documentos (11 testes passando)
- [x] Salvar checkpoint final


## Fase 14: Página Pública de Diretoria com Cards Visuais
- [x] Criar schema `diretoria_members` com campos para cada membro
- [x] Rodar `pnpm db:push` para migrar
- [x] Implementar procedures tRPC para CRUD de membros da diretoria
- [x] Criar página pública `/diretoria` com cards visuais
- [x] Criar painel admin `/admin/diretoria` para gerenciar membros
- [x] Popular banco com dados dos 11 membros da diretoria
- [x] Escrever testes vitest para procedures de diretoria
- [x] Testar fluxo completo (listagem, admin, responsividade)
- [x] Salvar checkpoint final
