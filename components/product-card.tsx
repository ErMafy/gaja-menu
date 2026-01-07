'use client';

import { motion } from 'framer-motion';

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

// Premium Color Palette
const colors = {
  primary: '#C63A3A', // Rosso vivace
  dark: '#8B3A3A', // Rosso scuro
  light: '#F4E4A0', // Giallo/Crema
  accent: '#A84545', // Rosso caldo
  border: '#E85555', // Rosso tenue
  white: '#FFFFFF',
  shadow: 'rgba(198, 58, 58, 0.15)',
};

export function ProductCard({ name, price, description, ingredients }: ProductCardProps) {
    const unavailableIngredients = ingredients.filter(ing => !ing.isAvailable);
    const isSoldOut = unavailableIngredients.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -12, scale: 1.02 }}
            className={`w-full ${isSoldOut ? 'opacity-60' : ''}`}
        >
            <div style={{
                background: 'linear-gradient(135deg, rgba(244, 228, 160, 0.95) 0%, rgba(249, 245, 240, 0.95) 100%)',
                backdropFilter: 'blur(10px)',
                border: `1.5px solid ${colors.border}`,
                borderRadius: '24px',
                padding: '28px 36px',
                boxShadow: `0 12px 40px ${colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.8)`,
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '160px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
            }} 
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 28px 60px ${colors.shadow.replace('0.15', '0.25')}, inset 0 1px 0 rgba(255, 255, 255, 0.9)`;
                e.currentTarget.style.borderColor = colors.primary;
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(249, 245, 240, 0.98) 0%, rgba(244, 228, 160, 0.98) 100%)';
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 12px 40px ${colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.8)`;
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(244, 228, 160, 0.95) 0%, rgba(249, 245, 240, 0.95) 100%)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
            >
                {/* Accent Bar - Left Side */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: `linear-gradient(to bottom, ${colors.primary}, ${colors.accent})`,
                    borderRadius: '24px 0 0 24px',
                }} />

                {/* Top Elegant Line */}
                <div style={{
                    position: 'absolute',
                    top: '1px',
                    left: '24px',
                    right: '24px',
                    height: '1px',
                    background: `linear-gradient(to right, transparent, ${colors.border}, transparent)`,
                }} />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                    {/* Name and Price */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '16px',
                        marginBottom: '20px',
                    }}>
                        <h3 style={{
                            fontSize: '22px',
                            fontWeight: '600',
                            color: colors.dark,
                            fontFamily: 'Playfair Display, serif',
                            margin: 0,
                            flex: 1,
                            letterSpacing: '0.5px',
                        }}>
                            {name}
                        </h3>
                        <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <div style={{
                                fontSize: '28px',
                                fontWeight: '700',
                                color: colors.primary,
                                fontFamily: 'Playfair Display, serif',
                                margin: 0,
                                letterSpacing: '-0.5px',
                            }}>
                                € {price.toFixed(2)}
                            </div>
                            <div style={{
                                height: '2px',
                                width: '40px',
                                background: `linear-gradient(to right, ${colors.primary}, transparent)`,
                                borderRadius: '1px',
                                marginTop: '12px',
                                marginLeft: 'auto',
                            }} />
                        </div>
                    </div>

                    {/* Ingredients */}
                    {ingredients.length > 0 && (
                        <p style={{
                            fontSize: '13px',
                            color: colors.accent,
                            margin: '0 0 0 0',
                            lineHeight: '1.7',
                            fontWeight: '400',
                            letterSpacing: '0.3px',
                        }}>
                            {ingredients.map(ing => ing.name).join(' • ')}
                        </p>
                    )}

                    {description && !ingredients.length && (
                        <p style={{
                            fontSize: '14px',
                            color: colors.accent,
                            margin: 0,
                            lineHeight: '1.6',
                            fontWeight: 300,
                        }}>
                            {description}
                        </p>
                    )}

                    {/* Sold Out Badge */}
                    {isSoldOut && (
                        <div style={{
                            marginTop: '16px',
                            paddingTop: '16px',
                            borderTop: `1px solid ${colors.border}`,
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: '#d32f2f',
                                fontSize: '12px',
                                fontWeight: 500,
                            }}>
                                <span>⚠️</span>
                                <span>Temporaneamente non disponibile</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
