import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import type { Article as ArticleType } from "../types/Article"

const STORAGE_KEY = "articles"

export default function ArticlePage() {
    const { id } = useParams<{ id: string }>()
    const [article, setArticle] = useState<ArticleType | null>(null)

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (!saved) return

        const articles: ArticleType[] = JSON.parse(saved)
        const found = articles.find((a) => a.id === id)
        setArticle(found ?? null)
    }, [id])

    if (!article) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Article introuvable</h2>
                <Link to="/articles">
                    <button>Retour aux articles</button>
                </Link>
            </div>
        )
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>{article.title}</h1>
            <p>
                {article.author} — {new Date(article.date).toLocaleString("fr-FR")}
            </p>
            <p style={{ whiteSpace: "pre-line", marginTop: "20px" }}>{article.content}</p>

            <Link to="/articles">
                <button style={{ marginTop: "20px" }}>Retour</button>
            </Link>
        </div>
    )
}
