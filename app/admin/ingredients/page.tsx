'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle2, XCircle, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Ingredient {
    id: string;
    name: string;
    isAvailable: boolean;
    _count?: {
        products: number;
    };
}

export default function IngredientsPage() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [newIngredient, setNewIngredient] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');

    useEffect(() => {
        fetchIngredients();
    }, []);

    const fetchIngredients = async () => {
        try {
            const response = await fetch('/api/admin/ingredients');
            const data = await response.json();
            setIngredients(data);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleAvailability = async (id: string, currentStatus: boolean) => {
        try {
            const response = await fetch('/api/admin/ingredients', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isAvailable: !currentStatus }),
            });

            if (response.ok) {
                setIngredients(prev =>
                    prev.map(ing =>
                        ing.id === id ? { ...ing, isAvailable: !currentStatus } : ing
                    )
                );
            }
        } catch (error) {
            console.error('Error updating ingredient:', error);
        }
    };

    const addIngredient = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newIngredient.trim()) return;

        try {
            const response = await fetch('/api/admin/ingredients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newIngredient }),
            });

            if (response.ok) {
                await fetchIngredients();
                setNewIngredient('');
                setShowForm(false);
                alert('Ingrediente aggiunto con successo!');
            }
        } catch (error) {
            console.error('Error adding ingredient:', error);
            alert('Errore nell\'aggiunta dell\'ingrediente');
        }
    };

    const handleEdit = (ingredient: Ingredient) => {
        setEditingId(ingredient.id);
        setEditName(ingredient.name);
    };

    const updateIngredient = async (id: string) => {
        if (!editName.trim()) return;

        try {
            const response = await fetch(`/api/admin/ingredients/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editName }),
            });

            if (response.ok) {
                await fetchIngredients();
                setEditingId(null);
                setEditName('');
                alert('Ingrediente modificato con successo!');
            } else {
                alert('Errore nella modifica');
            }
        } catch (error) {
            console.error('Error updating ingredient:', error);
            alert('Errore nella modifica dell\'ingrediente');
        }
    };

    const deleteIngredient = async (id: string, name: string) => {
        if (!confirm(`Eliminare l'ingrediente "${name}"?`)) return;

        try {
            const response = await fetch(`/api/admin/ingredients/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchIngredients();
                alert('Ingrediente eliminato con successo!');
            } else {
                alert('Errore nell\'eliminazione');
            }
        } catch (error) {
            console.error('Error deleting ingredient:', error);
            alert('Errore nell\'eliminazione dell\'ingrediente');
        }
    };

    const filteredIngredients = ingredients.filter(ing =>
        ing.name.toLowerCase().includes(search.toLowerCase())
    );

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
                        Gestione Ingredienti
                    </h1>
                    <p style={{ fontSize: '14px', color: '#A84545', margin: '4px 0 0 0' }}>
                        Attiva o disattiva la disponibilità degli ingredienti
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
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
                    Nuovo Ingrediente
                </button>
            </div>

            {/* Search Bar */}
            <div style={{
                background: 'linear-gradient(135deg, #F4E4A0 0%, #F9F5F0 100%)',
                border: '2px solid #E85555',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
            }}>
                <Search style={{ width: '18px', height: '18px', color: '#A84545' }} />
                <input
                    type="text"
                    placeholder="Cerca ingrediente..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        color: '#8B3A3A',
                    }}
                />
            </div>

            {/* Add Form */}
            {showForm && (
                <motion.form
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={addIngredient}
                    style={{
                        background: 'linear-gradient(135deg, #F4E4A0 0%, #F9F5F0 100%)',
                        border: '2px solid #E85555',
                        borderRadius: '12px',
                        padding: '20px',
                        display: 'flex',
                        gap: '12px',
                    }}
                >
                    <input
                        type="text"
                        placeholder="Nome nuovo ingrediente"
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                        autoFocus
                        style={{
                            flex: 1,
                            padding: '10px 12px',
                            border: '2px solid #E85555',
                            borderRadius: '6px',
                            fontSize: '14px',
                            background: 'white',
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            background: '#C63A3A',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '10px 16px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '13px',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#A84545'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#C63A3A'}
                    >
                        Aggiungi
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setShowForm(false);
                            setNewIngredient('');
                        }}
                        style={{
                            background: 'rgba(198, 58, 58, 0.2)',
                            color: '#8B3A3A',
                            border: '1px solid #E85555',
                            borderRadius: '6px',
                            padding: '10px 16px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '13px',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(198, 58, 58, 0.3)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(198, 58, 58, 0.2)'}
                    >
                        Annulla
                    </button>
                </motion.form>
            )}

            {/* Ingredients Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {filteredIngredients.map((ingredient) => (
                    <motion.div
                        key={ingredient.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            background: 'linear-gradient(135deg, #F4E4A0 0%, #F9F5F0 100%)',
                            border: `2px solid ${ingredient.isAvailable ? '#E85555' : 'rgba(232, 85, 85, 0.3)'}`,
                            borderRadius: '12px',
                            padding: '16px',
                            opacity: ingredient.isAvailable ? 1 : 0.7,
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            if (ingredient.isAvailable) {
                                e.currentTarget.style.boxShadow = '0 12px 32px rgba(198, 58, 58, 0.2)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ marginBottom: '12px' }}>
                            {editingId === ingredient.id ? (
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        autoFocus
                                        style={{
                                            flex: 1,
                                            padding: '8px',
                                            border: '2px solid #E85555',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            background: 'white',
                                        }}
                                    />
                                </div>
                            ) : (
                                <>
                                    <h3 style={{
                                        fontFamily: 'Playfair Display, serif',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        color: '#8B3A3A',
                                        margin: '0 0 4px 0',
                                        textTransform: 'capitalize',
                                    }}>
                                        {ingredient.name}
                                    </h3>
                                    {ingredient._count && (
                                        <p style={{ fontSize: '12px', color: '#A84545', margin: 0 }}>
                                            Usato in {ingredient._count.products} prodott{ingredient._count.products === 1 ? 'o' : 'i'}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>

                        {editingId === ingredient.id ? (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                                <button
                                    onClick={() => updateIngredient(ingredient.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        padding: '8px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '12px',
                                        background: '#C63A3A',
                                        color: 'white',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#A84545'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = '#C63A3A'}
                                >
                                    <Save style={{ width: '13px', height: '13px' }} />
                                    Salva
                                </button>
                                <button
                                    onClick={() => {
                                        setEditingId(null);
                                        setEditName('');
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        padding: '8px',
                                        borderRadius: '6px',
                                        border: '1px solid #E85555',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '12px',
                                        background: 'rgba(198, 58, 58, 0.1)',
                                        color: '#8B3A3A',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(198, 58, 58, 0.2)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(198, 58, 58, 0.1)'}
                                >
                                    <X style={{ width: '13px', height: '13px' }} />
                                    Annulla
                                </button>
                            </div>
                        ) : null}

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '2fr 1fr 1fr',
                            gap: '8px',
                        }}>
                            <button
                                onClick={() => toggleAvailability(ingredient.id, ingredient.isAvailable)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '6px',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '12px',
                                    transition: 'all 0.3s ease',
                                    background: ingredient.isAvailable
                                        ? 'rgba(198, 58, 58, 0.1)'
                                        : 'rgba(198, 58, 58, 0.2)',
                                    color: '#C63A3A',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = ingredient.isAvailable
                                        ? 'rgba(198, 58, 58, 0.2)'
                                        : 'rgba(198, 58, 58, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = ingredient.isAvailable
                                        ? 'rgba(198, 58, 58, 0.1)'
                                        : 'rgba(198, 58, 58, 0.2)';
                                }}
                            >
                                {ingredient.isAvailable ? (
                                    <>
                                        <CheckCircle2 style={{ width: '13px', height: '13px' }} />
                                        Disp.
                                    </>
                                ) : (
                                    <>
                                        <XCircle style={{ width: '13px', height: '13px' }} />
                                        Esaurito
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => handleEdit(ingredient)}
                                disabled={editingId === ingredient.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: editingId === ingredient.id ? 'not-allowed' : 'pointer',
                                    fontWeight: '600',
                                    fontSize: '12px',
                                    background: 'rgba(198, 58, 58, 0.1)',
                                    color: '#C63A3A',
                                    transition: 'all 0.3s ease',
                                    opacity: editingId === ingredient.id ? 0.6 : 1,
                                }}
                                onMouseEnter={(e) => {
                                    if (editingId !== ingredient.id) {
                                        e.currentTarget.style.background = 'rgba(198, 58, 58, 0.2)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(198, 58, 58, 0.1)';
                                }}
                            >
                                <Edit2 style={{ width: '13px', height: '13px' }} />
                                Modifica
                            </button>

                            <button
                                onClick={() => deleteIngredient(ingredient.id, ingredient.name)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '4px',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '12px',
                                    background: 'rgba(198, 58, 58, 0.15)',
                                    color: '#8B3A3A',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(198, 58, 58, 0.3)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(198, 58, 58, 0.15)'}
                            >
                                <Trash2 style={{ width: '13px', height: '13px' }} />
                                Elimina
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredIngredients.length === 0 && !showForm && (
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#A84545',
                }}>
                    <p>{search ? 'Nessun ingrediente trovato' : 'Nessun ingrediente nel menu. Aggiungi il tuo primo ingrediente!'}</p>
                </div>
            )}
        </div>
    );
}
