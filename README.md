# Fundo Previdenciário José de Freitas - Backend

Backend completo em Django para o sistema do Fundo Previdenciário de José de Freitas.

## 🚀 Tecnologias

- **Django 4.2** - Framework web
- **Django REST Framework** - API REST
- **PostgreSQL** - Banco de dados
- **Docker & Docker Compose** - Containerização
- **Swagger/OpenAPI** - Documentação da API
- **JWT Authentication** - Autenticação

## 📋 Funcionalidades

### Módulos Principais
- **Notícias** - Gerenciamento de notícias com status de publicação
- **Informativos** - Documentos informativos em PDF
- **Transparência** - Documentos de transparência categorizados
- **CRP** - Certificados de Regularidade Previdenciária
- **Contabilidade** - Documentos contábeis
- **Investimentos** - Documentos de investimentos
- **Certificações** - Certificações com controle de validade
- **Configurações** - Configurações gerais do site

### Funcionalidades Técnicas
- CRUD completo para todos os módulos
- Filtros e ordenação por data, categoria e status
- Upload de arquivos PDF e imagens
- Validação de dados
- Admin interface customizada
- API REST com documentação Swagger
- Autenticação JWT opcional

## 🔧 Instalação e Configuração

### 1. Usando Docker (Recomendado)

```bash
# Clone o repositório
git clone <seu-repositorio>
cd fundo-previdenciario-backend

# Copie o arquivo de exemplo das variáveis de ambiente
cp .env.example .env

# Edite o arquivo .env com suas configurações
nano .env

# Execute com Docker Compose
docker-compose up -d --build

# Acesse o container para criar superusuário
docker-compose exec app python manage.py createsuperuser
```

### 2. Instalação Local

```bash
# Instale as dependências
pip install -r requirements.txt

# Configure as variáveis de ambiente
cp .env.example .env

# Execute as migrações
python manage.py migrate

# Crie um superusuário
python manage.py createsuperuser

# Inicie o servidor
python manage.py runserver
```

## 📚 Documentação da API

Após iniciar o servidor, acesse:

- **Swagger UI**: `http://localhost:8000/swagger/`
- **ReDoc**: `http://localhost:8000/redoc/`
- **Admin Interface**: `http://localhost:8000/admin/`

## 🛡️ Endpoints Principais

### Públicos (Leitura)
- `GET /api/v1/noticias/` - Lista notícias
- `GET /api/v1/noticias/publicadas/` - Lista apenas notícias publicadas
- `GET /api/v1/transparencia/` - Lista documentos de transparência
- `GET /api/v1/crp/` - Lista CRPs
- `GET /api/v1/certificacoes/` - Lista certificações
- `GET /api/v1/certificacoes/validas/` - Lista apenas certificações válidas
- `GET /api/v1/configuracoes/atual/` - Configurações atuais

### Autenticados (Escrita)
- `POST /api/v1/noticias/` - Criar notícia
- `PUT /api/v1/noticias/{id}/` - Atualizar notícia
- `DELETE /api/v1/noticias/{id}/` - Excluir notícia

### Autenticação
- `POST /api/auth/token/` - Obter token JWT
- `POST /api/auth/token/refresh/` - Renovar token

## 🗂️ Estrutura do Projeto

```
.
├── apps/
│   ├── noticias/           # Módulo de notícias
│   ├── informativos/       # Módulo de informativos
│   ├── transparencia/      # Módulo de transparência
│   ├── crp/               # Módulo de CRP
│   ├── contabilidade/     # Módulo de contabilidade
│   ├── investimentos/     # Módulo de investimentos
│   ├── certificacoes/     # Módulo de certificações
│   └── configuracoes/     # Módulo de configurações
├── core/                  # Configurações principais
├── media/                 # Arquivos enviados
├── docker-compose.yml     # Configuração Docker
├── Dockerfile            # Imagem Docker
└── requirements.txt      # Dependências Python
```

## 🔧 Comandos Úteis

```bash
# Criar migrações
python manage.py makemigrations

# Aplicar migrações
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Coletar arquivos estáticos
python manage.py collectstatic

# Executar testes
python manage.py test

# Com Docker
docker-compose exec app python manage.py <comando>
```

## 🌐 Variáveis de Ambiente

```env
DEBUG=True
SECRET_KEY=sua-chave-secreta
DATABASE_URL=postgresql://usuario:senha@host:porta/database
DB_NAME=fundo_previdenciario
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
```

## 📝 Licença

Este projeto está sob a licença MIT.