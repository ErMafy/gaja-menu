'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    slug: string;
    displayOrder: number;
    _count?: {
        products: number;
    };
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        displayOrder: '',
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/admin/categories');
            setCategories(await response.json());
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = editingId ? 'PATCH' : 'POST';
            const url = editingId ? `/api/admin/categories/${editingId}` : '/api/admin/categories';
            
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    displayOrder: parseInt(formData.displayOrder) || 0,
                }),
            });

            if (response.ok) {
                await fetchCategories();
                setFormData({ name: '', displayOrder: '' });
                setEditingId(null);
                setShowForm(false);
            }
        } catch (error) {
            console.error('Error saving category:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Sei sicuro? Tutti i piatti in questa categoria verranno mantenuti ma senza categoria.')) return;
        try {
            const response = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
            if (response.ok) {
                await fetchCategories();
                alert('Categoria eliminata con successo!');
            } else {
                alert('Errore nell\'eliminazione della categoria');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Errore nell\'eliminazione della categoria');
        }
    };

    const handleEdit = (category: Category) => {
        setEditingId(category.id);
        setFormData({
            name: category.name,
            displayOrder: category.displayOrder.toString(),
        });
        setShowForm(true);
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '400px' }}>
                <p style={{ color: '#8B3A3A', fontSize: '16px' }}>Caricamento...</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: '#8B3A3A',
                        margin: 0,
                    }}>
                        Gestione Categorie
                    </h1>
                    <p style={{ fontSize: '14px', color: '#A84545', margin: '4px 0 0 0' }}>
                        Organizza i piatti in categorie
                    </p>
                </div>
                <button
                    onClick={() => {
                        if (editingId) {
                            setEditingId(null);
                            setFormData({ name: '', displayOrder: '' });
                            setShowForm(false);
                        } else {
                            setShowForm(!showForm);
                            setFormData({ name: '', displayOrder: '' });
                        }
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#C63A3A',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 16px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '14px',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#A84545'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#C63A3A'}
                >
                    <Plus style={{ width: '16px', height: '16px' }} />
                    Nuova Categoria
                </button>
            </div>

            {showForm && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'linear-gradient(135deg, #F4E4A0 0%, #F9F5F0 100%)',
                        border: '2px solid #E85555',
                        borderRadius: '12px',
                        padding: '24px',
                    }}
                >
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <input
                            type="text"
                            placeholder="Nome categoria"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            style={{
                                padding: '10px 12px',
                                border: '2px solid #E85555',
                                borderRadius: '6px',
                                fontSize: '14px',
                                background: 'white',
                            }}
                        />
                        <input
                            type="number"
                            placeholder="Ordine di visualizzazione"
                            value={formData.displayOrder}
                            onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                            style={{
                                padding: '10px 12px',
                                border: '2px solid #E85555',
                                borderRadius: '6px',
                                fontSize: '14px',
                                background: 'white',
                            }}
                        />
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button
                                type="submit"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: '#C63A3A',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '8px 12px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '13px',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#A84545'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#C63A3A'}
                            >
                                <Save style={{ width: '14px', height: '14px' }} />
                                Salva
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingId(null);
                                    setFormData({ name: '', displayOrder: '' });
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    background: 'rgba(198, 58, 58, 0.2)',
                                    color: '#8B3A3A',
                                    border: '1px solid #E85555',
                                    borderRadius: '6px',
                                    padding: '8px 12px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '13px',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(198, 58, 58, 0.3)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(198, 58, 58, 0.2)'}
                            >
                                <X style={{ width: '14px', height: '14px' }} />
                                Annulla
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {categories.map((category) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            background: 'linear-gradient(135deg, #F4E4A0 0%, #F9F5F0 100%)',
                            border: '2px solid #E85555',
                            borderRadius: '12px',
                            padding: '20px',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(198, 58, 58, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ marginBottom: '16px' }}>
                            <h3 style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#8B3A3A',
                                margin: 0,
                            }}>
                                {category.name}
                            </h3>
                            <p style={{ fontSize: '12px', color: '#A84545', margin: '4px 0 0 0' }}>
                                Ordine: {category.displayOrder}
                                {category._count && ` • ${category._count.products} piatti`}
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={() => handleEdit(category)}
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
                                    background: 'rgba(198, 58, 58, 0.1)',
                                    color: '#C63A3A',
                                    border: '1px solid #E85555',
                                    borderRadius: '6px',
                                    padding: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '12px',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(198, 58, 58, 0.2)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(198, 58, 58, 0.1)'}
                            >
                                <Edit2 style={{ width: '12px', height: '12px' }} />
                                Modifica
                            </button>
                            <button
                                onClick={() => handleDelete(category.id)}
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
                                    background: 'rgba(198, 58, 58, 0.2)',
                                    color: '#C63A3A',
                                    border: '1px solid #E85555',
                                    borderRadius: '6px',
                                    padding: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '12px',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(198, 58, 58, 0.3)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(198, 58, 58, 0.2)'}
                            >
                                <Trash2 style={{ width: '12px', height: '12px' }} />
                                Elimina
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {categories.length === 0 && !showForm && (
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#A84545',
                }}>
                    <p>Nessuna categoria. Aggiungi la tua prima categoria!</p>
                </div>
            )}
        </div>
    );
}
