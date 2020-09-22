module.exports = {
  insertCliente: fields => `
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
      '${fields.cnpj}',
      '${fields.nome_fantasia}',
      '${fields.razao_social}',
      '${fields.cep}',
      '${fields.endereco}',
      '${fields.complemento}',
      '${fields.bairro}',
      '${fields.cidade}',
      '${fields.uf}'
    );
  `,
}