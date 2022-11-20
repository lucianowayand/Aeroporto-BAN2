import { useEffect, useRef, useState } from "react"
import Warning from "../../components/warning"
import { CreateAvioes, GetAllAvioes } from "../../services/avioes"

export default function Avioes() {
    const [avioes, setAvioes] = useState([])
    const [message, setMessage] = useState({
        text: "",
        error: false,
    })

    const codigo_modelo = useRef("")
    const num_reg = useRef(0)

    const GetAll = async () => {
        const res = await GetAllAvioes()
        setAvioes(res.data.avioes)
        console.log(res.data.avioes)
    }

    const Create = async () => {
        const res = await CreateAvioes({
            num_reg: num_reg.current,
            codigo_modelo: codigo_modelo.current
        })
        if (res.status === 200) {
            setMessage({
                text: "Avião cadastrado com sucesso!",
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
            <h1>Aviões</h1>
            <Warning message={message} />
            <div className="mt2 border">
                <h3>Adicionar novo registro:</h3>
                <div className="pt1 flex-row-space-between">
                    <div className="flex-row">
                        <div>
                            <h5>Código</h5>
                            <input className="mt0-5" onChange={(event) => codigo_modelo.current = event.target.value} />
                        </div>
                        <div className="ml1">
                            <h5>Número de Registro</h5>
                            <input className="mt0-5" onChange={(event) => num_reg.current = parseInt(event.target.value)} />
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
                            <th>Número de Registro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {avioes.length !== 0 ? avioes.map((value, i) => (
                            <tr key={i} onClick={() => console.log(value)} className="table-row pointer">
                                <td>{value.codigo_modelo}</td>
                                <td>{value.num_reg}</td>
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