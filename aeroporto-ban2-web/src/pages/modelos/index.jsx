import { useEffect } from "react"
import { useState } from "react"
import Warning from "../../components/warning"

export default function Modelos() {
    const [modelos, setModelos] = useState([])
    const [message, setMessage] = useState({
        text: "",
        error: false,
    })

    const getModelos = async () => {
        const res = await fetch('http://localhost:5000/modelo')
            .then((response) => response.json())
            .then((data) => setModelos(data.modelos));
    }

    useEffect(() => {
        getModelos()
    }, [])

    return (
        <div>
            <h1>Modelos</h1>
            <Warning message={message} />
            <div className="pt2 flex-center">
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Capacidade (Pessoas)</th>
                            <th>Peso (tons)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modelos != [] ? modelos.map((value, i) => (
                            <tr key={i}>
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