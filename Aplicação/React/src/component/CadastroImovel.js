import React, { useState } from 'react';
import axios from 'axios';
import '../css/CadastroImovel.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

function CadastroImovel() {
  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState(null);
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [numQuartos, setNumQuartos] = useState('');
  const [numBanheiros, setNumBanheiros] = useState('');
  const [garagem, setGaragem] = useState('nao');
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [varanda, setVaranda] = useState('nao');
  const [imobiliado, setImobiliado] = useState('nao');
  const [complemento, setComplemento] = useState('');
  const [valorReserva, setValorReserva] = useState('');



  const cadastrarImovel = async () => {
    try{
      const response = await axios.post('http://localhost:8080/api/cadastroimoveis', {
        preco_dia: valorReserva,
        tipo: tipo,
        num_quartos: numQuartos,
        num_banheiros: numBanheiros,
        varanda: varanda,
        garagem: garagem,
        imobiliado: imobiliado,
        descricao: descricao,
        cep: cep,
        numero: numero,
        complemento: complemento,
        locadora_id: 1,
      })
      if (response.data.success) {
        navigate('/component/Login.js');

      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log('Error occurred:', error);
  };
}
  return (
    <div className="CadastroImovel">
      <header className="CadastroImovel-header">
        <table>
          <tbody>
            <tr>
              <td colSpan="2">
                <img src={logo} className="rentfyLogoCadastroImovel" alt="logo" />
              </td>
            </tr>
            <tr>
              <td className="center">
                <fieldset className="fieldset-custom">
                  <legend>Cadastro de Imóvel</legend>
                  <form id="CadastroImovel" onSubmit={cadastrarImovel}>
                    <div className="form-group">
                      <label htmlFor="cep">CEP</label>
                      <br />
                      <input
                        type="text"
                        id="cep"
                        className="rounded-input"
                        pattern="[0-9]{5}-?[0-9]{3}"
                        value={cep}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numero">Número</label>
                      <br />
                      <input
                        type="number"
                        id="numero"
                        className="rounded-input"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="complemento">complemento</label>
                      <br />
                      <input
                        type="text"
                        id="complemento"
                        className="rounded-input"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numQuartos">Número de Quartos</label>
                      <br />
                      <input
                        type="number"
                        id="numQuartos"
                        className="rounded-input"
                        value={numQuartos}
                        onChange={(e) => setNumQuartos(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="numBanheiros">Número de Banheiros</label>
                      <br />
                      <input
                        type="number"
                        id="numBanheiros"
                        className="rounded-input"
                        value={numBanheiros}
                        onChange={(e) => setNumBanheiros(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="garagem">Garagem</label>
                      <br />
                      <select
                        id="garagem"
                        className="rounded-input"
                        value={garagem}
                        onChange={(e) => setGaragem(e.target.value)}
                      >
                        <option value="nao">Não</option>
                        <option value="sim">Sim</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="tipo">Tipo</label>
                      <br />
                      <select
                        id="tipo"
                        className="rounded-input"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                      >
                        <option value="apartamento">Apartamento</option>
                        <option value="casa">Casa</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="varanda">Varanda</label>
                      <br />
                      <select
                        id="varanda"
                        className="rounded-input"
                        value={varanda}
                        onChange={(e) => setVaranda(e.target.value)}
                      >
                        <option value="nao">Não</option>
                        <option value="sim">Sim</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="imobiliado">Imobiliado</label>
                      <br />
                      <select
                        id="imobiliado"
                        className="rounded-input"
                        value={imobiliado}
                        onChange={(e) => setImobiliado(e.target.value)}
                      >
                        <option value="nao">Não</option>
                        <option value="sim">Sim</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="descricao">descricao</label>
                      <br />
                      <input
                        type="text"
                        id="descricao"
                        className="rounded-input"
                        value={complemento}
                        onChange={(e) => setDescricao(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="valorReserva">Valor Dia</label>
                      <br />
                      <input
                        type="number"
                        id="valorReserva"
                        className="rounded-input"
                        value={valorReserva}
                        onChange={(e) => setValorReserva(e.target.value)}
                      />
                    </div>

                    <button type="submit" className="btnCadastrarImovel">
                      Cadastrar Imóvel
                    </button>
                  </form>
                </fieldset>
              </td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default CadastroImovel;
