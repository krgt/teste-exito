module.exports = {
  joinAllUsuariosClientes: () => `
    SELECT * FROM usuarios
    INNER JOIN clientes
    ON usuarios.cliente_id = clientes.id
  `,

  insertUsuario: fields => `
    INSERT INTO usuarios (
      cliente_id,
      nome,
      sobrenome,
      telefone,
      email,
      senha
    ) VALUES (
      ${fields.cliente_id},
      '${fields.nome}',
      '${fields.sobrenome}',
      '${fields.telefone}',
      '${fields.email}',
      '${fields.senha}'
    );
  `
}