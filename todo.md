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
- [ ] Escrever testes vitest para procedures

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
