'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface CategoryNavProps {
    categories: Category[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
    const [activeCategory, setActiveCategory] = useState<string>('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = categories.map(cat => ({
                id: cat.slug,
                element: document.getElementById(cat.slug),
            }));

            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                if (section.element) {
                    const { offsetTop, offsetHeight } = section.element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveCategory(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [categories]);

    const scrollToCategory = (slug: string) => {
        const element = document.getElementById(slug);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: 'white',
            borderBottom: '2px solid rgba(198, 58, 58, 0.2)',
            padding: '24px 0',
            marginBottom: '32px',
            boxShadow: '0 4px 12px rgba(198, 58, 58, 0.05)',
        }}>
            <div style={{
                maxWidth: '100%',
                margin: '0 auto',
                padding: '0 32px',
            }}>
                <div style={{
                    display: 'flex',
                    gap: '24px',
                    overflowX: 'auto',
                    paddingBottom: '8px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}>
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            onClick={() => scrollToCategory(category.slug)}
                            style={{
                                padding: '12px 28px',
                                borderRadius: '50px',
                                fontSize: '16px',
                                fontWeight: '600',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.3s ease',
                                border: activeCategory === category.slug 
                                    ? '2px solid #C63A3A' 
                                    : '2px solid rgba(198, 58, 58, 0.2)',
                                background: activeCategory === category.slug
                                    ? 'linear-gradient(135deg, rgba(198, 58, 58, 0.15), rgba(198, 58, 58, 0.1))'
                                    : 'white',
                                color: activeCategory === category.slug
                                    ? '#C63A3A'
                                    : 'rgba(139, 58, 58, 0.7)',
                                fontFamily: 'Playfair Display, serif',
                                cursor: 'pointer',
                                boxShadow: activeCategory === category.slug
                                    ? '0 4px 16px rgba(198, 58, 58, 0.2)'
                                    : 'none',
                            }}
                            whileHover={{ 
                                scale: 1.08,
                                boxShadow: '0 6px 20px rgba(198, 58, 58, 0.15)',
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category.name}
                        </motion.button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
