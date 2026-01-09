import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="Header">
            <h1>Blog Manager</h1>

            <nav>
                <Link to="/" className="Accueil">Accueil</Link>
                <Link to="/articles" className="Articles">Articles</Link>
                <Link to="/new" className="Add">Ajouter</Link>

            </nav>
        </header>
    )
}