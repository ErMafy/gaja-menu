import { prisma } from '@/lib/db';
import { Package, ShoppingBag, Pizza as PizzaIcon, FolderOpen } from 'lucide-react';

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h1 style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#8B3A3A',
                    margin: '0 0 8px 0',
                }}>
                    Dashboard
                </h1>
                <p style={{ fontSize: '16px', color: '#A84545', margin: 0 }}>Panoramica del menu digitale</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '24px',
            }}>
                {/* Prodotti */}
                <div style={{
                    background: 'linear-gradient(135deg, #F4E4A0 0%, #F9F5F0 100%)',
                    border: '2px solid #E85555',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 8px 32px rgba(198, 58, 58, 0.15)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'rgba(198, 58, 58, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <PizzaIcon style={{ width: '24px', height: '24px', color: '#C63A3A' }} />
                        </div>
                        <h3 style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#8B3A3A',
                            margin: 0,
                        }}>
                            Piatti Totali
                        </h3>
                    </div>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#C63A3A', margin: 0 }}>
                        {stats.totalProducts}
                    </p>
                </div>

                {/* Categorie */}
                <div style={{
                    background: 'linear-gradient(135deg, #F4E4A0 0%, #F9F5F0 100%)',
                    border: '2px solid #E85555',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 8px 32px rgba(198, 58, 58, 0.15)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'rgba(198, 58, 58, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <FolderOpen style={{ width: '24px', height: '24px', color: '#C63A3A' }} />
                        </div>
                        <h3 style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#8B3A3A',
                            margin: 0,
                        }}>
                            Categorie
                        </h3>
                    </div>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#C63A3A', margin: 0 }}>
                        {stats.totalCategories}
                    </p>
                </div>

                {/* Ingredienti */}
                <div style={{
                    background: 'linear-gradient(135deg, #F4E4A0 0%, #F9F5F0 100%)',
                    border: '2px solid #E85555',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 8px 32px rgba(198, 58, 58, 0.15)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'rgba(198, 58, 58, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <ShoppingBag style={{ width: '24px', height: '24px', color: '#C63A3A' }} />
                        </div>
                        <h3 style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#8B3A3A',
                            margin: 0,
                        }}>
                            Ingredienti
                        </h3>
                    </div>
                    <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#C63A3A', margin: 0 }}>
                        {stats.totalIngredients}
                    </p>
                </div>
            </div>
        </div>
    );
}
