import { React, Component, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Rodape from '../../components/rodape/rodape';

import '../../assets/css/medico.css';


export default function ConsultaMedico() {

    // state para a listagem das consultas
    const [listaConsultas, setConsulta] = useState();

    // state para o edição da descrição das consultas
    const [descricaoAtendimento, setDescricaoAtendimento] = useState('')

    // state para modo de edicao
    const [emModoEdicao, setEmModoEdicao] = useState({
        status: false,
        idLinha: null
    })

    // buscar todas as consultas relacionadas com o usuário logado ( neste caso - médico)
    function getConsultas() {
        axios.get('http://localhost:5000/api/consulta', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 200) {

                    setConsulta(resposta.data)
                }
            })
            .catch(erro => console.log(erro))
    }

    // identifica o id da consulta e sua descrição atual para levá-los á função de edição
    function emEdicao({ idLinha, descricaoAtual }) {

        setEmModoEdicao({
            status: true,
            idLinha: idLinha
        })

        setDescricaoAtendimento(descricaoAtual)
    }

    // após editar a descrição da consulta, salva o novo valor nesta função
    function salvarEdicao({ idLinha, novaDescricao }) {

        patchDescricao({ idLinha, novaDescricao })

    }

    // cancela a edição da consulta após acionar a função editar
    function cancelarEdicao() {

        setEmModoEdicao({
            status: false,
            idLinha: null
        })

        setDescricaoAtendimento("")

    }

    // edita a descrição da consulta
    function patchDescricao({ idLinha, novaDescricao }) {

        console.log(idLinha, novaDescricao)

        axios.patch('http://localhost:5000/api/consulta' + idLinha, { descricaoAtendimento: novaDescricao }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })

            .then(resposta => {
                if (resposta.status === 204) {

                    console.log("Descricação atualizada")

                    getConsultas()

                    cancelarEdicao()

                }
            })
            .catch(erro => console.log(erro))
    }

    return (
        <div className="banner">
            <header>
                <h1>Médico - Consultas
                    <br />
                    <Link to='/'>logout</Link>
                </h1>
            </header>
            <section>
                <h2>Consultas</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>Médico</th>
                            <th>Especialidade</th>
                            <th>Data</th>
                            <th>Horário</th>
                            <th>Status</th>
                            <th>Descrição Consulta</th>
                            <th>Edição</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listaConsultas.map((consulta) => {
                                return (
                                    <tr key={consulta.idConsulta}>
                                        <td>{consulta.idPacienteNavigation.nomePaciente}</td>
                                        <td>{consulta.idMedicoNavigation.nome}</td>
                                        <td>{consulta.idMedicoNavigation.idEspecialidadeNavigation.descricaoEspecialidade}</td>
                                        <td>{new Date(consulta.dataConsulta).toLocaleDateString()}</td>
                                        <td>{consulta.hora}</td>
                                        <td>{consulta.idStatusConsultaNavigation.descricaoStatusConsulta}</td>
                                        {
                                            emModoEdicao.status &&
                                                emModoEdicao.idLinha === consulta.idConsulta ?
                                                (
                                                    <input
                                                        type="text"
                                                        defaultValue={consulta.descricaoAtendimento}
                                                        onChange={(event) => setDescricaoAtendimento(event.target.value)}
                                                    />
                                                ) : (<td>{consulta.descricaoAtendimento}</td>)
                                        }
                                        <td id="editar">
                                            <div id="btn-acoes">
                                                {/* Habilita o input passando o id da linha e a descricao atual */}
                                                <buttom onClick={() => emEdicao({ idLinha: consulta.idConsulta, descricaoAtual: consulta.descricaoAtendimento })} >mode_edit_outline</buttom>

                                                {/* Salva o valor da edicao do input e chama e requisicao para o patch passando o id da consulta e a descricao atualizada */}
                                                <buttom onClick={() => salvarEdicao({ idLinha: consulta.idConsulta, novaDescricao: descricaoAtendimento })} >check</buttom>

                                                {/* Cancela a chamada para edição, retornando ao estado inicial*/}
                                                <buttom onClick={() => cancelarEdicao()} >limpar</buttom>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </section>
            <Rodape />
        </div>

    )
}