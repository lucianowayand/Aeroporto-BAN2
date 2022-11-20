import { useEffect, useRef, useState } from "react"
import Warning from "../../components/warning"
import { CreateModelos, GetAllModelos } from "../../services/modelos"

export default function Modelos() {
    const [modelos, setModelos] = useState([])
    const [message, setMessage] = useState({
        text: "",
        error: false,
    })

    const codigo = useRef("")
    const capacidade = useRef(0)
    const peso = useRef(0)

    const GetAll = async () => {
        const res = await GetAllModelos()
        setModelos(res.data.modelos)
    }

    const Create = async () => {
        const res = await CreateModelos({
            codigo: codigo.current,
            capacidade: capacidade.current,
            peso: peso.current
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

    useEffect(() => {
        GetAll()
    }, [])

    return (
        <div>
            <h1>Modelos</h1>
            <Warning message={message} />
            <div className="mt2 border">
                <h3>Adicionar novo registro:</h3>
                <div className="pt1 flex-row-space-between">
                    <div className="flex-row">
                        <div>
                            <h5>Código</h5>
                            <input className="mt0-5" onChange={(event) => codigo.current = event.target.value} />
                        </div>
                        <div className="ml1">
                            <h5>Capacidade</h5>
                            <input className="mt0-5" onChange={(event) => capacidade.current = parseInt(event.target.value)} />
                        </div>
                        <div className="ml1">
                            <h5>Peso</h5>
                            <input className="mt0-5" onChange={(event) => peso.current = parseInt(event.target.value)} />
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
                            <tr key={i} onClick={() => console.log(value)} className="table-row pointer">
                                <td>{value.codigo}</td>
                                <td>{value.capacidade}</td>
                                <td>{value.peso}</td>
                            </tr>
                        )) :
                            <tr>
                                <p className="p1">Não existem aviões cadastrados :(</p>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}