'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle2, XCircle } from 'lucide-react';

interface Ingredient {
    id: string;
    name: string;
    isAvailable: boolean;
    _count: {
        products: number;
    };
}

export default function IngredientsPage() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

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

    const filteredIngredients = ingredients.filter(ing =>
        ing.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-gold">Caricamento...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-playfair text-4xl font-bold text-gold mb-2">
                    Gestione Ingredienti
                </h1>
                <p className="text-gray-400">
                    Attiva o disattiva la disponibilità degli ingredienti
                </p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cerca ingrediente..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500"
                        />
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIngredients.map((ingredient) => (
                    <motion.div
                        key={ingredient.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Card className="h-full">
                            <CardContent className="pt-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg text-white capitalize mb-2">
                                            {ingredient.name}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            Usato in {ingredient._count.products} prodott{ingredient._count.products === 1 ? 'o' : 'i'}
                                        </p>
                                    </div>

                                    <Badge variant={ingredient.isAvailable ? 'default' : 'sold-out'}>
                                        {ingredient.isAvailable ? 'Disponibile' : 'Esaurito'}
                                    </Badge>
                                </div>

                                <button
                                    onClick={() => toggleAvailability(ingredient.id, ingredient.isAvailable)}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${ingredient.isAvailable
                                            ? 'bg-tomato/20 text-tomato hover:bg-tomato/30 border border-tomato/30'
                                            : 'bg-gold/20 text-gold hover:bg-gold/30 border border-gold/30'
                                        }`}
                                >
                                    {ingredient.isAvailable ? (
                                        <>
                                            <XCircle className="w-4 h-4" />
                                            Segna come Esaurito
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="w-4 h-4" />
                                            Segna come Disponibile
                                        </>
                                    )}
                                </button>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {filteredIngredients.length === 0 && (
                <Card>
                    <CardContent className="py-12 text-center text-gray-400">
                        Nessun ingrediente trovato
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
