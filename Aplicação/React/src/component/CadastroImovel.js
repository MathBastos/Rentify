import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/CadastroImovel.css';
import logo from '../img/logo.png';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';

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
  const [locadoras, setLocadoras] = useState([]);
  const [locadoraId, setLocadoraId] = useState('');

  useEffect(() => {
    fetchLocadoras();
  }, []);

  const fetchLocadoras = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/locadoras/');
      setLocadoras(response.data);
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };

  const cadastrarImovel = async () => {
    alert(locadoraId)
    try {
      const response = await axios.post('http://localhost:8080/api/imoveis/', {
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
        locadora_id: locadoraId,
      });

      if (response.status === 200) {
        alert('Imóvel cadastrado com sucesso!');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log('Error occurred:', error);
    }
  };

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
                      <InputMask mask="99999-999"
                        type="text"
                        id="cep"
                        className="rounded-input"
                        pattern="[0-9]{5}-?[0-9]{3}"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
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
                      <label htmlFor="complemento">Complemento</label>
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
                      <label htmlFor="descricao">Descrição</label>
                      <br />
                      <input
                        type="text"
                        id="descricao"
                        className="rounded-input"
                        value={descricao}
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

                    <div className="form-group">
                      <label htmlFor="locadora">Locadora</label>
                      <br />
                      <select
                        id="locadora"
                        className="rounded-input"
                        value={locadoraId}
                        onChange={(e) => setLocadoraId(e.target.value)}
                      >
                        {locadoras.map((locadora) => (
                          <option key={locadora.id} value={locadora.id}>
                            {locadora.nome_fantasia} ({locadora.id})
                          </option>
                        ))}
                      </select>
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
