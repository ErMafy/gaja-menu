import { prisma } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingBag, Pizza as PizzaIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getStats() {
    const [totalProducts, totalIngredients, totalCategories] = await Promise.all([
        prisma.product.count(),
        prisma.ingredient.count(),
        prisma.category.count(),
    ]);

    return { totalProducts, totalIngredients, totalCategories };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-playfair text-4xl font-bold text-gold mb-2">Dashboard</h1>
                <p className="text-gray-400">Panoramica del menu digitale</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <PizzaIcon className="w-5 h-5" />
                            Prodotti Totali
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-gold">{stats.totalProducts}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <ShoppingBag className="w-5 h-5" />
                            Ingredienti
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-gold">{stats.totalIngredients}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Package className="w-5 h-5" />
                            Categorie
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-gold">{stats.totalCategories}</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Azioni Rapide</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <a
                        href="/admin/ingredients"
                        className="block p-4 glass-hover rounded-lg"
                    >
                        <h3 className="font-semibold text-gold mb-1">Gestisci Ingredienti</h3>
                        <p className="text-sm text-gray-400">
                            Attiva o disattiva la disponibilità degli ingredienti
                        </p>
                    </a>
                </CardContent>
            </Card>
        </div>
    );
}
