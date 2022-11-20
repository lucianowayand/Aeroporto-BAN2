import { useNavigate } from "react-router-dom"

export default function Layout({ children }) {
    const navigate = useNavigate()

    return (
        <div className="full-height flex-row">
            {/* Side menu */}
            <div className="full-height side-menu flex-column-space-between">
                <div>
                    <h2 className="pt2 pointer" onClick={() => navigate('/')}>Airport Manager</h2>
                    <div className="pt2 flex-column">
                        <a className="side-menu-link pointer pt2" onClick={() => navigate('/avioes')}>Aviões</a>
                        <a className="side-menu-link pointer pt1" onClick={() => navigate('/empregados')}>Empregados</a>
                        <a className="side-menu-link pointer pt1" onClick={() => navigate('/modelos')}>Modelos</a>
                        <a className="side-menu-link pointer pt1" onClick={() => navigate('/testes')}>Testes</a>
                    </div>
                </div>
                <div className="pb2">
                    <p>Luciano Abreu</p>
                    <p>Gabriel F. Junkes</p>
                </div>

            </div>
            {/* Content */}
            <div className="content p2">
                {children}
            </div>
        </div>
    )
}