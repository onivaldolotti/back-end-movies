# TesteWa

## Description

Repositório de teste

## Instalação

Copiar o arquivo .env.example apenas como .env no diretorio raiz

Para rodar a aplicação execute o comando:
```bash
$ docker compose up
```

## Test

```bash
# unit tests
$ docker compose exec app npm run test

# e2e tests
$ docker compose exec app npm run test:e2e

# test coverage
$ docker compose exec app npm run test:cov
```

## Documentação

A documentação do swagger esta no link http://localhost:5000/api/docs
