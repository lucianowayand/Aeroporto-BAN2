import { useEffect, useRef, useState } from "react"
import Warning from "../../components/warning"

export default function Avioes() {
    const [avioes, setAvioes] = useState([])
    const [message, setMessage] = useState({
        text: "",
        error: false,
    })

    const this_response = useRef()

    const codigo_modelo = useRef(0)

    const GetAll = async () => {
        const res = await fetch('http://localhost:5000/aviao', { method: "GET" })
            .then((response) => response.json())
            .then((data) => setAvioes(data.avioes));
    }

    const Create = async () => {
        const res = await fetch('http://localhost:5000/aviao', {
            method: 'POST',
            body: JSON.stringify({
                num_reg: 22,
                codigo_modelo: "Teste"
            }),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
        
        GetAll
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
                            <input className="mt0-5" onChange={(event) => console.log(event.target.value)} />
                        </div>
                        <div className="ml1">
                            <h5>Número de Registro</h5>
                            <input className="mt0-5" onChange={(event) => console.log(event.target.value)} />
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
                        {avioes != [] ? avioes.map((value, i) => (
                            <tr key={i}>
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