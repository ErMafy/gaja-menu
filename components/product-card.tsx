'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';

interface Ingredient {
    id: string;
    name: string;
    isAvailable: boolean;
}

interface ProductCardProps {
    name: string;
    price: number;
    description?: string;
    ingredients: Ingredient[];
}

export function ProductCard({ name, price, description, ingredients }: ProductCardProps) {
    const unavailableIngredients = ingredients.filter(ing => !ing.isAvailable);
    const isSoldOut = unavailableIngredients.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
        >
            <Card className={isSoldOut ? 'opacity-60' : ''}>
                <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-xl">{name}</CardTitle>
                        <span className="text-2xl font-bold text-gold whitespace-nowrap">
                            €{price.toFixed(2)}
                        </span>
                    </div>
                </CardHeader>

                <CardContent>
                    {description && (
                        <p className="text-sm text-gray-400 mb-3">{description}</p>
                    )}

                    {ingredients.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Ingredienti:</p>
                            <p className="text-sm text-gray-300">
                                {ingredients.map(ing => ing.name).join(', ')}
                            </p>
                        </div>
                    )}
                </CardContent>

                {isSoldOut && (
                    <CardFooter>
                        <Badge variant="sold-out" className="w-full justify-center gap-2">
                            <AlertCircle className="w-3 h-3" />
                            <span>
                                Temporaneamente non disponibile (manca{' '}
                                {unavailableIngredients.map(ing => ing.name).join(', ')})
                            </span>
                        </Badge>
                    </CardFooter>
                )}
            </Card>
        </motion.div>
    );
}
