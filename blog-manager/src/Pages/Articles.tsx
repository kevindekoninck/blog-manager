import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import type { Article as ArticleType } from "../types/Article"

const STORAGE_KEY = "articles"

export default function Articles() {
    const [articles, setArticles] = useState<ArticleType[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
    }, [articles])

    const [editId, setEditId] = useState<string | null>(null)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [author, setAuthor] = useState("")
    const [content, setContent] = useState("")

    const [deleteId, setDeleteId] = useState<string | null>(null)

    const handleEdit = (article: ArticleType) => {
        setEditId(article.id)
        setTitle(article.title)
        setCategory(article.category)
        setAuthor(article.author)
        setContent(article.content)
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        setArticles(prev =>
            prev.map(a =>
                a.id === editId
                    ? { ...a, title, category, author, content, date: new Date().toISOString() }
                    : a
            )
        )
        setEditId(null)
    }

    const confirmDelete = () => {
        if (deleteId) {
            setArticles(prev => prev.filter(a => a.id !== deleteId))
            setDeleteId(null)
        }
    }

    return (
        <div>
            <h1>Liste des Articles</h1>

            <Link to="/new">
                <button>Ajouter un article</button>
            </Link>

            {editId && (
                <div style={modalOverlay}>
                    <div style={modalBox}>
                        <h3>Modifier l’article</h3>
                        <form onSubmit={handleSave}>
                            <p>Auteur</p>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                            />
                            <p>Catégorie</p>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />
                            <p>Titre</p>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                            <p>Contenu</p>
                            <textarea
                                rows={3}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                            <div style={{ marginTop: "10px" }}>
                                <button type="submit">Enregistrer</button>
                                <button
                                    type="button"
                                    onClick={() => setEditId(null)}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteId && (
                <div style={modalOverlay}>
                    <div style={modalBox}>
                        <h3>Confirmation</h3>
                        <p>Êtes-vous sûr de vouloir supprimer cet article ?</p>
                        <div style={{ marginTop: "15px" }}>
                            <button
                                onClick={confirmDelete}
                                style={{ marginRight: "10px", background: "#d9534f", color: "white" }}
                            >
                                Oui, supprimer
                            </button>
                            <button onClick={() => setDeleteId(null)}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="art">
                {articles.length === 0 && <p>Aucun article pour le moment</p>}

                {articles.map((a) => (
                    <div key={a.id} className="card">
                        <h2>{a.title}</h2>
                        <p>{a.category}</p>
                        <p>{a.author} — {new Date(a.date).toLocaleString("fr-FR")}</p>
                        <p>{a.content}</p>

                        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                            <button onClick={() => handleEdit(a)}>Modifier</button>
                            <button onClick={() => setDeleteId(a.id)}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const modalOverlay = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const modalBox = {
    background: "white",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "300px",
    textAlign: "center" as const,
}