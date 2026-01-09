import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Article as ArticleType } from "../types/Article";
import "./Home.css";

const STORAGE_KEY = "articles";

export default function Home() {
    const [articles, setArticles] = useState<ArticleType[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed: ArticleType[] = JSON.parse(saved);
            const recent = parsed.slice(0, 3);
            setArticles(recent);
        }
    }, []);

    return (
        <div className="home-container">
            <h1 className="home-title">Bienvenue sur mon blog</h1>
            <p className="home-subtitle">
                Découvrez les derniers articles publiés.
            </p>

            {articles.length === 0 ? (
                <p className="no-articles">
                    Il n'y a pas encore d'articles de rédigé...
                </p>
            ) : (
                <div className="articles-grid">
                    {articles.map((article) => (
                        <div key={article.id} className="article-card">
                            <h2 className="article-title">{article.title}</h2>
                            <p className="article-meta">
                                {article.author} —{" "}
                                {new Date(article.date).toLocaleDateString("fr-FR")}
                            </p>
                            <p className="article-preview">{article.content}</p>
                            <Link to={`/article/${article.id}`}>
                                <button className="read-btn">Lire l’article</button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            <Link to="/articles">
                <button className="view-all-btn">Voir tous les articles</button>
            </Link>
        </div>
    );
}
