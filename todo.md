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
