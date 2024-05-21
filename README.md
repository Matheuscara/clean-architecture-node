# Sistema de Registro de Protestos e Emolumentos

Este é um sistema desenvolvido em Express para realizar operações CRUD (Create, Read, Update, Delete) em três entidades: "Protesto", "Emolumento" e "Usuário". O sistema permite o registro de protestos contra dívidas não pagas, cálculo automático do emolumento com base nos dados do protesto e gerenciamento de usuários.

## Funcionalidades

- **CRUD**: O sistema permite a criação, leitura, atualização e exclusão de registros de protestos, emolumentos e usuários.
- **Cálculo Automático do Emolumento**: Ao criar um novo emolumento, o valor é calculado automaticamente com base nos dados do protesto, seguindo regras predefinidas.

### Regras de Cálculo do Emolumento

- Para protestos de até R$ 1000, o valor do emolumento é 5% do valor do protesto.
- Para protestos entre R$ 1000 e R$ 5000, o valor do emolumento é 7.5% do valor do protesto.
- Para protestos acima de R$ 5000, o valor do emolumento é 10% do valor do protesto.

## História Ilustrativa

Imagine que João, um morador de Cidadópolis, emprestou dinheiro para seu amigo Pedro abrir um pequeno negócio. Infelizmente, Pedro não conseguiu pagar de volta o empréstimo a tempo, e João se viu sem escolha a não ser registrar um protesto contra a dívida não paga. João vai ao escritório de registros, onde um funcionário registra os detalhes do protesto em um sistema. Ele paga o emolumento correspondente, calculado automaticamente com base no valor da dívida não paga de acordo com regras predefinidas. Tanto o protesto quanto o emolumento são registrados no sistema, e João se torna um usuário registrado.

## Arquitetura do Projeto

O projeto foi implementado utilizando a arquitetura limpa (Clean Architecture), garantindo uma separação clara das responsabilidades e facilitando a manutenção e escalabilidade do sistema. Para mais detalhes sobre Clean Architecture, consulte [este link](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html).

### Descrição das Pastas

- src/domain/entities: Contém as definições das entidades do domínio.
- src/domain/dtos: Contém os Data Transfer Objects (DTOs) usados na aplicação.
- src/exception: Contém as exceções personalizadas da aplicação.
- src/infrastructure/database: Contém a configuração do banco de dados, repositórios e migrações.
- src/infrastructure/http/middleware: Contém os middlewares da aplicação.
- src/infrastructure/security: Contém os serviços relacionados à segurança, como hashing de senhas.
- src/interfaces/controllers: Contém os controladores responsáveis por lidar com as requisições HTTP.
- src/interfaces/routes: Contém as definições das rotas da aplicação.
- src/use_cases: Contém a lógica de negócios organizada em casos de uso.

### Desenvolvimento da API
A API foi desenvolvida utilizando Node.js com o framework Express para lidar com as requisições HTTP. O TypeORM foi utilizado para interagir com o banco de dados PostgreSQL.

### Configuração do Banco de Dados
Certifique-se de configurar o banco de dados no arquivo .env na raiz do projeto:

- DB_TYPE
- DB_HOST
- DB_PORT
- DB_USERNAME
- DB_PASSWORD
- DB_DATABASE
- DB_DEVELOPMENT
- DB_MIGRATIONS

### Validação dos Dados com Class-Validator
Para garantir a integridade e a validade dos dados recebidos pela API, foi utilizada a biblioteca class-validator. Esta biblioteca permite adicionar validações nas entidades do TypeORM de forma simples e eficaz.