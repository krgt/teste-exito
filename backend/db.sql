DROP DATABASE IF EXISTS `teste_exito`;
CREATE DATABASE `teste_exito`;
use `teste_exito`;

CREATE TABLE `clientes` (
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `cnpj` CHAR(14) NOT NULL,
  `nome_fantasia` VARCHAR(128),
  `razao_social` VARCHAR(128),
  `cep` CHAR(8),
  `endereco` VARCHAR(128),
  `complemento` VARCHAR(128),
  `bairro` VARCHAR(128),
  `cidade` VARCHAR(128),
  `uf` VARCHAR(128),

  CONSTRAINT clientes_pk PRIMARY KEY (`id`)
);

CREATE TABLE `usuarios` (
  `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  `cliente_id` INTEGER UNSIGNED NOT NULL,
  `nome` VARCHAR(128),
  `sobrenome` VARCHAR(128),
  `telefone` VARCHAR(13),
  `email` VARCHAR(128),
  `senha` CHAR(60) BINARY, 

  CONSTRAINT usuarios_pk
    PRIMARY KEY (`id`),
  CONSTRAINT fk_usuarios_clientes_cliente_id
    FOREIGN KEY (`cliente_id`)
    REFERENCES `clientes`(`id`)
);

INSERT INTO clientes (
  cnpj,
  nome_fantasia,
  razao_social,
  cep,
  endereco,
  complemento,
  bairro,
  cidade,
  uf
) VALUES (
  '12345678901234',
  'nome fantasia teste',
  'razao social teste',
  '80810200',
  'Rua Teste',
  'Complemento',
  'Bairro',
  'Cidade',
  'UF'
);

INSERT INTO usuarios (
  cliente_id,
  nome,
  sobrenome,
  telefone,
  email,
  senha
) VALUES (
  1,
  'Johnny',
  'B Goode',
  '42991018960',
  'kvnmt0@gmail.com',
  'senhasegura'
);