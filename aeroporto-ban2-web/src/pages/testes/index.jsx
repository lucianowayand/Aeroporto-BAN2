import { useEffect, useRef, useState } from "react";
import Modal from "../../components/modal";
import Warning from "../../components/warning";
import { Create, Delete, GetAll, Update } from "../../services/testes";

export default function Testes() {
  const [testes, setTestes] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    error: false,
  });

  const codigo_modeloCreate = useRef("");
  const num_regCreate = useRef(0);
  const codigo_modeloUpdate = useRef("");
  const num_regUpdate = useRef(0);

  const [modal, setModal] = useState(false);
  const [selectedTeste, setSelectedTeste] = useState();

  const GetAllTestes = async () => {
    const res = await GetAll();
    setTestes(res.data.testes);
  };

  const CreateTeste = async () => {
    const res = await Create({
      num_reg: num_regCreate.current,
      codigo_modelo: codigo_modeloCreate.current,
    });
    if (res.status === 200) {
      setMessage({
        text: "Teste cadastrado com sucesso!",
        error: false,
      });
      GetAllTestes();
    } else {
      setMessage({
        text: res.data.message,
        error: true,
      });
    }
  };

  const UpdateTestes = async () => {
    let payload = {
      num_reg: num_regUpdate.current,
      codigo_modelo: selectedTeste.codigo_modelo,
    };
    const res = await Update(selectedTeste.num_reg, payload);
    if (res.status === 200) {
      setMessage({
        text: "Teste atualizado com sucesso!",
        error: false,
      });
      GetAllTestes();
    } else {
      console.log(res);
      setMessage({
        text: res.data.message,
        error: true,
      });
    }
    setModal(false);
  };

  const DeleteTestes = async () => {
    const res = await Delete(selectedTeste.num_reg);
    if (res.status === 200) {
      setMessage({
        text: "Teste deletado com sucesso!",
        error: false,
      });
      GetAllTestes();
    } else {
      console.log(res);
      setMessage({
        text: res.data.message,
        error: true,
      });
    }
    setModal(false);
  };

  const SelectTeste = (value) => {
    setSelectedTeste(value);
    codigo_modeloUpdate.current = value.codigo_modelo;
    num_regUpdate.current = value.num_reg;
    setModal(true);
  };

  useEffect(() => {
    GetAll();
  }, []);

  return (
    <div>
      <Modal
        modal={modal}
        closeModal={() => setModal(false)}
        updateFunction={UpdateTestes}
        deleteFunction={DeleteTestes}
      >
        <div className="pt2 pr1">
          <h5>Código</h5>
          <input
            className="mt0-5 modal-textfield disabled-field"
            defaultValue={selectedTeste ? selectedTeste.codigo_modelo : ""}
            disabled
          />
        </div>
        <div className="pt2 pr1">
          <h5>Número de Registro</h5>
          <input
            className="mt0-5 modal-textfield"
            onChange={(event) =>
              (num_regUpdate.current = parseInt(event.target.value))
            }
            defaultValue={selectedTeste ? selectedTeste.num_reg : ""}
          />
        </div>
      </Modal>
      <h1>Testes</h1>
      <Warning message={message} />
      <div className="mt2 border">
        <h3>Adicionar novo registro:</h3>
        <div className="pt1 flex-row-space-between">
          <div className="flex-row">
            <div>
              <h5>Código</h5>
              <input
                className="mt0-5 new-textfield"
                onChange={(event) =>
                  (codigo_modeloCreate.current = event.target.value)
                }
              />
            </div>
            <div className="ml1">
              <h5>Número de Registro</h5>
              <input
                className="mt0-5 new-textfield"
                onChange={(event) =>
                  (num_regCreate.current = parseInt(event.target.value))
                }
              />
            </div>
          </div>
          <div className="pl2">
            <button onClick={CreateTeste}>Enviar</button>
          </div>
        </div>
      </div>
      <div className="pt2 flex-center">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Número de Registro</th>
            </tr>
          </thead>
          <tbody>
            {testes.length !== 0 ? (
              testes.map((value, i) => (
                <tr
                  key={i}
                  onClick={() => SelectTeste(value)}
                  className="table-row pointer"
                >
                  <td>{value.codigo_modelo}</td>
                  <td>{value.num_reg}</td>
                </tr>
              ))
            ) : (
              <tr>
                <p className="p1">Não existem testes cadastrados :(</p>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
