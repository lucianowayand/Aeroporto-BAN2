import { useEffect, useRef, useState } from "react"
import { Create, Delete, GetAll, Update } from "../../services/api"
import Warning from "../../components/warning"
import Modal from "../../components/modal"

export default function Controlador() {
    const [controlador, setControlador] = useState([])
    const [message, setMessage] = useState({
        text: "",
        error: false,
    })

    const nro_matriculaCreate = useRef(0)
    const data_exameCreate = useRef("")

    const nro_matriculaUpdate = useRef(0)
    const data_exameUpdate = useRef("")

    const [modal, setModal] = useState(false)
    const [selectedControlador, setSelectedControlador] = useState()

    const GetAllControlador = async () => {
        const res = await GetAll('controlador')
        setControlador(res.data.controladores)
    }

    const CreateControlador = async () => {
        const res = await Create('controlador', {
            nro_matricula: nro_matriculaCreate.current,
            data_exame: data_exameCreate.current,
        })
        if (res.status === 200) {
            setMessage({
                text: "Controlador cadastrado com sucesso!",
                error: false
            })
            GetAllControlador()
        } else {
            setMessage({
                text: res.data.message,
                error: true
            })
        }
    }

    const UpdateControlador = async () => {
        let payload = {
            codigo: codigoUpdate.current,
            capacidade: capacidadeUpdate.current,
            peso: pesoUpdate.current
        }
        const res = await Update('controlador', selectedControlador.codigo, payload)
        if (res.status === 200) {
            setMessage({
                text: "Controlador atualizado com sucesso!",
                error: false
            })
            GetAllControlador()
        } else {
            console.log(res)
            setMessage({
                text: res.data.message,
                error: true
            })
        }
        setModal(false)
    }

    const DeleteControlador = async () => {
        const res = await Delete('controlador', selectedControlador.codigo)
        if (res.status === 200) {
            setMessage({
                text: "Controlador deletado com sucesso!",
                error: false
            })
            GetAllControlador()
        } else {
            console.log(res)
            setMessage({
                text: res.data.message,
                error: true
            })
        }
        setModal(false)
    }

    const SelectControlador = (value) => {
        setSelectedControlador(value)
        codigoUpdate.current = value.codigo
        capacidadeUpdate.current = value.capacidade
        pesoUpdate.current = value.peso
        setModal(true)
    }

    useEffect(() => {
        GetAllControlador()
    }, [])

    return (
        <div>
            <Modal modal={modal} closeModal={() => setModal(false)} updateFunction={UpdateControlador} deleteFunction={DeleteControlador}>
                <div className="pt2 pr1">
                    <h5>Código</h5>
                    <input
                        className="mt0-5 modal-textfield"
                        onChange={(event) => codigoUpdate.current = event.target.value}
                        defaultValue={(selectedControlador ? selectedControlador.codigo : "")}
                    />
                </div>
                <div className="pt2 pr1">
                    <h5>Capacidade</h5>
                    <input
                        className="mt0-5 modal-textfield"
                        onChange={(event) => capacidadeUpdate.current = event.target.value}
                        defaultValue={(selectedControlador ? selectedControlador.capacidade : "")}
                    />
                </div>
            </Modal>
            <h1>Controlador Áereo</h1>
            <Warning message={message} />
            <div className="mt2 border">
                <h3>Adicionar novo registro:</h3>
                <div className="pt1 flex-row-space-between">
                    <div className="flex-row">
                        <div>
                            <h5>Número de Matricula</h5>
                            <input className="mt0-5 new-textfield" onChange={(event) => nro_matriculaCreate.current = parseInt(event.target.value)} />
                        </div>
                        <div className="ml1">
                            <h5>Data de Exame</h5>
                            <input type="date" className="mt0-5 new-textfield" onChange={(event) => data_exameCreate.current = event.target.value} />
                        </div>
                    </div>
                    <div className="pl2">
                        <button onClick={CreateControlador}>Enviar</button>
                    </div>
                </div>
            </div>
            <div className="pt2 flex-center">
                <table>
                    <thead>
                        <tr>
                            <th>Nr. Matrícula</th>
                            <th>Data de exame</th>
                        </tr>
                    </thead>
                    <tbody>
                        {controlador ? controlador.map((value, i) => (
                            <tr key={i} onClick={() => SelectControlador(value)} className="table-row pointer">
                                <td>{value.nro_matricula}</td>
                                <td>{(value.data_exame).slice(5,7)+'-'+(value.data_exame).slice(8,10)+'-'+(value.data_exame).slice(0,4)}</td>
                            </tr>
                        )) :
                            <tr>
                                <p className="p1">Não existem Controladores cadastrados :(</p>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}