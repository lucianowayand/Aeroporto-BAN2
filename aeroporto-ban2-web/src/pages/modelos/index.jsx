import { useEffect, useRef, useState } from "react"
import Warning from "../../components/warning"
import { CreateModelos, DeleteModelos, GetAllModelos, UpdateModelos } from "../../services/modelos"
import Modal from "../../components/modal"

export default function Modelos() {
    const [modelos, setModelos] = useState([])
    const [message, setMessage] = useState({
        text: "",
        error: false,
    })

    const codigoCreate = useRef("")
    const capacidadeCreate = useRef(0)
    const pesoCreate = useRef(0)

    const codigoUpdate = useRef("")
    const capacidadeUpdate = useRef(0)
    const pesoUpdate = useRef(0)

    const [modal, setModal] = useState(false)
    const [selectedModelo, setSelectedModelo] = useState()

    const GetAll = async () => {
        const res = await GetAllModelos()
        setModelos(res.data.modelos)
    }

    const Create = async () => {
        const res = await CreateModelos({
            codigo: codigoCreate.current,
            capacidade: capacidadeCreate.current,
            peso: pesoCreate.current
        })
        if (res.status === 200) {
            setMessage({
                text: "Modelo cadastrado com sucesso!",
                error: false
            })
            GetAll()
        } else {
            setMessage({
                text: res.data.message,
                error: true
            })
        }
    }

    const Update = async () => {
        let payload = {
            codigo: codigoUpdate.current,
            capacidade: capacidadeUpdate.current,
            peso: pesoUpdate.current
        }
        const res = await UpdateModelos(selectedModelo.codigo, payload)
        if (res.status === 200) {
            setMessage({
                text: "Modelo atualizado com sucesso!",
                error: false
            })
            GetAll()
        } else {
            console.log(res)
            setMessage({
                text: res.data.message,
                error: true
            })
        }
        setModal(false)
    }

    const Delete = async () => {
        const res = await DeleteModelos(selectedModelo.codigo)
        if (res.status === 200) {
            setMessage({
                text: "Modelo deletado com sucesso!",
                error: false
            })
            GetAll()
        } else {
            console.log(res)
            setMessage({
                text: res.data.message,
                error: true
            })
        }
        setModal(false)
    }

    const SelectModelo = (value) => {
        setSelectedModelo(value)
        codigoUpdate.current = value.codigo
        capacidadeUpdate.current = value.capacidade
        pesoUpdate.current = value.peso
        setModal(true)
    }

    useEffect(() => {
        GetAll()
    }, [])

    return (
        <div>
            <Modal modal={modal} closeModal={() => setModal(false)} updateFunction={Update} deleteFunction={Delete}>
                <div className="pt2 pr1">
                    <h5>Código</h5>
                    <input
                        className="mt0-5 modal-textfield"
                        onChange={(event) => codigoUpdate.current = event.target.value}
                        defaultValue={(selectedModelo ? selectedModelo.codigo : "")}
                    />
                </div>
                <div className="pt2 pr1">
                    <h5>Capacidade</h5>
                    <input
                        className="mt0-5 modal-textfield"
                        onChange={(event) => capacidadeUpdate.current = event.target.value}
                        defaultValue={(selectedModelo ? selectedModelo.capacidade : "")}
                    />
                </div>
                <div className="pt2 pr1">
                    <h5>Peso</h5>
                    <input
                        className="mt0-5 modal-textfield"
                        onChange={(event) => pesoUpdate.current = event.target.value}
                        defaultValue={(selectedModelo ? selectedModelo.peso : "")}
                    />
                </div>
            </Modal>
            <h1>Modelos</h1>
            <Warning message={message} />
            <div className="mt2 border">
                <h3>Adicionar novo registro:</h3>
                <div className="pt1 flex-row-space-between">
                    <div className="flex-row">
                        <div>
                            <h5>Código</h5>
                            <input className="mt0-5" onChange={(event) => codigoCreate.current = event.target.value} />
                        </div>
                        <div className="ml1">
                            <h5>Capacidade</h5>
                            <input className="mt0-5" onChange={(event) => capacidadeCreate.current = parseInt(event.target.value)} />
                        </div>
                        <div className="ml1">
                            <h5>Peso</h5>
                            <input className="mt0-5" onChange={(event) => pesoCreate.current = parseInt(event.target.value)} />
                        </div>
                    </div>
                    <div className="pl2">
                        <button onClick={Create}>Enviar</button>
                    </div>
                </div>
            </div>
            <div className="pt2 flex-center">
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Capacidade (tons)</th>
                            <th>Peso (tons)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modelos.length !== 0  ? modelos.map((value, i) => (
                            <tr key={i} onClick={() => SelectModelo(value)} className="table-row pointer">
                                <td>{value.codigo}</td>
                                <td>{value.capacidade}</td>
                                <td>{value.peso}</td>
                            </tr>
                        )) :
                            <tr>
                                <p className="p1">Não existem modelos cadastrados :(</p>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}