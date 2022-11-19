import { useNavigate } from "react-router-dom"

export default function Layout({ children }) {
    const navigate = useNavigate()

    return (
        <div className="full-height flex-row">
            {/* Side menu */}
            <div className="full-height side-menu">
                <h2 className="pt2 pointer" onClick={() => navigate('/')}>Airport Manager</h2>
                <div className="pt2">
                    <a className="side-menu-link pointer" onClick={() => navigate('/avioes')}>Aviões</a>
                </div>
            </div>
            {/* Content */}
            <div className="content">
                {children}
            </div>
        </div>
    )
}