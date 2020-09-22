import { Box } from '@material-ui/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React  from 'react';
import * as Yup from 'yup'
import { cnpj } from 'cpf-cnpj-validator'
import { useSnackbar } from 'react-simple-snackbar'

import FormikStepper from './FormikStepper'
import FormikStep from './FormikStep'

import config from '../../config.json'

const clienteValidationSchema = Yup.object().shape({
  cnpj: Yup.string().required()
    .test('cnpj-test', 'CNPJ inválido', value => cnpj.isValid(value)),
  nome_fantasia: Yup.string().required(),
  razao_social: Yup.string().required(),
  cep: Yup.string().min(8).max(8).required(),
  endereco: Yup.string().required(),
  complemento: Yup.string().required(),
  bairro: Yup.string().required(),
  cidade: Yup.string().required(),
  uf: Yup.string().required(),
})

const usuarioValidationSchema = Yup.object().shape({
  nome: Yup.string().required(),
  sobrenome: Yup.string().required(),
  telefone: Yup.string().matches(/^[0-9]{11}/).required(),
  email: Yup.string().email().required(),
  senha: Yup.string().min(9).required()
})

export default function Form({ closeDialog, addRow }) {
  const [openSuccessSnackbar, ] = useSnackbar({
    style: {
      backgroundColor: '#4caf50',
  }})
  const [openFailureSnackbar, ] = useSnackbar({
    style: {
      backgroundColor: '#f44336',
  }})
  return (
    <FormikStepper
      initialValues={{
        cnpj: '',
        nome_fantasia: '',
        razao_social: '',
        cep: '',
        endereco: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',

        nome: '',
        sobrenome: '',
        telefone: '',
        email: '',
        senha: '',
      }}
      onSubmit={async (values) => {
        return fetch(config.api.usuario, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify( {
            cliente: {
              cnpj: values.cnpj,
              nome_fantasia: values.nome_fantasia,
              razao_social: values.razao_social,
              cep: values.cep,
              endereco: values.endereco,
              complemento: values.complemento,
              bairro: values.bairro,
              cidade: values.bairro,
              uf: values.uf,
            },
            usuario: {
              nome: values.nome,
              sobrenome: values.sobrenome,
              telefone: values.telefone,
              email: values.email,
              senha: values.senha,
            }
          })
        })
          .then( async res => {
            const data = await res.json()
            if (res.ok) {
              closeDialog()
              addRow(data)
              openSuccessSnackbar('Usuário cadastrado com sucesso.')
            }
            else {
              openFailureSnackbar('Erro ao cadastrar usuário: ' + data && data.msg ? data.msg : '')
              console.error(res.statusText)
            }
          })
          .catch( err => {
            openFailureSnackbar('Erro ao cadastrar usuário: ' + err)
            console.error(err)
          })
      }}
    >
      <FormikStep
        label="Cadastro Cliente"
        validationSchema={clienteValidationSchema}
      >
        <Box paddingBottom={2}>
          <Field fullWidth name="cnpj" component={TextField} label="CNPJ" />
          <Field fullWidth name="nome_fantasia" component={TextField} label="Nome Fantasia" />
          <Field fullWidth name="razao_social" component={TextField} label="Razão Social" />
          <Field fullWidth name="cep" component={TextField} label="CEP" />
          <Field fullWidth name="endereco" component={TextField} label="Endereço" />
          <Field fullWidth name="complemento" component={TextField} label="Complemento" />
          <Field fullWidth name="bairro" component={TextField} label="Bairro" />
          <Field fullWidth name="cidade" component={TextField} label="Cidade" />
          <Field fullWidth name="uf" component={TextField} label="UF" />
        </Box>
      </FormikStep>

      <FormikStep
        label="Cadastro Usuário"
        validationSchema={usuarioValidationSchema}
      >
        <Box paddingBottom={2}>
          <Field fullWidth name="nome" component={TextField} label="Nome" />
          <Field fullWidth name="sobrenome" component={TextField} label="Sobrenome" />
          <Field fullWidth name="telefone" component={TextField} label="Telefone" type="tel" />
          <Field fullWidth name="email" component={TextField} label="Email" type="email" />
          <Field fullWidth name="senha" component={TextField} label="Senha" type="password" />
        </Box>
      </FormikStep>

      <FormikStep label="Confirmação">
        <Box paddingBottom={2}>
          Deseja confirmar o cadastro?
        </Box>
      </FormikStep>
    </FormikStepper>
  );
}
