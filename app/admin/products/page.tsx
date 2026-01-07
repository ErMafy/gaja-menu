'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    categoryId: string;
    ingredients?: Array<{ id: string; name: string }>;
}

interface Category {
    id: string;
    name: string;
}

interface Ingredient {
    id: string;
    name: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        categoryId: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [productsRes, categoriesRes, ingredientsRes] = await Promise.all([
                fetch('/api/admin/products'),
                fetch('/api/admin/categories'),
                fetch('/api/admin/ingredients'),
            ]);
            const productsData = await productsRes.json();
            
            // Trasforma la struttura degli ingredienti
            const formattedProducts = productsData.map((product: any) => ({
                ...product,
                ingredients: product.ingredients?.map((pi: any) => ({
                    id: pi.ingredient.id,
                    name: pi.ingredient.name,
                })) || [],
            }));
            
            setProducts(formattedProducts);
            setCategories(await categoriesRes.json());
            setIngredients(await ingredientsRes.json());
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const method = editingId ? 'PATCH' : 'POST';
            const url = editingId ? `/api/admin/products/${editingId}` : '/api/admin/products';
            
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    ingredients: selectedIngredients,
                }),
            });

            if (response.ok) {
                await fetchData();
                setFormData({ name: '', price: '', description: '', categoryId: '' });
                setSelectedIngredients([]);
                setEditingId(null);
                setShowForm(false);
                alert('Piatto salvato con successo!');
            } else {
                alert('Errore nel salvataggio del piatto');
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Errore nel salvataggio del piatto');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Sei sicuro?')) return;
        try {
            const response = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
            if (response.ok) {
                await fetchData();
                alert('Piatto eliminato con successo!');
            } else {
                alert('Errore nell\'eliminazione del piatto');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Errore nell\'eliminazione del piatto');
        }
    };

    const handleEdit = (product: Product) => {
        setEditingId(product.id);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            description: product.description || '',
            categoryId: product.categoryId,
        });
        setSelectedIngredients(product.ingredients?.map(ing => ing.id) || []);
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
                        Gestione Piatti
                    </h1>
                    <p style={{ fontSize: '14px', color: '#A84545', margin: '4px 0 0 0' }}>
                        Aggiungi, modifica o elimina piatti dal menu
                    </p>
                </div>
                <button
                    onClick={() => {
                        if (editingId) {
                            setEditingId(null);
                            setFormData({ name: '', price: '', description: '', categoryId: '' });
                            setSelectedIngredients([]);
                            setShowForm(false);
                        } else {
                            setShowForm(!showForm);
                            setFormData({ name: '', price: '', description: '', categoryId: '' });
                            setSelectedIngredients([]);
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
                    Nuovo Piatto
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
                            placeholder="Nome piatto"
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
                            placeholder="Prezzo"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                            step="0.01"
                            style={{
                                padding: '10px 12px',
                                border: '2px solid #E85555',
                                borderRadius: '6px',
                                fontSize: '14px',
                                background: 'white',
                            }}
                        />
                        <textarea
                            placeholder="Descrizione"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            style={{
                                padding: '10px 12px',
                                border: '2px solid #E85555',
                                borderRadius: '6px',
                                fontSize: '14px',
                                minHeight: '80px',
                                background: 'white',
                                fontFamily: 'inherit',
                            }}
                        />
                        <select
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            required
                            style={{
                                padding: '10px 12px',
                                border: '2px solid #E85555',
                                borderRadius: '6px',
                                fontSize: '14px',
                                background: 'white',
                            }}
                        >
                            <option value="">Seleziona categoria</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        <div style={{
                            background: 'white',
                            border: '2px solid #E85555',
                            borderRadius: '6px',
                            padding: '12px',
                        }}>
                            <label style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: '600',
                                color: '#8B3A3A',
                                marginBottom: '8px',
                            }}>
                                Ingredienti
                            </label>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                                gap: '8px',
                                maxHeight: '150px',
                                overflowY: 'auto',
                            }}>
                                {ingredients.map((ing) => (
                                    <label key={ing.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                        color: '#8B3A3A',
                                    }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedIngredients.includes(ing.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedIngredients([...selectedIngredients, ing.id]);
                                                } else {
                                                    setSelectedIngredients(selectedIngredients.filter(id => id !== ing.id));
                                                }
                                            }}
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                                cursor: 'pointer',
                                            }}
                                        />
                                        {ing.name}
                                    </label>
                                ))}
                            </div>
                        </div>
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
                                    setFormData({ name: '', price: '', description: '', categoryId: '' });
                                    setSelectedIngredients([]);
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            background: 'linear-gradient(135deg, #F4E4A0 0%, #F9F5F0 100%)',
                            border: '2px solid #E85555',
                            borderRadius: '12px',
                            padding: '16px',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(198, 58, 58, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ marginBottom: '12px' }}>
                            <h3 style={{
                                fontFamily: 'Playfair Display, serif',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#8B3A3A',
                                margin: '0 0 4px 0',
                            }}>
                                {product.name}
                            </h3>
                            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#C63A3A', margin: 0 }}>
                                € {product.price.toFixed(2)}
                            </p>
                        </div>
                        {product.description && (
                            <p style={{ fontSize: '13px', color: '#A84545', margin: '8px 0' }}>
                                {product.description}
                            </p>
                        )}
                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                            <button
                                onClick={() => handleEdit(product)}
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
                                onClick={() => handleDelete(product.id)}
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

            {products.length === 0 && !showForm && (
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#A84545',
                }}>
                    <p>Nessun piatto nel menu. Aggiungi il tuo primo piatto!</p>
                </div>
            )}
        </div>
    );
}
