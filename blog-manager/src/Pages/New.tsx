import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import type { Article as ArticleType } from "../types/Article"
import { useNavigate } from "react-router-dom"

const STORAGE_KEY = "articles"

export default function New() {
    const navigate = useNavigate()

    const [articles, setArticles] = useState<ArticleType[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : []
    })

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [author, setAuthor] = useState("")
    const [content, setContent] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newArticle: ArticleType = {
            id: uuidv4(),
            title,
            category,
            author,
            content,
            date: new Date().toISOString()
        }

        const updatedArticles = [newArticle, ...articles]
        setArticles(updatedArticles)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArticles))

        navigate("/articles")
    }

    return (
        <>
            <h1>Ajouter un Article</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Auteur"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Catégorie"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Contenu"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Publier</button>
            </form>
        </>
    )
}
