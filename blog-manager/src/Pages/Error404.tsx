import { Link } from "react-router-dom"
import "./Error404.css"

export default function Error404() {
    return (
        <div className="error-container">
            <h1 className="error-title">Erreur 404</h1>
            <p className="error-text">Oups... Vous vous êtes perdu</p>

            <img
                src="https://i.ppy.sh/7434d6f55119b3d9223dfc14a7e2158c6945c7b8/68747470733a2f2f692e726564642e69742f323474697a656b7533616433312e706e67"
                alt="404 illustration"
                className="error-image"
            />

            <Link to="/">
                <button className="error-button">Retour à l’accueil</button>
            </Link>
        </div>
    )
}
